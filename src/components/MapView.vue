<script setup>
import { LMap, LControlLayers, LControlScale } from "@vue-leaflet/vue-leaflet";
import { ref, onMounted, provide } from "vue";
import LayerControl from "./controls/LayerControl.vue";
import NaviControl from "./controls/NaviControl.vue";
// Map Settings
const zoom = 12;
const firstZoom = 12;
const centers = [
  { name: "Chernivtsi", latLng: [48.30933, 25.94639] },
  { name: "Poltava", latLng: [49.60009, 34.54352] },
  { name: "Vinnytsia", latLng: [49.23866, 28.47993] },
  { name: "Zhytomyr", latLng: [50.26453, 28.67374] },
];
const map = ref();
const mapOptions = {
  zoomControl: true,
  attributionControl: false,
  minZoom: 3,
  maxZoom: 18,
  center: centers[0].latLng,
};
// Is map ready?
const isReady = () => {
  console.log("Map is ready");
};
onMounted(() => {
  console.log("Map is mounted");
});
provide("map", map);
</script>
<template>
  <l-map
    ref="map"
    :zoom="zoom"
    v-model:zoom="zoom"
    :use-global-leaflet="false"
    :options="mapOptions"
    @ready="isReady"
    style="width: 100vw; height: 100vh"
  >
    <!-- Controls -->
    <!-- <l-control-layers :collapsed="false"></l-control-layers> -->
    <l-control-scale :imperial="false"></l-control-scale>
    <NaviControl :zoom="firstZoom" :centers="centers" />
    <LayerControl></LayerControl>
  </l-map>
</template>
<style scoped></style>
