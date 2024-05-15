<script setup lang="ts">
import { LMap, LControlScale } from "@vue-leaflet/vue-leaflet";
import { ref, provide, watch, onBeforeMount } from "vue";
import type { Ref } from "vue";
import LayerControl from "./controls/LayerControl.vue";
import NaviControl from "./controls/NaviControl.vue";
import { loadData } from "../assets/ts/functions";
import type { City } from "../assets/ts/types.ts";
const cities: Array<City> = [
  { name: "Zhytomyr", latLng: [50.26453, 28.67374] },
  { name: "Dnipro", latLng: [48.467953, 35.041797] },
  { name: "Sumy", latLng: [50.911913, 34.80279] },
  { name: "Chernivtsi", latLng: [48.30933, 25.94639] },
];
const city = ref<string | null>(null);
const shelters = ref();
const boundary = ref();
const isochrones = ref();
const isJsonDataLoad = ref<boolean>(false);
onBeforeMount(() => {
  city.value = cities[0].name;
});
watch(city, async (newValue) => {
  await loadData(newValue, shelters, boundary, isochrones);
  isJsonDataLoad.value = true;
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
provide<Ref<any>>("map", map);
provide<Ref<string | null>>("city", city);
provide<Ref<any>>("shelters", shelters);
provide<Ref<any>>("boundary", boundary);
provide<Ref<any>>("isochrones", isochrones);
</script>
<template>
  <l-map
    ref="map"
    v-model:zoom="zoom"
    :use-global-leaflet="false"
    :options="mapOptions"
    style="width: 100vw; height: 100vh"
  >
    <!-- Controls -->
    <l-control-scale :imperial="false"></l-control-scale>
    <NaviControl :zoom="firstZoom" :cities="cities" />
    <LayerControl v-if="isJsonDataLoad"></LayerControl>
  </l-map>
</template>
<style scoped></style>
