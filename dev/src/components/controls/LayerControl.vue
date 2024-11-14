<script setup lang="ts">
import {
  LGeoJson,
  LCircleMarker,
  LFeatureGroup,
  LTileLayer,
  LTooltip,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import LegendControl from "@/components/controls/LegendControl.vue";
import { getIsochroneColor, getPopulationColor } from "@/assets/ts/functions";
import { LayerName } from "@/assets/ts/constants";
import { onMounted, ref } from "vue";
import type { Point, Feature } from "geojson";
import type { ShelterProperties } from "@/assets/ts/types";
import { basemaps } from "@/assets/ts/constants";
import useMapStore from "@/stores/mapStore";

// Pinia Store
const mapStore = useMapStore();
// Shelter Layer Settings
const markerOptions = {
  radius: 5,
  fillColor: mapStore.vectorLayers.shelterLayer.color!,
  color: "white",
  weight: 1,
  opacity: 0.8,
  fillOpacity: 0.8,
};
const togglePopup = (feature: Feature<Point, ShelterProperties>) => {
  mapStore.popup = feature.properties.description
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
  e.target.setStyle({ color: "white", weight: 1 });
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
    fillColor: getIsochroneColor(feature.properties.range, 5),
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
    weight: 0.05,
    opacity: 0.95,
  };
};
const onEachFeatureFunction = () => {
  return (feature: any, layer: any) => {
    layer.bindTooltip(`<div>${feature.properties.value}</div>`, {
      permanent: true,
      sticky: true,
    });
  };
};
const populationOptions = {
  onEachFeature: onEachFeatureFunction,
};
// Health Site Point Layer Settings
const healthSiteOptions = {
  radius: 5,
  fillColor: mapStore.vectorLayers.healthSiteLayer.color!,
  color: "white",
  weight: 1,
  opacity: 0.8,
  fillOpacity: 0.8,
};
const healthSiteIsochroneStyle = (feature: any) => {
  return {
    fillColor: getIsochroneColor(feature.properties.range, 10),
    fillOpacity: 0.5,
    color: "white",
    weight: 0.5,
    opacity: 1,
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
  <!-- Shelter Population -->
  <l-geo-json
    :name="LayerName.POPULATION"
    :geojson="mapStore.geojsonData.population"
    :visible="mapStore.vectorLayers.populationLayer.visible as unknown as boolean"
    layer-type="overlay"
    :options-style="populationStyle"
    pane="overlayPane"
  ></l-geo-json>
  <!-- Health Site Point -->
  <l-feature-group
    :name="LayerName.HEALTHSITEPOINT"
    layer-type="overlay"
    :visible="mapStore.vectorLayers.healthSiteLayer.visible as unknown as boolean"
  >
    <l-circle-marker
      pane="markerPane"
      v-for="(feature, index) in mapStore.geojsonData.healthSitePoint!.features"
      :key="`${index}-${feature.properties.name}`"
      :lat-lng="[feature.geometry.coordinates[0][1], feature.geometry.coordinates[0][0]]"
      :options="healthSiteOptions"
      @mouseover="highlightPoint"
      @mouseout="resetHighlight"
      layer-type="overlay"
      ><l-tooltip>{{ feature.properties.amenity }}</l-tooltip>
      <l-popup>{{ feature.properties.name }}</l-popup>
    </l-circle-marker>
  </l-feature-group>
  <!-- Health Site Isochrones -->
  <l-geo-json
    :name="LayerName.HEALTHSITEISOCHRONE"
    :geojson="mapStore.geojsonData.healthSiteIsochrone"
    :visible="mapStore.vectorLayers.healthSiteIsochroneLayer.visible as unknown as boolean"
    layer-type="overlay"
    :options-style="healthSiteIsochroneStyle"
    pane="overlayPane"
  ></l-geo-json>
  <!-- Health Site Population -->
  <l-geo-json
    :name="LayerName.HEALTHSITEPOPULATION"
    :geojson="mapStore.geojsonData.healthSitePopulation"
    :visible="mapStore.vectorLayers.healthSitePopulationLayer.visible as unknown as boolean"
    layer-type="overlay"
    :options-style="populationStyle"
    :options="populationOptions"
    pane="overlayPane"
  ></l-geo-json>
  <legend-control></legend-control>
</template>
