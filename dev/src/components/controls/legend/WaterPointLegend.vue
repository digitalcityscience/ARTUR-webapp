<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import * as echarts from "echarts";

const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;

const option = {
  title: {
    text: t("layerNames.kryvyirih.waterNetworkPoint").split(" ").join("\n"),
    left: 40,
    top: 5,
    textStyle: {
      color: "#3d3d3d",
      fontSize: 10,
    },
  },
  visualMap: {
    type: "continuous",
    min: 0,
    max: 0.45,
    precision: 2,
    inRange: {
      color: ["#313695", "#7DDA58", "#FFDE59", "#D73027"], // Gradient colors
    },
    text: ["0.45", "0.0"], // Labels on the bar
    textStyle: {
      color: "#000",
    },
    orient: "vertical", // Vertical bar
    left: 5, // Position
    top: "middle",
  },
  series: [], // No actual data; just displaying the color bar
};

const initChart = () => {
  chart = echarts.init(chartContainer.value!);
  chart.setOption(option);
};
// Reload the chart when the language changes
watch(locale, () => {
  chart.setOption(option);
});
onMounted(() => {
  initChart();
});
</script>
<template><div ref="chartContainer" class="chart-container"></div></template>
<style scoped>
.chart-container {
  width: 100px;
  height: 200px;
}
</style>
