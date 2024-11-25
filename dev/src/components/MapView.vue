<script setup lang="ts">
import {
  LMap,
  LControlScale,
  LTileLayer,
  LGeoJson,
  LControlAttribution,
} from "@vue-leaflet/vue-leaflet";
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
  zoomControl: false,
  attributionControl: true,
  zoom: 6,
  minZoom: 4,
  maxZoom: 18,
  center: [49.35910584900799, 32.49031727913723],
  preferCanvas: true,
  interactive: false,
  maxBounds: [
    // South-West corner of the bounding box
    [35.0, 20.0],
    // North-East corner of the bounding box
    [55.0, 50.0],
  ],
  maxBoundsViscosity: 1.0,
};
// Boundary Style
const boundaryStyle = () => {
  return {
    fillOpacity: 0,
    color: "#43b0f1",
  };
};

const isReady = ref(false);
const onReady = () => {
  mapStore.map = map.value.leafletObject;
  isReady.value = true;
  // const attributionControl = map.value.leafletObject.attributionControl;
  // attributionControl.addAttribution = `<img src= "/public/giz-logo.png"`;
};
</script>

<template>
  <l-map
    ref="map"
    :use-global-leaflet="false"
    :options="mapOptions"
    @ready="onReady"
    attributionControl="false"
  >
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
    <l-geo-json
      name="Ukraine Boundary"
      :geojson="mapStore.geojsonData.countryBoundary"
      layer-type="overlay"
      :options-style="boundaryStyle"
      pane="overlayPane"
    ></l-geo-json>
    <!-- Controls -->
    <l-control-scale :imperial="false"></l-control-scale>
    <overlay-control v-if="isReady"></overlay-control>
    <sidebar-control v-if="isReady"></sidebar-control>
  </l-map>
</template>
