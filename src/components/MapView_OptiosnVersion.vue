<script>
import {
  LMap,
  LTileLayer,
  LControlLayers,
  LCircleMarker,
  LTooltip,
  LPopup,
  LFeatureGroup,
  LGeoJson,
} from "@vue-leaflet/vue-leaflet";
import LegendControl from "./controls/LayerControl.vue";
import NaviControl from "./controls/NaviControl.vue";
import { getIsochroneColor } from "@/assets/overlay";
import "leaflet/dist/leaflet.css";
// // Import Leaflet
// import * as L from "leaflet";
// Import GeoJSON data
import sheltersData from "@/assets/Chernivtsi_Shelters.geojson?raw";
import isochroneData from "@/assets/Chernivtsi_Isochrone_Geoapify.geojson?raw";

export default {
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LCircleMarker,
    LTooltip,
    LPopup,
    LFeatureGroup,
    LGeoJson,
    NaviControl,
    LegendControl,
  },
  data() {
    return {
      // Map Setting
      zoom: 12,
      firstZoom: 12,
      centers: [
        { name: "Chernivtsi", latLng: [48.30933, 25.94639] },
        { name: "Poltava", latLng: [49.60009, 34.54352] },
        { name: "Vinnytsia", latLng: [49.23866, 28.47993] },
        { name: "Zhytomyr", latLng: [50.26453, 28.67374] },
      ],
      map: {},
      flag: false,
      // Tile Layers Setting
      url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
      // Point Layers Setting
      shelters: JSON.parse(sheltersData),
      sheltersName: "Shelters",
      popupOptions: {
        autoPan: false,
      },
      markerOptions: {
        radius: 5,
        fillColor: "orange",
        color: "white",
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.8,
      },
      // Isochrone Layers Setting
      isochrones: JSON.parse(isochroneData),
      isochronesName: "Isochrones",
      isochroneStyles: (feature) => {
        return {
          fillColor: getIsochroneColor(feature.properties.range),
          fillOpacity: 0.5,
          color: "white",
          weight: 0.5,
          opacity: 1,
        };
      },
      // Legend
      showLegend: false,
      showSheltersLegend: true,
      showIsochronesLegend: false,
    };
  },
  computed: {
    sortedIsochrones() {
      return [...this.isochrones.features].sort(
        (a, b) => b.properties.range - a.properties.range,
      );
    },
  },
  methods: {
    isReady() {
      this.map = this.$refs.map.leafletObject;
      console.log(this.map);
      this.flag = true;
      console.log("map is ready! + " + this.flag);
      this.map.on("overlayadd", (e) => {
        console.log(e);
        if (e.name === this.isochronesName) {
        }
      });
      this.map.on("overlayremove", (e) => {
        console.log(e);
      });
    },
  },
};
</script>
<template>
  <l-map
    ref="map"
    :zoom="zoom"
    :center="centers[0].latLng"
    v-model:zoom="zoom"
    :use-global-leaflet="false"
    @ready="isReady"
    style="width: 100vw; height: 100vh"
  >
    <!-- Layers -->
    <l-tile-layer :url="url" layer-type="base" name="OpenStreetMap">
    </l-tile-layer>
    <l-feature-group :name="sheltersName" layer-type="overlay">
      <l-circle-marker
        pane="markerPane"
        v-for="feature in shelters.features"
        :key="feature.properties.ID"
        :name="feature.properties.Name"
        :lat-lng="[
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
        ]"
        :options="markerOptions"
        layer-type="overlay"
        ><l-tooltip>
          {{ feature.properties.Name }}
        </l-tooltip>
        <l-popup
          :options="popupOptions"
          :content="
            feature.properties.description
              ? feature.properties.description
              : feature.properties.Name
          "
        ></l-popup
      ></l-circle-marker>
    </l-feature-group>
    <l-geo-json
      :name="isochronesName"
      :geojson="sortedIsochrones"
      layer-type="overlay"
      :visible="false"
      :options-style="isochroneStyles"
      pane="overlayPane"
    ></l-geo-json>
    <!-- Controls -->
    <l-control-layers></l-control-layers>
    <NaviControl :map="map" :zoom="firstZoom" :centers="centers"></NaviControl>
    <LegendControl
      v-if="flag"
      :map="map"
      :isochrones="isochrones"
      :markerOptions="markerOptions"
    ></LegendControl>
  </l-map>
</template>

<style scoped></style>
