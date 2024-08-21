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
import { provide, ref, inject } from "vue";
import type { Ref } from "vue";
import type { FeatureCollection, Point, Polygon, MultiPolygon, Feature } from "geojson";
import type {
  Layer,
  ShelterProperties,
  IsochroneProperties,
  PopulationProperties,
} from "@/assets/ts/types";
import { InjectionKeyEnum } from "@/assets/ts/constants";

// Tile Layers Settings
const url = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
// Shelter Layer Settings
const shelters = inject(InjectionKeyEnum.SHELTER_GEOJSON) as Ref<
  FeatureCollection<Point, ShelterProperties>
>;
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
const boundary = inject<Ref<FeatureCollection<Polygon>>>(InjectionKeyEnum.BOUNDARY_GEOJSON);
const showBoundary = ref<boolean>(true);
const boundaryStyle = () => {
  return {
    fillOpacity: 0,
    color: "black",
  };
};
// Isochrone Layer Settings
const isochrones = inject<Ref<FeatureCollection<MultiPolygon, IsochroneProperties>>>(
  InjectionKeyEnum.ISOCHRONE_GEOJSON,
);
const showIsochrones = ref<boolean>(true);
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
const population = inject(InjectionKeyEnum.POPULATION_GEOJSON) as Ref<
  FeatureCollection<MultiPolygon, PopulationProperties>
>;
const showPopulation = ref<boolean>(false);
const populationStyle = (feature: any) => {
  return {
    fillColor: getPopulationColor(feature.properties.value, feature.properties.access),
    fillOpacity: 0.8,
    color: "white",
    weight: 1,
    opacity: 0.95,
  };
};
// Provide layers
provide<Layer>(InjectionKeyEnum.SHELTER_LAYER, {
  name: LayerName.SHELTER,
  visible: showShelters,
  color: markerOptions.fillColor,
});
provide<Layer>(InjectionKeyEnum.BOUNDARY_LAYER, {
  name: LayerName.BOUNDARY,
  visible: showBoundary,
  color: boundaryStyle().color,
});
provide<Layer>(InjectionKeyEnum.ISOCHRONE_LAYER, {
  name: LayerName.ISOCHRONE,
  visible: showIsochrones,
  range: [1, 2, 3, 4, 5],
});
provide<Layer>(InjectionKeyEnum.POPULATION_LAYER, {
  name: LayerName.POPULATION,
  visible: showPopulation,
  range: [45, 35, 25, 15, 5],
});
</script>

<template>
  <!-- Base Layers -->
  <l-tile-layer :url="url" layer-type="base" name="OpenStreetMap" pane="tilePane"></l-tile-layer>
  <!-- Shelters -->
  <l-feature-group :name="LayerName.SHELTER" layer-type="overlay" :visible="showShelters">
    <l-circle-marker
      pane="markerPane"
      v-for="(feature, index) in shelters.features"
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
    :geojson="boundary"
    :visible="showBoundary"
    layer-type="overlay"
    :options-style="boundaryStyle"
    pane="overlayPane"
  ></l-geo-json>
  <!-- Isochrones -->
  <l-geo-json
    :name="LayerName.ISOCHRONE"
    :geojson="isochrones"
    :visible="showIsochrones"
    layer-type="overlay"
    :options-style="isochroneStyle"
    pane="overlayPane"
  ></l-geo-json>
  <!-- Population -->
  <l-geo-json
    :name="LayerName.POPULATION"
    :geojson="population"
    :visible="showPopulation"
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
<style scoped></style>
