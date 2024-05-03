<script setup>
import {
  LGeoJson,
  LCircleMarker,
  LFeatureGroup,
  LTileLayer,
  LTooltip,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import LegendControl from "@/components/controls/LegendControl.vue";
import RightSiderbarControl from "@/components/controls/RightSiderbarControl.vue";
import { getIsochroneColor } from "@/assets/js/overlay";
import { provide, ref } from "vue";
import sheltersData from "@/assets/data/Chernivtsi_Shelters.geojson?raw";
import isochroneData from "@/assets/data/Chernivtsi_Isochrone_Geoapify.geojson?raw";
import boundaryData from "@/assets/data/Chernivtsi_Boundary.geojson?raw";
// Tile Layers Settings
const url = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
// Polyline Layer Settings
const boundary = JSON.parse(boundaryData);
const boundaryName = "City Boundary";
const showBoundary = ref(true);
const boundaryStyle = () => {
  return {
    fillOpacity: 0,
    color: "black",
  };
};
// Point Layer Settings
const shelters = JSON.parse(sheltersData);
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
const popupOptions = {
  autoPan: false,
};
// Isochrone Layer Settings
const isochrones = JSON.parse(isochroneData);
const isochronesName = "Isochrones";
const showIsochrones = ref(true);
const isochroneRange = [];
isochrones.features.forEach((feature) => {
  const properties = feature.properties;
  if (properties && properties.range !== undefined) {
    isochroneRange.push(properties.range);
  }
});
isochrones.features.sort((a, b) => b.properties.range - a.properties.range);
const isochroneStyle = (feature) => {
  return {
    fillColor: getIsochroneColor(feature.properties.range),
    fillOpacity: 0.5,
    color: "white",
    weight: 0.5,
    opacity: 1,
  };
};
provide("markerColor", markerOptions.fillColor);
provide("boundaryColor", boundaryStyle().color);
provide("isochroneRange", isochroneRange);
provide("sheltersLayer", { name: sheltersName, visible: showShelters });
provide("boundaryLayer", { name: boundaryName, visible: showBoundary });
provide("isochronesLayer", { name: isochronesName, visible: showIsochrones });
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
      layer-type="overlay"
      ><l-tooltip>
        {{ feature.properties.Name }}
      </l-tooltip>
      <l-popup
        :options="popupOptions"
        :content="
          feature.properties.description
            ? feature.properties.description
            : feature.properties.Name
        "
      ></l-popup
    ></l-circle-marker>
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
  <RightSiderbarControl></RightSiderbarControl>
</template>
<style scoped>
.label-text {
  margin-left: 3px;
}
</style>
