<script setup lang="ts">
import { LMap, LControlScale, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { ref } from "vue";
import useMapStore from "@/stores/mapStore";
import { basemaps } from "@/assets/ts/constants";
import OverlayControl from "./controls/OverlayControl.vue";
import SidebarControl from "@/components/controls/SidebarControl.vue";

// Pinia Store
const mapStore = useMapStore();
// Map Settings
const map = ref();
const mapOptions = {
  zoomControl: true,
  attributionControl: true,
  zoom: 6,
  minZoom: 6,
  maxZoom: 18,
  center: [49.35910584900799, 32.49031727913723],
  preferCanvas: true,
  interactive: false,
};

const isReady = ref(false);
const onReady = () => {
  mapStore.map = map.value.leafletObject;
  isReady.value = true;
};
</script>

<template>
  <l-map ref="map" :use-global-leaflet="false" :options="mapOptions" @ready="onReady">
    <!-- Base Layers -->
    <template v-for="basemap in basemaps" :key="basemap.name">
      <l-tile-layer
        :url="basemap.url"
        layer-type="base"
        :name="basemap.name"
        :visible="basemap.visible.value"
        pane="tilePane"
      ></l-tile-layer>
    </template>
    <!-- Controls -->
    <l-control-scale :imperial="false"></l-control-scale>
    <overlay-control v-if="isReady"></overlay-control>
    <sidebar-control v-if="isReady"></sidebar-control>
  </l-map>
</template>
