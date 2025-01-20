<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
import * as echarts from "echarts";
import usePopulationLegendStore from "@/stores/populationLegendStore";

const populationLegendStore = usePopulationLegendStore();
// Population Legend Element
const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;

// Methods
const initChart = () => {
  chart = echarts.init(chartContainer.value!);
  chart.setOption(populationLegendStore.populationLegendOption);
};
// Reload the chart when the language changes
watch(locale, () => {
  chart.setOption(populationLegendStore.populationLegendOption);
});
// Init Chart on mounted
onMounted(initChart);
</script>
<template><div ref="chartContainer" class="chart-container"></div></template>
<style scoped>
.chart-container {
  width: 100px;
  height: 180px;
}
</style>
