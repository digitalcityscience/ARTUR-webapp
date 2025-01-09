<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import useEchartsStore from "@/stores/chartStore";
import { useI18n } from "vue-i18n";

const chartStore = useEchartsStore();
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
watch(locale, () => {
  setOption();
});
watch(
  () => chartStore.radarChartType,
  () => {
    setOption();
  },
);
// Init Chart on mounted
onMounted(() => {
  initChart();
});
</script>
<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>
<style scoped>
.chart-container {
  width: 40rem;
  height: 35rem;
}
</style>
