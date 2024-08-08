<script setup lang="ts">
import { LMap, LControlScale } from "@vue-leaflet/vue-leaflet";
import { ref, provide, watch, onBeforeMount } from "vue";
import type { Ref } from "vue";
import LayerControl from "./controls/LayerControl.vue";
import NavControl from "./controls/NavControl.vue";
import { loadData } from "../assets/ts/functions";
import { cities, CityName } from "@/assets/ts/constants";

const shelters = ref<any>();
const boundary = ref<any>();
const isochrones = ref<any>();
const population = ref<any>();
const isJsonDataLoad = ref<boolean>(false);
const city = ref() as Ref<CityName>;
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
provide<Ref<any>>("map", map);
provide<Ref<CityName>>("city", city);
provide<Ref<any>>("shelters", shelters);
provide<Ref<any>>("boundary", boundary);
provide<Ref<any>>("isochrones", isochrones);
provide<Ref<any>>("population", population);
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
