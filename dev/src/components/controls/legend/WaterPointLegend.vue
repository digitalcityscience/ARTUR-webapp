<script lang="ts" setup>
import { ref, watch, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import * as echarts from "echarts";

const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;

const option = computed(() => {
  return {
    title: {
      text: t("legend.waterNetwork.name"),
      left: 0, // Position
      top: 0,
      textStyle: {
        color: "#3d3d3d",
        fontSize: 10,
      },
    },
    visualMap: {
      type: "continuous",
      min: 0,
      max: 0.42,
      precision: 2,
      inRange: {
        color: ["#313695", "#5DE2E7", "#7DDA58", "#FFDE59", "#D73027"], // Gradient colors
      },
      text: [t("legend.waterNetwork.minAxis"), t("legend.waterNetwork.maxAxis")], // Labels on the bar
      textStyle: {
        color: "#000",
        fontSize: 10,
      },
      orient: "horizontal",
      left: 0, // Position
      bottom: 0,
    },
    series: [], // No actual data; just displaying the color bar
  };
});

const initChart = () => {
  chart = echarts.init(chartContainer.value!);
  chart.setOption(option.value);
};
// Reload the chart when the language changes
watch(locale, () => {
  chart.setOption(option.value);
});
onMounted(() => {
  initChart();
});
</script>
<template><div ref="chartContainer" class="chart-container"></div></template>
<style scoped>
.chart-container {
  width: 320px;
  height: 65px;
}
</style>
