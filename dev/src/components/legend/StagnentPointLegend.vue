<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { use } from "echarts/core";
import { VisualMapComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";

// Register necessary ECharts components
use([
  CanvasRenderer,
  VisualMapComponent
]);

const { t } = useI18n();

const option = computed(() => {
  return {
    title: {
      text: t("legend.stagnentRainfall.floodPoint"),
      left: 0,
      top: 0,
      textStyle: {
        color: "#3d3d3d",
        fontSize: 10,
      },
    },
    visualMap: {
      type: "continuous",
      min: 3.1,
      max: 10.55,
      hoverLink: false, // make the legend inreactive
      precision: 2,
      inRange: {
        color: ["#313695", "#7DDA58", "#FFDE59", "#FE9900", "#D73027"], // Gradient colors
      },
      text: ["Max", "Min"], // Labels on the bar
      textStyle: {
        color: "#000",
        fontSize: 10,
      },
      orient: "horizontal",
      left: 0, // Position
      bottom: 0,
    },
  };
});
</script>

<template>
  <v-chart class="chart-container" :option="option" autoresize />
</template>

<style scoped>
.chart-container {
  width: 230px;
  height: 65px;
}
</style>
