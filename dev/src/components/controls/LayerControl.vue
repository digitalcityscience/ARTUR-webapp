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
import { getIsochroneColor, getPopulationColor } from "@/assets/ts/functions";
import { LayerName } from "@/assets/ts/constants";
import { onMounted, ref, watch } from "vue";
import type { Point, Feature } from "geojson";
import type { ShelterProperties } from "@/assets/ts/types";
import { basemaps } from "@/assets/ts/constants";
import useMapStore from "@/stores/mapStore";

// Pinia Store
const mapStore = useMapStore();
// Switch to another city, the popup content would be cleared
watch(
  () => mapStore.city,
  () => {
    popup.value = "";
  },
);
// Shelter Layer Settings
const markerOptions = {
  radius: 5,
  fillColor: mapStore.vectorLayers.shelterLayer.color!,
  color: "white",
  weight: 1,
  opacity: 0.8,
  fillOpacity: 0.8,
};
const popup = ref<string>("");
const togglePopup = (feature: Feature<Point, ShelterProperties>) => {
  popup.value = feature.properties.description
    ? feature.properties.description
    : feature.properties.name;
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
// Boundary Layer Settings
const boundaryStyle = () => {
  return {
    fillOpacity: 0,
    color: mapStore.vectorLayers.boundaryLayer.color,
  };
};
// Isochrone Layer Settings
const isochroneStyle = (feature: any) => {
  return {
    fillColor: getIsochroneColor(feature.properties.range),
    fillOpacity: 0.5,
    color: "white",
    weight: 0.5,
    opacity: 1,
  };
};
// Population Layer Settings
const populationStyle = (feature: any) => {
  return {
    fillColor: getPopulationColor(feature.properties.value, feature.properties.access),
    fillOpacity: 0.8,
    color: "white",
    weight: 1,
    opacity: 0.95,
  };
};
const isLayerLoad = ref(false);
onMounted(() => {
  isLayerLoad.value = true;
});
</script>

<template>
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
  <!-- Shelters -->
  <l-feature-group
    :name="LayerName.SHELTER"
    layer-type="overlay"
    :visible="mapStore.vectorLayers.shelterLayer.visible as unknown as boolean"
  >
    <l-circle-marker
      pane="markerPane"
      v-for="(feature, index) in mapStore.geojsonData.shelters!.features"
      :key="`${index}-${feature.properties.name}`"
      :name="feature.properties.name"
      :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
      :options="markerOptions"
      @click="togglePopup(feature)"
      @mouseover="highlightPoint"
      @mouseout="resetHighlight"
      layer-type="overlay"
      ><l-tooltip>
        {{ feature.properties.name }}
      </l-tooltip>
    </l-circle-marker>
  </l-feature-group>
  <!-- Boundary -->
  <l-geo-json
    :name="LayerName.BOUNDARY"
    :geojson="mapStore.geojsonData.boundary"
    :visible="mapStore.vectorLayers.boundaryLayer.visible as unknown as boolean"
    layer-type="overlay"
    :options-style="boundaryStyle"
    pane="overlayPane"
  ></l-geo-json>
  <!-- Isochrones -->
  <l-geo-json
    :name="LayerName.ISOCHRONE"
    :geojson="mapStore.geojsonData.isochrones"
    :visible="mapStore.vectorLayers.isochroneLayer.visible as unknown as boolean"
    layer-type="overlay"
    :options-style="isochroneStyle"
    pane="overlayPane"
  ></l-geo-json>
  <!-- Population -->
  <l-geo-json
    :name="LayerName.POPULATION"
    :geojson="mapStore.geojsonData.population"
    :visible="mapStore.vectorLayers.populationLayer.visible as unknown as boolean"
    layer-type="overlay"
    :options-style="populationStyle"
    pane="overlayPane"
  ></l-geo-json>
  <legend-control></legend-control>
  <sidebar-control>
    <template #popup>
      <h6 v-html="popup" style="margin-left: 1em"></h6>
    </template>
  </sidebar-control>
</template>
