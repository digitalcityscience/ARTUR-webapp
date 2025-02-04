<script lang="ts" setup>
import { ref, computed } from "vue";
import { use } from "echarts/core";
import { RadarChart } from "echarts/charts";
import { 
  TitleComponent,
  TooltipComponent,
  LegendComponent 
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";
import useRadarChartStore from "@/stores/radarChartStore";
import ChartDownloadModal from "@/components/indicator/ChartDownloadModal.vue";

// Register necessary ECharts components
use([
  RadarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer
]);

const radarStore = useRadarChartStore();
const chartRef = ref();

const option = computed(() => {
  return radarStore.radarChartType === "dimension" 
    ? radarStore.radarOptionDimension 
    : radarStore.radarOptionTotal;
});

const handleChartClick = (params: any) => {
  if (params.targetType === "axisName") {
    radarStore.selectCapacity(params.name);
  }
};
</script>

<template>
  <v-chart
    ref="chartRef"
    class="chart-container"
    :option="option"
    @click="handleChartClick"
    autoresize
  />
  
  <!-- Download modal -->
  <chart-download-modal 
    v-model:show="radarStore.showDownloadModal" 
    :chart="chartRef" 
  />
</template>

<style scoped>
.chart-container {
  width: 750px;
  height: 550px;
}
</style>