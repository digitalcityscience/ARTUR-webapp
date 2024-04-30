<script setup>
import { LMap, LTileLayer, LControlLayers } from "@vue-leaflet/vue-leaflet";
import { ref } from "vue";
import OverlayControl from "./controls/OverlayControl.vue";
import NaviControl from "./controls/NaviControl.vue";
import "leaflet/dist/leaflet.css";
// // Import Leaflet
// import * as L from "leaflet";

// Map Setting
const zoom = 12;
const firstZoom = 12;
const centers = [
  { name: "Chernivtsi", latLng: [48.30933, 25.94639] },
  { name: "Poltava", latLng: [49.60009, 34.54352] },
  { name: "Vinnytsia", latLng: [49.23866, 28.47993] },
  { name: "Zhytomyr", latLng: [50.26453, 28.67374] },
];
const map = ref();
const flag = ref(false);
// Tile Layers Setting
const url = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";

const isReady = () => {
  flag.value = true;
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
    <!-- Controls -->
    <l-control-layers></l-control-layers>
    <NaviControl v-if="flag" :map="map" :zoom="firstZoom" :centers="centers" />
    <OverlayControl v-if="flag" :map="map"></OverlayControl>
  </l-map>
</template>

<style scoped></style>
