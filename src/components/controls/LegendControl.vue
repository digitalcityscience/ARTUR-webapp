<script setup>
import { LControl } from "@vue-leaflet/vue-leaflet";
import { inject, ref, computed } from "vue";
import { getIsochroneColor } from "@/assets/js/overlay";
const map = inject("map");
const markerColor = inject("markerColor");
const boundaryColor = inject("boundaryColor");
const isochroneRange = inject("isochroneRange");
const showLegend = ref(false);
const showPointLegend = ref(true);
const showPolygonLegend = ref(false);
const showPolylineLegend = ref(true);
const btnLegendIconClass = computed(() => {
  return showLegend.value ? "bi bi-caret-down-fill" : "bi bi-caret-up-fill";
});
map.value.leafletObject.on("overlayadd", (e) => {
  if (e.name === "isochrones") showPolygonLegend.value = true;
  else if (e.name === "boundary") showPolylineLegend.value = true;
  else showPointLegend.value = true;
});
map.value.leafletObject.on("overlayremove", (e) => {
  if (e.name === "isochrones") showPolygonLegend.value = false;
  else if (e.name === "boundary") showPolylineLegend.value = false;
  else showPointLegend.value = false;
});
</script>
<template>
  <l-control position="bottomleft">
    <button
      @click="showLegend = !showLegend"
      class="btn btn-primary btn-sm legend-button"
    >
      <i :class="btnLegendIconClass"></i>
      <strong>Legend</strong>
    </button>
    <div class="legend" v-show="showLegend">
      <div v-show="showPointLegend">
        <i class="point" :style="{ background: markerColor }"></i>
        Shelters
      </div>
      <div v-show="showPolylineLegend">
        <i class="polyline" :style="{ background: boundaryColor }"></i>
        City Boundary
      </div>
      <div v-show="showPolygonLegend">
        <template v-for="range in isochroneRange" :key="range">
          <i
            class="polygon"
            :style="{ background: getIsochroneColor(range) }"
          ></i
          >Isochrone {{ range }} min<br />
        </template>
      </div>
    </div>
  </l-control>
</template>
<style scoped>
.legend-button {
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
.legend .polyline {
  width: 12px;
  height: 2.5px;
  margin-left: 0;
  margin-top: 0.5em;
}
.legend .polygon {
  width: 12px;
  height: 12px;
}
</style>
