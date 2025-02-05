<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { SankeyChart, SunburstChart } from "echarts/charts";
import { 
  TitleComponent,
  TooltipComponent,
  LegendComponent 
} from "echarts/components";
import VChart from "vue-echarts";
import LanguageSwitcher from "@/components/sidebar/LanguageSwitcher.vue";
import ChartDownloadModal from "@/components/indicator/ChartDownloadModal.vue";
import { GraphTypes } from "@/assets/ts/constants";
import useIndicatorStore from "@/stores/indicatorStore";
import useIndicatorChartStore from "@/stores/indicatorChartStore";
import { useI18n } from "vue-i18n";

// Register necessary ECharts components
use([
  CanvasRenderer,
  SankeyChart,
  SunburstChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

const indicatorStore = useIndicatorStore();
const chartStore = useIndicatorChartStore();
const { locale } = useI18n();

const showModal = ref<boolean>(false);
const switchGraph = ref<string>(GraphTypes.SANKEY);
const chartRef = ref();

// Methods
const chartOption = computed(() => {
  if (indicatorStore.indicatorType === "basic") {
    return switchGraph.value == GraphTypes.SANKEY
      ? chartStore.sunburstBasicOption
      : chartStore.sankeyBasicOption;
  } else {
    return switchGraph.value == GraphTypes.SANKEY
      ? chartStore.sunburstOptionLevel0
      : chartStore.sankeyOption;
  }
});

const switchGraphType = () => {
  switchGraph.value =
    switchGraph.value == GraphTypes.SANKEY ? GraphTypes.SUNBURST : GraphTypes.SANKEY;
};

// Function to handle node clicks
function handleSunburstClick(params: any): void {
  if (indicatorStore.indicatorType === "basic") return;
  if (!params.data) return;

  const level = params.treePathInfo.length;
  const chart = chartRef.value;

  if (level === 2 && chartStore.sunburstCategory.has(params.name)) {
    // Sunburst Second Graph Click Category
    let dimensionData = chartStore.sunburstData.find(
      (node: any) => node.name === chartStore.sunburstColorSet[params.color]
    );
    reloadChart(chartStore.sunburstOptionLevel1, dimensionData, params.color);
  } else if (level === 2 && params.value < 15) {
    // Sunburst First Graph Click Dimension
    let data = chartStore.sunburstData.find((node: any) => node.name === params.name);
    reloadChart(chartStore.sunburstOptionLevel1, data, params.color);
  } else if (level === 2) {
    // Sunburst Second Graph Click Dimension
    chart.setOption(chartStore.sunburstOptionLevel0);
  } else if (level === 3 && chartStore.sunburstCategory.has(params.name)) {
    // Sunburst First Graph && Second Graph Click Category
    let dimension = params.treePathInfo[1];
    let dimensionData = chartStore.sunburstData.find(
      (node: any) => node.name === dimension.name
    );
    let data = dimensionData?.children?.find((node: any) => node.name === params.name);
    reloadChart(chartStore.sunburstOptionLevel2, data, params.color);
  }
}

// Reload chart option
function reloadChart(option: any, data?: any, color?: string): void {
  if (data !== undefined && color !== undefined) {
    option.series.data = [data];
    option.color = color;
  }
  chartRef.value?.setOption(option);
}

// watch the changes of language
watch(locale, () => {
  chartRef.value?.setOption(chartOption.value);
});

// Listen for localStorage changes
window.addEventListener("storage", (event) => {
  if (event.key === "indicatorType") {
    indicatorStore.indicatorType = event.newValue as "basic" | "total";
  }
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
            {{ $t("indicatorChart.graphTypes." + switchGraph) }}</i>
        </button>
      </div>
      <language-switcher></language-switcher>
    </div>
  </div>
  
  <!-- Download Chart Modal -->
  <chart-download-modal 
    v-model:show="showModal" 
    :chart="chartRef" 
  />
  
  <!-- Chart -->
  <v-chart
    ref="chartRef"
    class="chart-container"
    :option="chartOption"
    @click="handleSunburstClick"
    autoresize
  />
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