<script setup>
import { LControl } from "@vue-leaflet/vue-leaflet";
import { inject, ref, computed } from "vue";
import { getIsochroneColor } from "@/assets/js/overlay";
const sheltersLayer = inject("sheltersLayer");
const boundaryLayer = inject("boundaryLayer");
const isochronesLayer = inject("isochronesLayer");
const showLegend = ref(false);
const btnLegendIconClass = computed(() => {
  return showLegend.value ? "bi bi-caret-down-fill" : "bi bi-caret-up-fill";
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
      <div v-show="sheltersLayer.visible.value">
        <i class="point" :style="{ background: sheltersLayer.color }"></i>
        Shelters
      </div>
      <div v-show="boundaryLayer.visible.value">
        <i class="polyline" :style="{ background: boundaryLayer.color }"></i>
        City Boundary
      </div>
      <div v-show="isochronesLayer.visible.value">
        <template v-for="range in isochronesLayer.color" :key="range">
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
