<template>
  <button type="button" class="btn btn-success" @click="downloadImage">
    <i class="fa fa-download" aria-hidden="true"></i> Download PNG
  </button>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import { mainOption } from "@/assets/data/sunburst";

// Constant
const chartContainer = ref<HTMLDivElement | null>(null);
var chart: echarts.ECharts;
const selected = ref<Set<string>>(new Set<string>());
// Methods
const downloadImage = () => {
  let img = new Image();
  img.src = chart.getDataURL({
    type: "png",
    pixelRatio: 2,
    backgroundColor: "#fff",
  });
  let link = document.createElement("a");
  link.href = img.src;
  link.download = "UR-indicators-sunburst-chart.png";
  link.click();
};
// Function to handle node clicks
const handleClick = (params: any): void => {
  const level = params.treePathInfo.length;
  if (level === 4 || level === 5) {
    if (params.name && selected.value.has(params.name)) {
      selected.value.delete(params.name);
    } else if (params.name) {
      selected.value.add(params.name);
    }
    return;
  }
  return;
};
// Store the changes of sunburst selected indicators
watch(
  selected,
  (newValue) => {
    if (!chart) return;
    localStorage.setItem(
      "sunburstSelected",
      JSON.stringify(Array.from(newValue)),
    );
  },
  { deep: true },
);
// Watch for changes in localStorage and update sidebar Selected indicators
window.addEventListener("storage", (event: StorageEvent) => {
  if (event.key === "sidebarDeleted") {
    let deletedIndicator = event.newValue!;
    selected.value.delete(deletedIndicator);
    chart.dispatchAction({
      type: "unselect",
      seriesIndex: 0,
      name: deletedIndicator,
    });
  }
});
const initChart = (): void => {
  chart = echarts.init(chartContainer.value);
  chart.setOption(mainOption);
  chart.on("click", (params: any) => handleClick(params));
};
onMounted(() => {
  if (!chartContainer.value) return;
  initChart();
  const savedIndicators = localStorage.getItem("sidebarSaved");
  if (savedIndicators) {
    selected.value = new Set<string>(JSON.parse(savedIndicators));
    chart.dispatchAction({
      type: "select",
      seriesIndex: 0,
      name: JSON.parse(savedIndicators),
    });
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100vh;
}
</style>
