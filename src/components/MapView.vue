<script setup>
import { LMap, LControlScale } from "@vue-leaflet/vue-leaflet";
import { ref, provide, watch, onBeforeMount } from "vue";
import LayerControl from "./controls/LayerControl.vue";
import NaviControl from "./controls/NaviControl.vue";
import { loadData } from "../assets/js/overlay.js";
const cities = [
  { name: "Zhytomyr", latLng: [50.26453, 28.67374] },
  { name: "Dnipro", latLng: [48.467953, 35.041797] },
  { name: "Sumy", latLng: [50.911913, 34.80279] },
  { name: "Chernivtsi", latLng: [48.30933, 25.94639] },
];
const city = ref();
const shelters = ref();
const boundary = ref();
const isochrones = ref();
const isJsonDataLoad = ref(false);
onBeforeMount(() => {
  city.value = cities[0].name;
});
watch(city, async (newValue, oldValue) => {
  await loadData(newValue, shelters, boundary, isochrones);
  isJsonDataLoad.value = true;
  console.log(`change to ${newValue} from ${oldValue}`);
});
// Map Settings
const map = ref();
const zoom = 12;
const firstZoom = 12;
const mapOptions = {
  zoomControl: true,
  attributionControl: false,
  minZoom: 3,
  maxZoom: 18,
  center: cities[0].latLng,
};
provide("map", map);
provide("city", city);
provide("shelters", shelters);
provide("boundary", boundary);
provide("isochrones", isochrones);
const isReady = () => {
  console.log("Map is ready");
};
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
    <l-control-scale :imperial="false"></l-control-scale>
    <NaviControl :zoom="firstZoom" :cities="cities" />
    <LayerControl v-if="isJsonDataLoad"></LayerControl>
  </l-map>
</template>
<style scoped></style>
