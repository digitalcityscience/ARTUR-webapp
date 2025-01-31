P
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import LanguageSwitcher from "@/components/sidebar/LanguageSwitcher.vue";
import ChartDownloadModal from "@/components/indicator/ChartDownloadModal.vue";
import { GraphTypes } from "@/assets/ts/constants";
import useIndicatorStore from "@/stores/indicatorStore";
import useIndicatorChartStore from "@/stores/indicatorChartStore";
import { useI18n } from "vue-i18n";

const indicatorStore = useIndicatorStore();
const chartStore = useIndicatorChartStore();
const { locale } = useI18n();
// Constant
const chartContainer = ref<HTMLDivElement | null>(null);
const defaultWidth = 1000;
const defaultHeight = 600;
let chart: echarts.ECharts;
const showModal = ref<boolean>(false);
const switchGraph = ref<string>(GraphTypes.SANKEY);
// Methods
const getChartOption = () => {
  let option;
  if (indicatorStore.indicatorType === "basic") {
    option =
      switchGraph.value == GraphTypes.SANKEY
        ? chartStore.sunburstBasicOption
        : chartStore.sankeyBasicOption;
  } else {
    option =
      switchGraph.value == GraphTypes.SANKEY
        ? chartStore.sunburstOptionLevel0
        : chartStore.sankeyOption;
  }
  return option;
};
const switchGraphType = () => {
  switchGraph.value =
    switchGraph.value == GraphTypes.SANKEY ? GraphTypes.SUNBURST : GraphTypes.SANKEY;
  const option = getChartOption();
  chart.clear();
  reloadChart(option);
};
// Function to handle node clicks
function handleSunburstClick(params: any): void {
  // Sankey Chart Click
  if (params.data) {
    // Sunburst Chart Click
    const level = params.treePathInfo.length;
    if (level === 2 && chartStore.sunburstCategory.has(params.name)) {
      // Sunburst Second Graph Click Category
      let color = params.color;
      let dimensionData = chartStore.sunburstData.find(
        (node: any) => node.name === chartStore.sunburstColorSet[params.color],
      );
      reloadChart(chartStore.sunburstOptionLevel1, dimensionData, color);
    } else if (level === 2 && params.value < 15) {
      // Sunburst First Graph Click Dimension
      let color = params.color;
      let data = chartStore.sunburstData.find((node: any) => node.name === params.name);
      reloadChart(chartStore.sunburstOptionLevel1, data, color);
      return;
    } else if (level === 2) {
      // Sunburst Second Graph Click Dimension
      chart.clear();
      chart.setOption(chartStore.sunburstOptionLevel0);
      return;
    } else if (level === 3 && chartStore.sunburstCategory.has(params.name)) {
      // Sunburst First Graph && Second Graph Click Category
      let color = params.color;
      let dimension = params.treePathInfo[1];
      let dimensionData = chartStore.sunburstData.find(
        (node: any) => node.name === dimension.name,
      );
      let data = dimensionData?.children?.find((node: any) => node.name === params.name);
      reloadChart(chartStore.sunburstOptionLevel2, data, color);
      return;
    }
  }
}
// Reload chart option
function reloadChart(option: any, data?: any, color?: string): void {
  if (data !== undefined && color !== undefined) {
    option.series.data = [data];
    option.color = color;
  }
  chart.clear();
  chart.setOption(option);
}
function setOption() {
  if (indicatorStore.indicatorType === "basic")
    chart.setOption(chartStore.sunburstBasicOption);
  else {
    chart.setOption(chartStore.sunburstOptionLevel0);
    chart.on("click", (params: any) => handleSunburstClick(params));
  }
}
const initChart = (): void => {
  chart = echarts.init(chartContainer.value);
  setOption();
};
// Make the chart resizable
const addResizeObserver = () => {
  if (chartContainer.value) {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > defaultWidth && height > defaultHeight) {
          chart.resize();
        }
      }
    });
    resizeObserver.observe(chartContainer.value);
  }
};
// watch the changes of language
watch(locale, () => {
  const option = getChartOption();
  chart.clear();
  reloadChart(option);
});
onMounted(() => {
  if (!chartContainer.value) return;
  window.addEventListener("storage", (event) => {
    if (event.key === "indicatorType") {
      // Update the indicatorType in the store when it changes in localStorage
      indicatorStore.indicatorType = event.newValue as "basic" | "total";
    }
  });
  initChart();
  addResizeObserver();
});
</script>
<template>
  <div class="btn-group" role="group">
    <div class="d-flex align-items-center gap-2">
      <div class="btn-group btn-group-sm float-end mt-2 ms-2">
        <button class="btn btn-success" data-toggle="modal" @click="showModal = true">
          <i class="fa fa-download">{{ $t("indicatorChart.buttons.download") }}</i>
        </button>
        <button class="btn btn-warning" @click="switchGraphType">
          <i class="bi bi-arrow-repeat">
            {{ $t("indicatorChart.buttons.switch") }}
            {{ $t("indicatorChart.graphTypes." + switchGraph) }}</i
          >
        </button>
      </div>
      <language-switcher></language-switcher>
    </div>
  </div>
  <!-- Download Chart Modal -->
  <chart-download-modal v-model:show="showModal" :chart="chart" />
  <!-- Chart -->
  <div ref="chartContainer" class="chart-container"></div>
</template>
<style scoped>
.chart-container {
  width: 100%;
  height: 98vh;
}
.modal {
  display: block;
  left: 322.5px;
  width: 355px;
}
</style>
