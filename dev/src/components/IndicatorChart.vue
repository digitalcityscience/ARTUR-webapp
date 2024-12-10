<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import LanguageSwitcher from "./controls/sidebar/LanguageSwitcher.vue";
import { ImageFormat, LocalStorageEvent, GraphTypes } from "@/assets/ts/constants";
import useIndicatorStore from "@/stores/indicatorStore";
import useEchartsStore from "@/stores/echatsStore";

const indicatorStore = useIndicatorStore();
const echartsStore = useEchartsStore();
// Constant
const chartContainer = ref<HTMLDivElement | null>(null);
const defaultWidth = 1000;
const defaultHeight = 600;
let chart: echarts.ECharts;
const showModal = ref<boolean>(false);
const resolution = ref<number>(2);
const backgroundColor = ref<string>("#ffffff");
const imageFormat = ref<ImageFormat>(ImageFormat.PNG);
const switchGraph = ref<string>(GraphTypes.SANKEY);
// Methods
const switchGraphType = () => {
  if (switchGraph.value == GraphTypes.SANKEY) {
    switchGraph.value = GraphTypes.SUNBURST;
    reloadChart(echartsStore.sankeyOption);
  } else {
    switchGraph.value = GraphTypes.SANKEY;
    reloadChart(echartsStore.sunburstOption);
  }
};
const downloadChart = () => {
  const img = new Image();
  img.src = chart.getDataURL({
    type: imageFormat.value,
    pixelRatio: resolution.value,
    backgroundColor: backgroundColor.value,
  });
  const link = document.createElement("a");
  link.href = img.src;
  link.download =
    `UR-${
      switchGraph.value === GraphTypes.SANKEY ? GraphTypes.SUNBURST : GraphTypes.SANKEY
    }-chart.` + imageFormat.value;
  link.click();
};
// Function to handle node clicks
function handleClick(params: any): void {
  // Sankey Chart Click
  if (params.data.depth) {
    switch (params.data.depth) {
      case echartsStore.SANKEYLEVELS.LEVEL1:
        return;
      case echartsStore.SANKEYLEVELS.LEVEL2:
        if (indicatorStore.selectedIndicator[params.name]) {
          deleteSelection(params.name);
        } else {
          addSelection(params.name, params.color);
        }
        break;
      case echartsStore.SANKEYLEVELS.LEVEL3:
        return;
    }
  } else if (params.data) {
    // Sunburst Chart Click
    const level = params.treePathInfo.length;
    // Sunburst Indicator Level Click
    if (echartsStore.sunburstIndicator.has(params.name)) {
      if (params.name && indicatorStore.selectedIndicator[params.name]) {
        deleteSelection(params.name);
      } else if (params.name) {
        addSelection(params.name, params.color);
      } else {
        chart.dispatchAction({
          type: "unselect",
          seriesIndex: 0,
          dataIndex: params.dataIndex,
        });
      }
      return;
    } else if (level === 2 && echartsStore.sunburstDimension.has(params.name)) {
      // Sunburst Second Graph Level 2 Go to Level 1
      let color = params.color;
      let dimensionData = echartsStore.sunburstData.children.find(
        (node: any) => node.name === echartsStore.sunburstColorSet[params.color],
      );
      reloadChart(echartsStore.sunburstOption1, dimensionData, color);
    } else if (level === 2 && params.value < 10) {
      // Sunburst First Graph Click Level 2
      let color = params.color;
      let data = echartsStore.sunburstData.children.find(
        (node: any) => node.name === params.name,
      );
      reloadChart(echartsStore.sunburstOption1, data, color);
      return;
    } else if (level === 2) {
      // Sunburst Second Graph Click Level 2
      chart.clear();
      chart.setOption(echartsStore.sunburstOption);
      return;
    } else if (level === 3 && params.value === 1) {
      // Sunburst First Graph Click Level 3
      let color = params.color;
      let dimension = params.treePathInfo[1];
      let dimensionData = echartsStore.sunburstData.children.find(
        (node: any) => node.name === dimension.name,
      );
      let data = dimensionData?.children.find((node: any) => node.name === params.name);
      reloadChart(echartsStore.sunburstOption2, data, color);
      return;
    }
  }
}
// Reload chart option
function reloadChart(option: any, data?: any, color?: string): void {
  if (data !== undefined && color !== undefined) {
    option.series.data = [data];
    option.color = color;
  }
  chart.clear();
  chart.setOption(option);
  let savedIndicatorNames = Object.keys(indicatorStore.selectedIndicator);
  chartDispatchSelection("select", savedIndicatorNames);
}
// Synchronize the sidebar saved indicators to the reloaded sunburst chart
function addSelection(name: string, color: string) {
  indicatorStore.addIndicator(name, color);
  let indicatorNames = Object.keys(indicatorStore.selectedIndicator);
  chartDispatchSelection("select", indicatorNames);
}
function deleteSelection(name: string) {
  indicatorStore.deleteIndicator(name);
  chartDispatchSelection("unselect", name);
}
// Listen to the indicator delete event of sidebar
window.addEventListener("storage", (event: StorageEvent) => {
  if (event.key === LocalStorageEvent.DELETE) {
    let data = localStorage.getItem(LocalStorageEvent.DELETE);
    chartDispatchSelection("unselect", JSON.parse(data!));
  }
});
function chartDispatchSelection(type: string, indicator: string[] | string) {
  if (indicator)
    chart.dispatchAction({
      type: type,
      seriesIndex: 0,
      name: indicator,
    });
}
const initChart = (): void => {
  chart = echarts.init(chartContainer.value);
  chart.setOption(echartsStore.sunburstOption);
  chart.on("click", (params: any) => handleClick(params));
};
// Make the chart resizable
const addResizeObserver = () => {
  if (chartContainer.value) {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > defaultWidth && height > defaultHeight) {
          chart.resize();
        }
      }
    });
    resizeObserver.observe(chartContainer.value);
  }
};
onMounted(() => {
  if (!chartContainer.value) return;
  initChart();
  addResizeObserver();
});
</script>
<template>
  <div class="btn-group" role="group">
    <div class="d-flex align-items-center gap-2">
      <div class="btn-group btn-group-sm float-end">
        <button
          class="btn btn-sm btn-success"
          data-toggle="modal"
          data-target="#downloadModal"
          @click="showModal = true"
        >
          <i class="fa fa-download" aria-hidden="true">{{
            $t("indicatorChart.buttons.download")
          }}</i>
        </button>
        <button class="btn btn-sm btn-warning" @click="switchGraphType">
          <i class="bi bi-arrow-repeat">
            {{ $t("indicatorChart.buttons.switch") }}
            {{ $t("graphTypes." + switchGraph) }}</i
          >
        </button>
      </div>
      <language-switcher></language-switcher>
    </div>
  </div>
  <!-- Download Chart Modal -->
  <div class="modal fade" :class="{ show: showModal }" tabindex="-1" v-show="showModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t("indicatorChart.modal.title") }}</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="showModal = false"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group d-flex">
              <label for="resolution" class="mr-2" style="padding-right: 10px">{{
                $t("indicatorChart.modal.resolution")
              }}</label>
              <input
                type="range"
                class="form-control-range"
                id="resolution"
                v-model="resolution"
                min="1"
                max="10"
                style="float: right"
              />
              <span>{{ resolution }}</span>
            </div>
            <div class="form-group d-flex">
              <label
                for="backgroundColor"
                class="mr-2"
                style="padding-right: 80px; padding-top: 10px"
                >{{ $t("indicatorChart.modal.color") }}</label
              >
              <input
                type="color"
                class="form-control"
                id="backgroundColor"
                v-model="backgroundColor"
                style="width: 60px; margin-top: 10px"
              />
            </div>
            <div class="form-group d-flex">
              <label
                for="imageFormat"
                class="mr-2"
                style="padding-right: 90px; padding-top: 20px"
                >{{ $t("indicatorChart.modal.format") }}</label
              >
              <select
                class="form-select"
                aria-label="Data Format"
                id="imageFormat"
                v-model="imageFormat"
                style="width: 100px; height: 40px; margin-top: 10px"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="svg">SVG</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="downloadChart">
            <i class="bi bi-download"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show" v-show="showModal"></div>
  <!-- Chart -->
  <div ref="chartContainer" class="chart-container"></div>
</template>
<style scoped>
.chart-container {
  width: 100%;
  height: 101vh;
}
.modal {
  display: block;
  left: 322.5px;
  width: 355px;
}
</style>
