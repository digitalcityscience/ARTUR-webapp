<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { use } from "echarts/core";
import { GridComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";
import {
  populationInaccessibleColor,
  populationAccessibleColor,
} from "@/assets/ts/constants";

// Register necessary ECharts components
use([
  GridComponent,
  CanvasRenderer
]);

const { t } = useI18n();

const gridData = [
  [0, 0, populationInaccessibleColor[0]],
  [0, 1, populationInaccessibleColor[1]],
  [0, 2, populationInaccessibleColor[2]],
  [0, 3, populationInaccessibleColor[3]],
  [0, 4, populationInaccessibleColor[4]],
  [1, 0, populationAccessibleColor[0]],
  [1, 1, populationAccessibleColor[1]],
  [1, 2, populationAccessibleColor[2]],
  [1, 3, populationAccessibleColor[3]],
  [1, 4, populationAccessibleColor[4]],
];

const option = computed(() => {
  return {
    grid: {
      left: "10%",
      right: 0,
      top: "2%",
      bottom: "7%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: t("legend.population.accessible"),
      nameLocation: "middle",
      nameGap: 20,
      data: ["No", "Yes"],
      splitLine: { show: false },
      nameTextStyle: {
        color: "#2c3e50",
        fontSize: 12,
        fontFamily: "Arial",
        fontStyle: "italic",
      },
      axisLabel: {
        color: "#34495e",
        fontSize: 12,
        fontFamily: "Arial",
        fontStyle: "normal",
      },
    },
    yAxis: {
      type: "category",
      name: t("legend.population.population") ,
      nameLocation: "middle",
      nameGap: 25,
      data: ["5", "15", "25", "35", ">35"],
      splitLine: { show: false },
      boundaryGap: true,
      nameTextStyle: {
        color: "#2c3e50",
        fontSize: 12,
        fontFamily: "Arial",
        fontStyle: "italic",
      },
      axisLabel: {
        color: "#34495e",
        fontSize: 13,
        fontFamily: "Arial",
        fontStyle: "normal",
      },
    },
    series: [
      {
        name: "Grid",
        type: "custom",
        renderItem: function (params: any, api: any) {
          const xValue = api.value(0);
          const yValue = api.value(1);
          const start = api.coord([xValue, yValue]);
          const size = api.size([1, 1]);
          return {
            type: "rect",
            shape: {
              x: start[0] - size[0] / 2,
              y: start[1] - size[1] / 2,
              width: size[0],
              height: size[1],
            },
            style: {
              fill: api.value(2),
            },
          };
        },
        data: gridData,
      },
    ],
  };
});
</script>

<template>
  <v-chart class="chart-container" :option="option" autoresize />
</template>

<style scoped>
.chart-container {
  width: 110px;
  height: 180px;
}
</style>