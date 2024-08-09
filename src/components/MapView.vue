<script setup lang="ts">
import { LMap, LControlScale } from "@vue-leaflet/vue-leaflet";
import { ref, provide, watch, onBeforeMount } from "vue";
import type { Ref } from "vue";
import type { GeoJSON } from "geojson";
import LayerControl from "./controls/LayerControl.vue";
import NavControl from "./controls/NavControl.vue";
import { loadData } from "../assets/ts/functions";
import { cities, CityName } from "@/assets/ts/constants";
import { InjectionKeyEnum } from "@/assets/ts/constants";

// GeoJSON Constants
const shelters = ref() as Ref<GeoJSON>;
const boundary = ref() as Ref<GeoJSON>;
const isochrones = ref() as Ref<GeoJSON>;
const population = ref() as Ref<GeoJSON>;
// City
const city = ref() as Ref<CityName>;
const isJsonDataLoad = ref<boolean>(false);
onBeforeMount(() => {
  city.value = cities[0].name;
});
watch(city, async (newValue) => {
  await loadData(newValue, shelters, boundary, isochrones, population);
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
provide<Ref<GeoJSON>>(InjectionKeyEnum.MAP, map);
provide<Ref<CityName>>(InjectionKeyEnum.CITY, city);
provide<Ref<GeoJSON>>(InjectionKeyEnum.SHELTER_GEOJSON, shelters);
provide<Ref<GeoJSON>>(InjectionKeyEnum.BOUNDARY_GEOJSON, boundary);
provide<Ref<GeoJSON>>(InjectionKeyEnum.ISOCHRONE_GEOJSON, isochrones);
provide<Ref<GeoJSON>>(InjectionKeyEnum.POPULATION_GEOJSON, population);
</script>
<template>
  <l-map ref="map" v-model:zoom="zoom" :use-global-leaflet="false" :options="mapOptions">
    <!-- Controls -->
    <l-control-scale :imperial="false"></l-control-scale>
    <nav-control :zoom="firstZoom" :cities="cities"></nav-control>
    <layer-control v-if="isJsonDataLoad"></layer-control>
  </l-map>
</template>
