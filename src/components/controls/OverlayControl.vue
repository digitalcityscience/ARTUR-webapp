<script setup>
import {
  LControl,
  LGeoJson,
  LCircleMarker,
  LFeatureGroup,
  LTooltip,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import RightSiderbarControl from "@/components/controls/RightSiderbarControl.vue";
import { getIsochroneColor } from "@/assets/js/overlay";
import { computed, ref, onMounted, inject } from "vue";
import sheltersData from "@/assets/data/Chernivtsi_Shelters.geojson?raw";
import isochroneData from "@/assets/data/Chernivtsi_Isochrone_Geoapify.geojson?raw";
import boundaryData from "@/assets/data/Chernivtsi_Boundary.geojson?raw";
// Polyline Layer Settings
const boundary = JSON.parse(boundaryData);
const boundaryName = "Boundary";
const boundaryStyle = () => {
  return {
    fillOpacity: 0,
    color: "black",
  };
};
// Points Layer Settings
const shelters = JSON.parse(sheltersData);
const sheltersName = "Shelters";
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
// Isochrones Layer Settings
const isochrones = JSON.parse(isochroneData);
const sortedIsochrones = [...isochrones.features].sort(
  (a, b) => b.properties.range - a.properties.range,
);
const isochronesName = "Isochrones";
const isochroneStyle = (feature) => {
  return {
    fillColor: getIsochroneColor(feature.properties.range),
    fillOpacity: 0.5,
    color: "white",
    weight: 0.5,
    opacity: 1,
  };
};
// Legend
const map = inject("map");
const showLegend = ref(false);
const showPointLegend = ref(true);
const showPolygonLegend = ref(false);
const showPolylineLegend = ref(true);
const btnLegendIconClass = computed(() => {
  return showLegend.value ? "bi bi-caret-down-fill" : "bi bi-caret-up-fill";
});
map.value.leafletObject.on("overlayadd", (e) => {
  if (e.name === isochronesName) showPolygonLegend.value = true;
  else if (e.name === boundaryName) showPolylineLegend.value = true;
  else showPointLegend.value = true;
});
map.value.leafletObject.on("overlayremove", (e) => {
  if (e.name === isochronesName) showPolygonLegend.value = false;
  else if (e.name === boundaryName) showPolylineLegend.value = false;
  else showPointLegend.value = false;
});
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
  <!-- Overlay Import -->
  <!-- Boundary -->
  <l-geo-json
    :name="boundaryName"
    :geojson="boundary"
    layer-type="overlay"
    :visible="true"
    :options-style="boundaryStyle"
    pane="overlayPane"
    ref="polyline"
  ></l-geo-json>
  <!-- Shelters -->
  <l-feature-group :name="sheltersName" layer-type="overlay" ref="pointGroup">
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
    :name="isochronesName"
    :geojson="sortedIsochrones"
    layer-type="overlay"
    :visible="false"
    :options-style="isochroneStyle"
    pane="overlayPane"
    ref="polygon"
  ></l-geo-json>
  <!-- Popup Description -->
  <!-- <SidebarLeft></SidebarLeft> -->
  <!-- Legend Control -->
  <l-control position="bottomleft">
    <button
      @click="showLegend = !showLegend"
      class="btn btn-primary btn-sm legend__button"
    >
      <i :class="btnLegendIconClass"></i>
      <strong>Legend</strong>
    </button>
    <div class="legend" v-show="showLegend">
      <div class="legend--point" v-show="showPointLegend">
        <i class="point" :style="{ background: markerOptions.fillColor }"></i>
        Shelters
      </div>
      <div class="legend--polyline" v-show="showPolylineLegend">
        <i class="polyline" :style="{ background: boundaryStyle().color }"></i>
        City Boundary
      </div>
      <div class="legend--polygon" v-show="showPolygonLegend">
        <template
          v-for="feature in isochrones.features"
          :key="feature.properties.range"
        >
          <i
            class="polygon"
            :style="{ background: getIsochroneColor(feature.properties.range) }"
          ></i
          >Isochrone {{ feature.properties.range }} min<br />
        </template>
      </div>
    </div>
  </l-control>
  <RightSiderbarControl v-if="ready"></RightSiderbarControl>
</template>

<style scoped>
.legend__button {
  position: relative;
  width: 100%;
}
.legend {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  line-height: 18px;
  color: #555;
}
.legend i {
  margin-top: 2.7px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}
.legend .point {
  border-radius: 50%;
  width: 12px;
  height: 12px;
}
.legend .polygon {
  width: 12px;
  height: 12px;
}
.legend .polyline {
  width: 12px;
  height: 2.5px;
  margin-left: 0;
  margin-top: 0.5em;
}
</style>
