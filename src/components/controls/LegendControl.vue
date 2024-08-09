<script setup lang="ts">
import { LControl } from "@vue-leaflet/vue-leaflet";
import { inject, ref, computed } from "vue";
import { InjectionKeyEnum } from "@/assets/ts/constants";
import {
  getIsochroneColor,
  getPopulationColor,
  populationRangeToString,
} from "@/assets/ts/functions";
import type { Layer } from "@/assets/ts/types";

const sheltersLayer = inject(InjectionKeyEnum.SHELTER_LAYER) as Layer;
const boundaryLayer = inject(InjectionKeyEnum.BOUNDARY_LAYER) as Layer;
const isochronesLayer = inject(InjectionKeyEnum.ISOCHRONE_LAYER) as Layer;
const populationLayer = inject(InjectionKeyEnum.POPULATION_LAYER) as Layer;
const showLegend = ref(true);
const btnLegendIconClass = computed(() => {
  return showLegend.value ? "bi bi-caret-down-fill" : "bi bi-caret-up-fill";
});
</script>
<template>
  <l-control position="bottomleft">
    <button @click="showLegend = !showLegend" class="btn btn-primary btn-sm legend-button">
      <i :class="btnLegendIconClass" style="float: left; padding-right: 5px"></i>
      <strong>Legend</strong>
      <i class="bi bi-map" style="float: right; padding-left: 5px"></i>
    </button>
    <div class="legend" v-show="showLegend">
      <div v-show="sheltersLayer.visible.value">
        <i class="point" :style="{ background: sheltersLayer.color }"></i>
        {{ sheltersLayer.name }}
      </div>
      <div v-show="boundaryLayer.visible.value">
        <i class="polyline" :style="{ background: boundaryLayer.color }"></i>
        {{ boundaryLayer.name }}
      </div>
      <div v-show="isochronesLayer.visible.value">
        <template v-for="range in isochronesLayer.range" :key="range">
          <i class="polygon" :style="{ background: getIsochroneColor(range) }"></i>Isochrone
          {{ range }} min<br />
        </template>
      </div>
      <div v-show="populationLayer.visible.value">
        <template v-for="range in populationLayer.range" :key="range">
          <i class="point" :style="{ background: getPopulationColor(range, 1) }"></i>Population
          accessibility in 5 min: {{ populationRangeToString(range) }}<br />
        </template>
        <template v-for="range in populationLayer.range" :key="range">
          <i class="point" :style="{ background: getPopulationColor(range, 0) }"></i>Population not
          accessible in 5 min: {{ populationRangeToString(range) }}<br />
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
