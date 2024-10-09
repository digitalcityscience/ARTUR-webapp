<script setup lang="ts">
import { LControl } from "@vue-leaflet/vue-leaflet";
import { populationLegendOption } from "@/assets/data/echarts_options";
import * as echarts from "echarts";
import { ref, computed, onMounted } from "vue";
import { getIsochroneColor } from "@/assets/ts/functions";
import useMapStore from "@/stores/mapStore";

const mapStore = useMapStore();
const showLegend = ref(true);
const btnLegendIconClass = computed(() => {
  return showLegend.value ? "bi bi-caret-down-fill" : "bi bi-caret-up-fill";
});
// Population Legend Chart
const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;
const initChart = () => {
  chart = echarts.init(chartContainer.value!);
  chart.setOption(populationLegendOption);
};
onMounted(() => {
  initChart();
});
</script>
<template>
  <l-control position="bottomleft">
    <button
      @click="showLegend = !showLegend"
      class="btn btn-primary btn-sm legend-button"
    >
      <i :class="btnLegendIconClass" style="float: left; padding-right: 5px"></i>
      <strong>Legend</strong>
      <i class="bi bi-map" style="float: right; padding-left: 5px"></i>
    </button>
    <div class="legend" v-show="showLegend">
      <div v-show="mapStore.vectorLayers.shelterLayer.visible">
        <i
          class="point"
          :style="{ background: mapStore.vectorLayers.shelterLayer.color }"
        ></i>
        {{ mapStore.vectorLayers.shelterLayer.name }}
      </div>
      <div v-show="mapStore.vectorLayers.healthSiteLayer.visible">
        <i
          class="point"
          :style="{ background: mapStore.vectorLayers.healthSiteLayer.color }"
        ></i>
        {{ mapStore.vectorLayers.healthSiteLayer.name }}
      </div>
      <div v-show="mapStore.vectorLayers.boundaryLayer.visible">
        <i
          class="polyline"
          :style="{ background: mapStore.vectorLayers.boundaryLayer.color }"
        ></i>
        {{ mapStore.vectorLayers.boundaryLayer.name }}
      </div>
      <div v-show="mapStore.vectorLayers.isochroneLayer.visible">
        <template
          v-for="range in mapStore.vectorLayers.isochroneLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 5) }"></i
          >Shelters' Isochrone {{ range }} min<br />
        </template>
      </div>
      <div v-show="mapStore.vectorLayers.healthSiteIsochroneLayer.visible">
        <template
          v-for="range in mapStore.vectorLayers.healthSiteIsochroneLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 10) }"></i
          >Health Site Isochrone - {{ mapStore.getIsochroneType() }} {{ range }} min<br />
        </template>
      </div>
      <div v-show="mapStore.vectorLayers.populationLayer.visible" class="population-grid">
        <div ref="chartContainer" class="chartContainer"></div>
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
.population-grid {
  width: 160px;
}
.chartContainer {
  width: 100px;
  height: 180px;
}
</style>
