<script setup>
import {
  LGeoJson,
  LCircleMarker,
  LFeatureGroup,
  LTileLayer,
  LTooltip,
} from "@vue-leaflet/vue-leaflet";
import LegendControl from "@/components/controls/LegendControl.vue";
import RightSiderbarControl from "@/components/controls/RightSiderbarControl.vue";
import { getIsochroneColor } from "@/assets/js/overlay";
import { provide, ref, inject } from "vue";
// Tile Layers Settings
const url = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
// Point Layer Settings
const shelters = inject("shelters");
const sheltersName = "Shelters";
const showShelters = ref(true);
const markerOptions = {
  radius: 5,
  fillColor: "orange",
  color: "white",
  weight: 1,
  opacity: 0.8,
  fillOpacity: 0.8,
};
const popup = ref();
const togglePopup = (feature) => {
  popup.value = feature.properties.description
    ? feature.properties.description
    : feature.properties.Name;
};
const highlightPoint = (e) => {
  e.target.setStyle({
    weight: 3,
    dashArray: "",
    color: "black",
  });
};
const resetHighlight = (e) => {
  e.target.setStyle(markerOptions);
};
// Polyline Layer Settings
const boundary = inject("boundary");
const boundaryName = "City Boundary";
const showBoundary = ref(true);
const boundaryStyle = () => {
  return {
    fillOpacity: 0,
    color: "black",
  };
};
// Isochrone Layer Settings
const isochrones = inject("isochrones");
const isochronesName = "Isochrones";
const showIsochrones = ref(true);
const isochroneRange = [1, 2, 3, 4, 5];
const isochroneStyle = (feature) => {
  return {
    fillColor: getIsochroneColor(feature.properties.range),
    fillOpacity: 0.5,
    color: "white",
    weight: 0.5,
    opacity: 1,
  };
};
provide("sheltersLayer", {
  name: sheltersName,
  visible: showShelters,
  color: markerOptions.fillColor,
});
provide("boundaryLayer", {
  name: boundaryName,
  visible: showBoundary,
  color: boundaryStyle().color,
});
provide("isochronesLayer", {
  name: isochronesName,
  visible: showIsochrones,
  color: isochroneRange,
});
</script>

<template>
  <!-- Base Layers -->
  <l-tile-layer
    :url="url"
    layer-type="base"
    name="OpenStreetMap"
    pane="tilePane"
  >
  </l-tile-layer>
  <!-- Shelters -->
  <l-feature-group
    :name="sheltersName"
    layer-type="overlay"
    :visible="showShelters"
  >
    <l-circle-marker
      pane="markerPane"
      v-for="feature in shelters.features"
      :key="feature.properties.ID"
      :name="feature.properties.Name"
      :lat-lng="[
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0],
      ]"
      :options="markerOptions"
      @click="togglePopup(feature)"
      @mouseover="highlightPoint"
      @mouseout="resetHighlight"
      layer-type="overlay"
      ><l-tooltip>
        {{ feature.properties.Name }}
      </l-tooltip>
    </l-circle-marker>
  </l-feature-group>
  <!-- Boundary -->
  <l-geo-json
    :name="boundaryName"
    :geojson="boundary"
    :visible="showBoundary"
    layer-type="overlay"
    :options-style="boundaryStyle"
    pane="overlayPane"
  ></l-geo-json>
  <!-- Isochrones -->
  <l-geo-json
    :name="isochronesName"
    :geojson="isochrones"
    :visible="showIsochrones"
    layer-type="overlay"
    :options-style="isochroneStyle"
    pane="overlayPane"
  ></l-geo-json>
  <LegendControl></LegendControl>
  <RightSiderbarControl>
    <template #popup>
      <h6 v-html="popup" style="margin-left: 1em"></h6>
    </template>
  </RightSiderbarControl>
</template>
<style scoped></style>
