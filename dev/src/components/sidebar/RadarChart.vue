<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import useRadarChartStore from "@/stores/radarChartStore";
import { useI18n } from "vue-i18n";
import ChartDownloadModal from "@/components/indicator/ChartDownloadModal.vue";

const chartStore = useRadarChartStore();
const { locale } = useI18n();
const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;

const setOption = () => {
  if (chartStore.radarChartType === "dimension") {
    chart.setOption(chartStore.radarOptionDimension);
  } else {
    chart.setOption(chartStore.radarOptionTotal);
  }
};
const initChart = (): void => {
  chart = echarts.init(chartContainer.value!);
  setOption();
};
watch(locale, setOption);
watch(() => chartStore.radarChartType, setOption);
watch(() => chartStore.radarOptionDimension, setOption, { deep: true });

onMounted(initChart);
</script>
<template>
  <div ref="chartContainer" class="chart-container"></div>
  <!-- Download modal -->
  <chart-download-modal v-model:show="chartStore.showDownloadModal" :chart="chart" />
</template>
<style scoped>
.chart-container {
  width: 750px;
  height: 550px;
}
</style>
