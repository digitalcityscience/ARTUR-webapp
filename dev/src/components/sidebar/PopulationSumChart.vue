<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import * as echarts from "echarts";
import { populationType } from "@/assets/ts/constants";
import type { Population } from "@/assets/ts/types";
import useMapStore from "@/stores/mapStore";
import { useI18n } from "vue-i18n";

const mapStore = useMapStore();
const { t } = useI18n();
const props = defineProps<{ type: string }>();
let population = ref<Population | null>(null);
const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;

// get population based on the type prop and current city
const getPopulationData = () => {
  switch (props.type) {
    case populationType.SHELTER:
      return mapStore.shelterPopulation[mapStore.city!];
    case populationType.HEALTHSITE:
    default:
      return mapStore.healthSitePopulation[mapStore.city!];
  }
};
// Reactive computation of translated names
const chartData = computed(() => {
  const accessibleName =
    props.type === populationType.HEALTHSITE
      ? t("sidebar.dataPanel.populationChartText.healthSiteAccess")
      : t("sidebar.dataPanel.populationChartText.shelterAccess");

  const inaccessibleName =
    props.type === populationType.HEALTHSITE
      ? t("sidebar.dataPanel.populationChartText.healthSiteInaccess")
      : t("sidebar.dataPanel.populationChartText.shelterInaccess");

  return [
    {
      value: population.value!.accessible,
      name: accessibleName,
    },
    {
      value: population.value!.inaccessible,
      name: inaccessibleName,
    },
  ];
});
// Set the options for the chart
const setChartOptions = (): void => {
  if (!chartData.value.length) {
    chart.clear();
    return;
  }
  // Function to update chart options
  const updateChartOptions = () => {
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
          data: chartData.value,
        },
      ],
      color: ["#3999d2", "#c23531"],
    });
  };
  // Watch for changes in language or population data and update chart
  watch([chartData, () => population.value], updateChartOptions, {
    immediate: true,
  });
};
// Update chart when city changed
watch(
  () => mapStore.isJsonDataLoad,
  (newVal) => {
    if (!newVal) return;
    chart.clear();
    population.value = getPopulationData();
    setChartOptions();
  },
);
// Initialize the chart
const initChart = (): void => {
  chart = echarts.init(chartContainer.value!);
  setChartOptions();
};
// Init Chart on mounted
onMounted(() => {
  population.value = getPopulationData();
  initChart();
});
</script>

<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<style scoped>
.chart-container {
  width: 25rem;
  height: 25rem;
}
</style>
