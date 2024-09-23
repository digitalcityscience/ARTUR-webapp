<template>
  <div ref="chartContainer" class="chartContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { populationLegendOption } from "@/assets/data/echarts_options";
import * as echarts from "echarts";

// References and variables
const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;

// Mehtods
const initChart = () => {
  chart = echarts.init(chartContainer.value!);
  chart.setOption(populationLegendOption);
};
const addResizeObserver = () => {
  if (chartContainer.value) {
    const resizeObserver = new ResizeObserver(() => {
      chart.resize();
    });
    resizeObserver.observe(chartContainer.value);
  }
};
onMounted(() => {
  initChart();
  addResizeObserver();
});
</script>
<style scoped>
.chartContainer {
  width: 100px;
  height: 180px;
}
</style>
