<script setup lang="ts">
import { LMap, LControlScale } from "@vue-leaflet/vue-leaflet";
import { ref, provide, watch, onBeforeMount } from "vue";
import type { Ref } from "vue";
import LayerControl from "./controls/LayerControl.vue";
import NavControl from "./controls/NavControl.vue";
import { cities, CityName } from "@/assets/ts/constants";
import { InjectionKeyEnum } from "@/assets/ts/constants";
import type { FeatureCollection, Point, Polygon, MultiPolygon } from "geojson";
import type {
  ShelterProperties,
  IsochroneProperties,
  PopulationProperties,
} from "@/assets/ts/types";
import axios from "axios";

// GeoJSON Constants
const shelters = ref() as Ref<FeatureCollection<Point, ShelterProperties>>;
const boundary = ref() as Ref<FeatureCollection<Polygon>>;
const isochrones = ref() as Ref<FeatureCollection<MultiPolygon, IsochroneProperties>>;
const population = ref() as Ref<FeatureCollection<MultiPolygon, PopulationProperties>>;
// City
const city = ref() as Ref<CityName>;
const isJsonDataLoad = ref<boolean>(false);
onBeforeMount(() => {
  city.value = cities[0].name;
});
watch(city, async (newValue) => {
  await axios.get(`http://localhost:3000/api/shelter/${newValue}`).then((response) => {
    shelters.value = response.data;
  });
  await axios.get(`http://localhost:3000/api/boundary/${newValue}`).then((response) => {
    boundary.value = response.data;
  });
  await axios.get(`http://localhost:3000/api/isochrone/${newValue}`).then((response) => {
    isochrones.value = response.data;
    isochrones.value.features.sort((a: any, b: any) => b.properties.range - a.properties.range);
  });
  await axios.get(`http://localhost:3000/api/population/${newValue}`).then((res) => {
    population.value = res.data;
  });
  isJsonDataLoad.value = true;
});
// Map Settings
const map = ref();
const zoom = 12;
const firstZoom = 12;
const mapOptions = {
  zoomControl: true,
  attributionControl: false,
  minZoom: 6,
  maxZoom: 18,
  center: cities[0].latLng,
  preferCanvas: true,
};
provide<Ref<any>>(InjectionKeyEnum.MAP, map);
provide<Ref<CityName>>(InjectionKeyEnum.CITY, city);
provide<Ref<FeatureCollection<Point, ShelterProperties>>>(
  InjectionKeyEnum.SHELTER_GEOJSON,
  shelters,
);
provide<Ref<FeatureCollection<Polygon>>>(InjectionKeyEnum.BOUNDARY_GEOJSON, boundary);
provide<Ref<FeatureCollection<MultiPolygon, IsochroneProperties>>>(
  InjectionKeyEnum.ISOCHRONE_GEOJSON,
  isochrones,
);
provide<Ref<FeatureCollection<MultiPolygon, PopulationProperties>>>(
  InjectionKeyEnum.POPULATION_GEOJSON,
  population,
);
import "@maplibre/maplibre-gl-leaflet";
import * as L from "leaflet";
const onReady = async () => {
  const response = await axios.get("http://localhost:3000/api/population-split/KryvyiRih");
  const geojsonData = response.data;
  const gl = L.maplibreGL({
    style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    pitch: 0,
    bearing: 0,
  }).addTo(map.value.leafletObject);
  gl.getMaplibreMap().on("load", () => {
    gl.getMaplibreMap().addSource("KryvyiRih_Pop", { type: "geojson", data: geojsonData });
    gl.getMaplibreMap().addLayer({
      id: "KryvyiRih",
      type: "fill",
      source: "KryvyiRih_Pop",
      paint: {
        "fill-color": [
          "case",
          ["==", ["get", "access"], 6],
          [
            "step",
            ["get", "value"],
            "#ffcccc",
            5,
            "#ff9999",
            15,
            "#ff6666",
            25,
            "#ff3333",
            35,
            "#ff0000",
          ],
          [
            "interpolate",
            ["linear"],
            ["get", "access"],
            0,
            [
              "step",
              ["get", "value"],
              "#ccccff",
              5,
              "#9999ff",
              15,
              "#6666ff",
              25,
              "#3333ff",
              35,
              "#0000ff",
            ],
            6,
            "#ffcccc",
          ],
        ],
        "fill-opacity": 0.8,
      },
    });
  });
};
</script>
<template>
  <l-map
    ref="map"
    v-model:zoom="zoom"
    :use-global-leaflet="false"
    :options="mapOptions"
    @ready="onReady()"
  >
    <!-- Controls -->
    <l-control-scale :imperial="false"></l-control-scale>
    <nav-control :zoom="firstZoom" :cities="cities"></nav-control>
    <layer-control v-if="isJsonDataLoad"></layer-control>
  </l-map>
</template>
