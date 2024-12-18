<script setup lang="ts">
import { LControl } from "@vue-leaflet/vue-leaflet";
import useEchartsStore from "@/stores/chartStore";
import * as echarts from "echarts";
import { ref, computed, watch, onMounted } from "vue";
import { getIsochroneColor } from "@/assets/ts/functions";
import useMapStore from "@/stores/mapStore";

const mapStore = useMapStore();
const echartsStore = useEchartsStore();
const showLegend = ref(true);
const btnLegendIconClass = computed(() => {
  return showLegend.value ? "bi bi-caret-down-fill" : "bi bi-caret-up-fill";
});
// Population Legend Chart
const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;
const initChart = () => {
  chart = echarts.init(chartContainer.value!);
  chart.setOption(echartsStore.populationLegendOption);
};
watch(
  () => echartsStore.sunburstData.name,
  () => {
    chart.setOption(echartsStore.populationLegendOption);
  },
);
onMounted(() => {
  initChart();
});
</script>

<template>
  <l-control position="bottomleft">
    <button
      @click="showLegend = !showLegend"
      class="btn btn-primary btn-sm w-100 d-flex justify-content-between"
    >
      <i :class="btnLegendIconClass" class="pe-2"></i>
      <strong>{{ $t("legend.title") }}</strong>
      <i class="bi bi-map ps-2"></i>
    </button>
    <div class="legend" v-show="showLegend">
      <div v-show="mapStore.vulnerabilityLayer.visible">
        <template
          v-for="range in mapStore.vulnerabilityLayer.range?.slice(1)"
          :key="range"
        >
          <i
            class="point"
            :style="{
              background: mapStore.getVulnerabilityColor(
                range,
                mapStore.vulnerabilityLayer.range as number[],
              ),
            }"
          ></i>
          {{ mapStore.selectedVulnerableProperty }} <= {{ range }}<br />
        </template>
        {{ $t("legend.vulnerability.size") }}
      </div>
      <div v-show="mapStore.shelterLayers.shelterLayer.visible">
        <i
          class="point"
          :style="{ background: mapStore.shelterLayers.shelterLayer.color }"
        ></i>
        {{ $t("layerNames." + mapStore.shelterLayers.shelterLayer.name) }}
      </div>
      <div v-show="mapStore.healthSiteLayers.healthSiteLayer.visible">
        <i
          class="point"
          :style="{ background: mapStore.healthSiteLayers.healthSiteLayer.color }"
        ></i>
        {{ $t("layerNames." + mapStore.healthSiteLayers.healthSiteLayer.name) }}
      </div>
      <div v-show="mapStore.waterSourceLayers.waterSourceLayer.visible">
        <i
          class="point"
          :style="{ background: mapStore.waterSourceLayers.waterSourceLayer.color }"
        ></i>
        {{ $t("layerNames." + mapStore.waterSourceLayers.waterSourceLayer.name) }}
      </div>
      <div v-show="mapStore.energySupplyLayers.energySupplyLayer.visible">
        <i
          class="point"
          :style="{ background: mapStore.energySupplyLayers.energySupplyLayer.color }"
        ></i>
        {{ $t("layerNames." + mapStore.energySupplyLayers.energySupplyLayer.name) }}
      </div>
      <div v-show="mapStore.boundaryLayer.visible">
        <i class="polyline" :style="{ background: mapStore.boundaryLayer.color }"></i>
        {{ $t("layerNames." + mapStore.boundaryLayer.name) }}
      </div>
      <div v-show="mapStore.shelterLayers.isochroneLayer.visible">
        <template
          v-for="range in mapStore.shelterLayers.isochroneLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 5) }"></i
          >{{ $t("legend.isochrone.shelter") }} {{ range }} {{ $t("legend.minute")
          }}<br />
        </template>
      </div>
      <div v-show="mapStore.healthSiteLayers.healthSiteIsochroneLayer.visible">
        <template
          v-for="range in mapStore.healthSiteLayers.healthSiteIsochroneLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 10) }"></i
          >{{ $t("legend.isochrone.healthSite")
          }}{{ $t("healthSiteIsochroneType." + mapStore.getIsochroneType()) }}
          {{ range }} {{ $t("legend.minute") }}<br />
        </template>
      </div>
      <div v-show="mapStore.waterSourceLayers.waterSourceCatchmentLayer.visible">
        <template
          v-for="range in mapStore.waterSourceLayers.waterSourceCatchmentLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 10) }"></i
          >{{ $t("legend.isochrone.water") }}{{ range }} {{ $t("legend.kilometer")
          }}<br />
        </template>
      </div>
      <div v-show="mapStore.energySupplyLayers.energySupplyCatchmentLayer.visible">
        <template
          v-for="range in mapStore.energySupplyLayers.energySupplyCatchmentLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 10) }"></i
          >{{ $t("legend.isochrone.energy") }}{{ range }} {{ $t("legend.kilometer")
          }}<br />
        </template>
      </div>
      <div
        v-show="
          mapStore.shelterLayers.populationLayer.visible ||
          mapStore.healthSiteLayers.healthSitePopulationLayer.visible ||
          mapStore.waterSourceLayers.waterSourcePopulationLayer.visible
        "
        class="population-grid"
      >
        <div ref="chartContainer" class="chartContainer"></div>
        <i class="polygon" style="background: #9e0000"></i
        >{{ $t("legend.population.text") }}<br />
      </div>
    </div>
  </l-control>
</template>

<style scoped>
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
