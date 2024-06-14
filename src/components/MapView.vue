<script setup lang="ts">
import { LMap, LControlScale } from "@vue-leaflet/vue-leaflet";
import { ref, provide, watch, onBeforeMount } from "vue";
import type { Ref } from "vue";
import LayerControl from "./controls/LayerControl.vue";
import NavControl from "./controls/NavControl.vue";
import { loadData } from "../assets/ts/functions";
import type { City } from "../assets/ts/types.ts";
const cities: Array<City> = [
  { name: "Zhytomyr", latLng: [50.26453, 28.67374] },
  { name: "Dnipro", latLng: [48.467953, 35.041797] },
  { name: "Sumy", latLng: [50.911913, 34.80279] },
  { name: "Chernivtsi", latLng: [48.30933, 25.94639] },
];
const city = ref<string>("");
const shelters = ref<any>();
const boundary = ref<any>();
const isochrones = ref<any>();
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
  minZoom: 6,
  maxZoom: 18,
  center: cities[0].latLng,
};
provide<Ref<any>>("map", map);
provide<Ref<string>>("city", city);
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
  >
    <!-- Controls -->
    <l-control-scale :imperial="false"></l-control-scale>
    <nav-control :zoom="firstZoom" :cities="cities"></nav-control>
    <layer-control v-if="isJsonDataLoad"></layer-control>
  </l-map>
</template>
<style scoped></style>
