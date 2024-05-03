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
import { ref, onMounted, provide } from "vue";
import sheltersData from "@/assets/data/Chernivtsi_Shelters.geojson?raw";
import isochroneData from "@/assets/data/Chernivtsi_Isochrone_Geoapify.geojson?raw";
import boundaryData from "@/assets/data/Chernivtsi_Boundary.geojson?raw";
// Tile Layers Settings
const url = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
// Polyline Layer Settings
const boundary = JSON.parse(boundaryData);
const boundaryStyle = () => {
  return {
    fillOpacity: 0,
    color: "black",
  };
};
// Point Layer Settings
const shelters = JSON.parse(sheltersData);
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
const sortedIsochrones = [...isochrones.features].sort(
  (a, b) => b.properties.range - a.properties.range,
);
const isochroneStyle = (feature) => {
  return {
    fillColor: getIsochroneColor(feature.properties.range),
    fillOpacity: 0.5,
    color: "white",
    weight: 0.5,
    opacity: 1,
  };
};
const isochroneRange = [];
isochrones.features.forEach((feature) => {
  const properties = feature.properties;
  if (properties && properties.range !== undefined) {
    isochroneRange.push(properties.range);
  }
});
provide("markerColor", markerOptions.fillColor);
provide("boundaryColor", boundaryStyle().color);
provide("isochroneRange", isochroneRange);
const pointGroup = ref();
const polyline = ref();
const polygon = ref();
const ready = ref(false);
onMounted(() => {
  ready.value = true;
  console.log("Layer is mounted");
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
  <!-- Boundary -->
  <l-geo-json
    name="boundary"
    :geojson="boundary"
    layer-type="overlay"
    :visible="true"
    :options-style="boundaryStyle"
    pane="overlayPane"
    ref="polyline"
  ></l-geo-json>
  <!-- Shelters -->
  <l-feature-group name="shelters" layer-type="overlay" ref="pointGroup">
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
  <!-- Isochrones -->
  <l-geo-json
    name="isochrones"
    :geojson="sortedIsochrones"
    layer-type="overlay"
    :visible="false"
    :options-style="isochroneStyle"
    pane="overlayPane"
    ref="polygon"
  ></l-geo-json>
  <LegendControl v-if="ready"></LegendControl>
  <RightSiderbarControl v-if="ready">
    <template v-slot:layers>
      <input type="radio" id="tilelayer" name="tilelayer" value="tilelayer" />
      <label for="tilelayer">OpenStreetMap</label><br />
      <input
        type="checkbox"
        id="shelters"
        name="shelters"
        value="shelters"
      /><label for="shelters">Shelters</label>
    </template>
  </RightSiderbarControl>
</template>
<style scoped></style>
