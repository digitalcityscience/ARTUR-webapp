<script setup lang="ts">
import {
  LGeoJson,
  LCircleMarker,
  LFeatureGroup,
  LTileLayer,
  LTooltip,
} from "@vue-leaflet/vue-leaflet";
import LegendControl from "@/components/controls/LegendControl.vue";
import SidebarControl from "@/components/controls/SidebarControl.vue";
import { getIsochroneColor } from "@/assets/ts/functions";
import { provide, ref, inject } from "vue";
import type { Ref } from "vue";
import type { Layer } from "@/assets/ts/types";
// Tile Layers Settings
const url = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
// Point Layer Settings
const shelters = inject<Ref<any>>("shelters");
const sheltersName: string = "Shelters";
const showShelters = ref<boolean>(true);
const markerOptions = {
  radius: 5,
  fillColor: "orange",
  color: "white",
  weight: 1,
  opacity: 0.8,
  fillOpacity: 0.8,
};
const popup = ref<string>("");
const togglePopup = (feature: any) => {
  popup.value = feature.properties.description
    ? feature.properties.description
    : feature.properties.Name;
};
const highlightPoint = (e: any) => {
  e.target.setStyle({
    weight: 3,
    dashArray: "",
    color: "black",
  });
};
const resetHighlight = (e: any) => {
  e.target.setStyle(markerOptions);
};
// Polyline Layer Settings
const boundary = inject<Ref<any>>("boundary");
const boundaryName: string = "City Boundary";
const showBoundary = ref<boolean>(true);
const boundaryStyle = () => {
  return {
    fillOpacity: 0,
    color: "black",
  };
};
// Isochrone Layer Settings
const isochrones = inject<Ref<any>>("isochrones");
const isochronesName = "Isochrones";
const showIsochrones = ref<boolean>(true);
const isochroneRange = [1, 2, 3, 4, 5];
const isochroneStyle = (feature: any) => {
  return {
    fillColor: getIsochroneColor(feature.properties.range),
    fillOpacity: 0.5,
    color: "white",
    weight: 0.5,
    opacity: 1,
  };
};
provide<Layer>("sheltersLayer", {
  name: sheltersName,
  visible: showShelters,
  color: markerOptions.fillColor,
});
provide<Layer>("boundaryLayer", {
  name: boundaryName,
  visible: showBoundary,
  color: boundaryStyle().color,
});
provide<Layer>("isochronesLayer", {
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
      v-for="(feature, index) in shelters.features"
      :key="`${index}-${feature.properties.Name}`"
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
  <legend-control></legend-control>
  <sidebar-control>
    <template #popup>
      <h6 v-html="popup" style="margin-left: 1em"></h6>
    </template>
  </sidebar-control>
</template>
<style scoped></style>
