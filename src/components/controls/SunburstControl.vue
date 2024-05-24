<template>
  <div>
    <button class="btn btn-success" @click="completeSelection">Complete</button>
    <div ref="chartContainer" class="chart-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import { sunburstOption } from "@/assets/data/sunburst";
// Constant
const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;
const selected = ref<Set<string>>(new Set<string>());
// Methods
const completeSelection = () => {
  window.close();
};
// Function to handle node clicks
const handleClick = (params: any): void => {
  const level = params.treePathInfo.length;
  switch (level) {
    case 1:
    case 2:
      break;
    case 3:
      break;
    case 4:
    case 5:
      // console.log(chart.getOption().series[0].nodeClick);
      if (params.name && selected.value.has(params.name)) {
        selected.value.delete(params.name);
      } else if (params.name) {
        selected.value.add(params.name);
      } else {
        chart.dispatchAction({
          type: "unselect",
          seriesIndex: 0,
          dataIndex: params.dataIndex,
        });
      }
      chart.setOption({ series: { nodeClick: "rootToNode" } });
      break;
    default:
      console.log(`Wrong in Click Event: {level}`);
      break;
  }
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
  chart.setOption(sunburstOption);
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
