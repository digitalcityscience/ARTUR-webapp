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
      <div v-show="mapStore.shelterLayers.shelterLayer.visible">
        <i
          class="point"
          :style="{ background: mapStore.shelterLayers.shelterLayer.color }"
        ></i>
        {{ mapStore.shelterLayers.shelterLayer.name }}
      </div>
      <div v-show="mapStore.healthsiteLayers.healthSiteLayer.visible">
        <i
          class="point"
          :style="{ background: mapStore.healthsiteLayers.healthSiteLayer.color }"
        ></i>
        {{ mapStore.healthsiteLayers.healthSiteLayer.name }}
      </div>
      <div v-show="mapStore.waterSourceLayers.waterSourceLayer.visible">
        <i
          class="point"
          :style="{ background: mapStore.waterSourceLayers.waterSourceLayer.color }"
        ></i>
        {{ mapStore.waterSourceLayers.waterSourceLayer.name }}
      </div>
      <div v-show="mapStore.energySupplyLayers.energySupplyLayer.visible">
        <i
          class="point"
          :style="{ background: mapStore.energySupplyLayers.energySupplyLayer.color }"
        ></i>
        {{ mapStore.energySupplyLayers.energySupplyLayer.name }}
      </div>
      <div v-show="mapStore.boundaryLayer.visible">
        <i class="polyline" :style="{ background: mapStore.boundaryLayer.color }"></i>
        {{ mapStore.boundaryLayer.name }}
      </div>
      <div v-show="mapStore.shelterLayers.isochroneLayer.visible">
        <template
          v-for="range in mapStore.shelterLayers.isochroneLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 5) }"></i
          >Shelters' Isochrone {{ range }} min<br />
        </template>
      </div>
      <div v-show="mapStore.healthsiteLayers.healthSiteIsochroneLayer.visible">
        <template
          v-for="range in mapStore.healthsiteLayers.healthSiteIsochroneLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 10) }"></i
          >Health Site Isochrone - {{ mapStore.getIsochroneType() }} {{ range }} min<br />
        </template>
      </div>
      <div v-show="mapStore.waterSourceLayers.waterSourceCatchmentLayer.visible">
        <template
          v-for="range in mapStore.waterSourceLayers.waterSourceCatchmentLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 10) }"></i
          >Water Source Catchment Area {{ range }} km<br />
        </template>
      </div>
      <div v-show="mapStore.energySupplyLayers.energySupplyCatchmentLayer.visible">
        <template
          v-for="range in mapStore.energySupplyLayers.energySupplyCatchmentLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 10) }"></i
          >Energy Supply Catchment Area {{ range }} km<br />
        </template>
      </div>
      <div
        v-show="
          mapStore.shelterLayers.populationLayer.visible ||
          mapStore.healthsiteLayers.healthSitePopulationLayer.visible ||
          mapStore.waterSourceLayers.waterSourcePopulationLayer.visible
        "
        class="population-grid"
      >
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
