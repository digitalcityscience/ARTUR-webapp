<script setup lang="ts">
import { LMap, LControlScale, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";
import { ref, onBeforeMount } from "vue";
import useGeoDataStore from "@/stores/geoDataStore";
import useLayerStore from "@/stores/layerStore";
import { basemaps } from "@/assets/ts/constants";
import OverlayControl from "@/components/OverlayControl.vue";
import SidebarControl from "@/components/SidebarControl.vue";

// Pinia Store
const geoDataStore = useGeoDataStore();
const layerStore = useLayerStore();
// Map Settings
const map = ref();
const mapOptions = {
  zoomControl: false,
  attributionControl: false,
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
    color: layerStore.boundaryLayer.color,
  };
};
onBeforeMount(async () => {
  await geoDataStore.fetchCountrywideData();
});

const mapIsReady = ref(false);
const onReady = () => {
  geoDataStore.map = map.value.leafletObject;
  mapIsReady.value = true;
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
    <!-- Base Map -->
    <template v-for="basemap in basemaps" :key="basemap.name">
      <l-tile-layer
        :url="basemap.url"
        layer-type="base"
        :name="basemap.name"
        :visible="basemap.visible.value"
        pane="tilePane"
      ></l-tile-layer>
    </template>
    <!-- Boundary -->
    <l-geo-json
      :geojson="geoDataStore.geojsonData.countryBoundary"
      layer-type="overlay"
      :options-style="boundaryStyle"
      :visible="layerStore.boundaryLayer.visible"
      pane="overlayPane"
    ></l-geo-json>
    <!-- Controls -->
    <l-control-scale :imperial="false"></l-control-scale>
    <overlay-control v-if="mapIsReady"></overlay-control>
    <sidebar-control v-if="mapIsReady"></sidebar-control>
  </l-map>
</template>
