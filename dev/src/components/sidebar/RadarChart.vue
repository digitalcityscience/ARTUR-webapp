<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import useRadarChartStore from "@/stores/radarChartStore";
import { useI18n } from "vue-i18n";
import ChartDownloadModal from "@/components/indicator/ChartDownloadModal.vue";

const radarStore = useRadarChartStore();
const { locale } = useI18n();
const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;

const setOption = () => {
  if (radarStore.radarChartType === "dimension") {
    chart.setOption(radarStore.radarOptionDimension);
  } else {
    chart.setOption(radarStore.radarOptionTotal);
  }
  chart.on("click", (params: any) => {
    if (params.targetType === "axisName") {
      radarStore.selectCapacity(params.name);
    }
    return;
  });
};

const initChart = (): void => {
  chart = echarts.init(chartContainer.value!);
  setOption();
};
watch(locale, setOption);
watch(() => radarStore.radarChartType, setOption);
watch(() => radarStore.radarOptionDimension, setOption, { deep: true });

onMounted(initChart);
</script>
<template>
  <div ref="chartContainer" class="chart-container"></div>
  <!-- Download modal -->
  <chart-download-modal v-model:show="radarStore.showDownloadModal" :chart="chart" />
</template>
<style scoped>
.chart-container {
  width: 750px;
  height: 550px;
}
</style>
