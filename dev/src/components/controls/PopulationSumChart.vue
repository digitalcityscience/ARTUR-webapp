<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import { populationType } from "@/assets/ts/constants";
import type { Population } from "@/assets/ts/types";
import useMapStore from "@/stores/mapStore";

const mapStore = useMapStore();
const props = defineProps<{ type: string }>();
let population = ref<Population | null>(null);
const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;

// Update population based on the type prop and current city
const updatePopulation = () => {
  if (props.type === populationType.SHELTER) {
    population.value = mapStore.shelterPopulation[mapStore.city];
  } else if (props.type === populationType.HEALTHSITE) {
    population.value = mapStore.healthSitePopulation[mapStore.city];
  }
  console.log(mapStore.healthSitePopulation[mapStore.city]);
};
// Initialize the chart
const initChart = (): void => {
  chart = echarts.init(chartContainer.value!);
  setChartOptions();
};
// Set the options for the chart
const setChartOptions = (): void => {
  chart.setOption({
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access",
        type: "pie",
        radius: ["40%", "70%"],
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold",
            formatter: "{b}: {c}",
          },
        },
        data: population.value
          ? [
              {
                value: population.value.accessible,
                name: "Accessible in 5 min",
              },
              {
                value: population.value.inaccessible,
                name: "Inaccessible in 5 min",
              },
            ]
          : [],
      },
    ],
    color: ["#3999d2", "#c23531"],
  });
};

// Update chart when city changed
watch(
  () => {
    return props.type === populationType.SHELTER
      ? mapStore.shelterPopulation[mapStore.city]
      : mapStore.healthSitePopulation[mapStore.city];
  },
  (newPopulation) => {
    population.value = newPopulation;
    if (chart) chart.clear();
    setChartOptions();
  },
);

onMounted(() => {
  updatePopulation();
  initChart();
});
</script>

<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<style scoped>
.chart-container {
  width: 400px;
  height: 400px;
}
</style>
