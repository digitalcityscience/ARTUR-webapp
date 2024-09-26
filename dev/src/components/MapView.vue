<script setup lang="ts">
import { LMap, LControlScale } from "@vue-leaflet/vue-leaflet";
import { ref, onBeforeMount } from "vue";
import { useMapStore } from "@/stores/useMapStore";
import LayerControl from "./controls/LayerControl.vue";
import NavControl from "./controls/NavControl.vue";
import { cities } from "@/assets/ts/constants";

// Map Settings
const map = ref();
const firstZoom = 12;
const mapOptions = {
  zoomControl: true,
  attributionControl: true,
  zoom: firstZoom,
  minZoom: 6,
  maxZoom: 18,
  center: cities[0].latLng,
  preferCanvas: true,
  interactive: false,
};

// Pinia Store
const mapStore = useMapStore();
// Initialize city data before mount
onBeforeMount(() => {
  mapStore.fetchGeoData(mapStore.city);
});
const isReady = ref(false);
const onReady = () => {
  mapStore.map = map.value.leafletObject;
  isReady.value = true;
};
</script>

<template>
  <l-map ref="map" :use-global-leaflet="false" :options="mapOptions" @ready="onReady">
    <!-- Controls -->
    <l-control-scale :imperial="false"></l-control-scale>
    <nav-control :zoom="firstZoom" v-if="isReady"></nav-control>
    <layer-control v-if="isReady && mapStore.isJsonDataLoad"></layer-control>
  </l-map>
</template>
