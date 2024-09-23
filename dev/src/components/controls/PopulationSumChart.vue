<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject, watch } from "vue";
import type { Ref } from "vue";
import * as echarts from "echarts";
import { getTotalPopulation } from "@/assets/ts/functions";
import { InjectionKeyEnum } from "@/assets/ts/constants";
import { populationAccessibleColor, populationInaccessibleColor } from "@/assets/ts/constants";

// Constants and reactive properties
const city = inject(InjectionKeyEnum.CITY) as Ref<string>;
const population = ref<number[]>([]);

// References and variables
const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;

// Methods
const initChart = (): void => {
  chart = echarts.init(chartContainer.value!);
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
        data: [
          { value: population.value[0], name: "Accessible in 5 min" },
          { value: population.value[1], name: "Inaccessible in 5 min" },
        ],
      },
    ],
    color: [populationAccessibleColor[2], populationInaccessibleColor[2]],
  });
};

const updateChart = (): void => {
  if (chart) {
    chart.setOption({
      series: [
        {
          data: [
            { value: population.value[0], name: "Accessible in 5 min" },
            { value: population.value[1], name: "Inaccessible in 5 min" },
          ],
        },
      ],
    });
  }
};

// Watchers
watch(
  city,
  (newCity) => {
    if (newCity) {
      population.value = getTotalPopulation(newCity);
      updateChart();
    }
  },
  { immediate: true },
);

onMounted(() => {
  initChart();
});
</script>

<style scoped>
.chart-container {
  width: 400px;
  height: 400px;
}
</style>
