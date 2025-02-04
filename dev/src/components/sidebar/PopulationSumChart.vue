<script setup lang="ts">
import { computed } from "vue";
import { use } from "echarts/core";
import { PieChart } from "echarts/charts";
import { 
  LegendComponent,
  TitleComponent,
  TooltipComponent 
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";
import { populationType } from "@/assets/ts/constants";
import useGeoDataStore from "@/stores/geoDataStore";
import { useI18n } from "vue-i18n";

// Register necessary ECharts components
use([
  PieChart,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  CanvasRenderer
]);

const geoDataStore = useGeoDataStore();
const { t } = useI18n();
const props = defineProps<{ type: string }>();

// get population based on the type prop and current city
const getPopulationData = computed(() => {
  switch (props.type) {
    case populationType.SHELTER:
      return geoDataStore.shelterPopulation[geoDataStore.city!];
    case populationType.HEALTHSITE:
    default:
      return geoDataStore.healthSitePopulation[geoDataStore.city!];
  }
});

// Reactive computation of translated names and chart data
const option = computed(() => {
  const population = getPopulationData.value;
  if (!population) return {};

  const accessibleName =
    props.type === populationType.HEALTHSITE
      ? t("sidebar.dataPanel.populationChartText.healthSiteAccess")
      : t("sidebar.dataPanel.populationChartText.shelterAccess");

  const inaccessibleName =
    props.type === populationType.HEALTHSITE
      ? t("sidebar.dataPanel.populationChartText.healthSiteInaccess")
      : t("sidebar.dataPanel.populationChartText.shelterInaccess");

  const chartData = [
    {
      value: population.accessible,
      name: accessibleName,
    },
    {
      value: population.inaccessible,
      name: inaccessibleName,
    },
  ];

  return {
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
        data: chartData,
      },
    ],
    color: ["#3999d2", "#c23531"],
  };
});
</script>

<template>
  <v-chart 
    class="chart-container" 
    :option="option" 
    :loading="!geoDataStore.isJsonDataLoad"
    autoresize 
  />
</template>

<style scoped>
.chart-container {
  width: 25rem;
  height: 25rem;
}
</style>