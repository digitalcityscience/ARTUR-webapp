<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { use } from "echarts/core";
import { VisualMapComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  VisualMapComponent
]);

const { t } = useI18n();

const option = computed(() => {
  return {
    title: {
      text: t("legend.waterNetwork.name"),
      left: 0,
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
        color: ["#313695", "#5DE2E7", "#7DDA58", "#FFDE59", "#D73027"],
      },
      text: [t("legend.waterNetwork.minAxis"), t("legend.waterNetwork.maxAxis")],
      textStyle: {
        color: "#000",
        fontSize: 10,
      },
      orient: "horizontal",
      left: 0,
      bottom: 0,
    },
    series: [],
  };
});
</script>

<template>
  <v-chart class="chart-container" :option="option" autoresize />
</template>

<style scoped>
.chart-container {
  width: 320px;
  height: 65px;
}
</style>