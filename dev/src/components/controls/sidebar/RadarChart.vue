<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import useEchartsStore from "@/stores/chartStore";
import { useI18n } from "vue-i18n";

const chartStore = useEchartsStore();
const { locale } = useI18n();
const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;

const initChart = (): void => {
  chart = echarts.init(chartContainer.value!);
  chart.setOption(chartStore.radarOption);
};
watch(locale, () => {
  chart.setOption(chartStore.radarOption);
});
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
