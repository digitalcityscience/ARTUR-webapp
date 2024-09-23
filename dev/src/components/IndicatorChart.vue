<template>
  <div class="btn-group" role="group">
    <button
      type="button"
      class="btn btn-sm btn-success"
      data-toggle="modal"
      data-target="#downloadModal"
      @click="showModal = true"
    >
      <i class="fa fa-download" aria-hidden="true"></i> Download Chart
    </button>
    <button type="button" class="btn btn-m btn-warning" @click="switchGraphType">
      <i class="bi bi-arrow-repeat">View {{ switchGraph }} Graph</i>
    </button>
  </div>
  <!-- Download Chart Modal -->
  <div class="modal fade" :class="{ show: showModal }" tabindex="-1" v-show="showModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Download Options</h5>
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
              <label for="resolution" class="mr-2" style="padding-right: 10px"
                >Resolution (Pixel Ratio):</label
              >
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
                >Background Color:</label
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
                >Image Format:</label
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

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import {
  sunburstData,
  sunburstOption,
  sunburstOption1,
  sankeyOption,
  SANKEYLEVELS,
} from "@/assets/data/echarts_options";
import { GraphTypes, ImageFormat, LocalStorageEvent } from "@/assets/ts/constants";
// Constant
const chartContainer = ref<HTMLDivElement | null>(null);
const defaultWidth = 1000;
const defaultHeight = 1000;
let chart: echarts.ECharts;
const selected = ref<Set<string>>(new Set<string>());
let selectedIndicator: Record<string, string> = {};
const showModal = ref<boolean>(false);
const resolution = ref<number>(2);
const backgroundColor = ref<string>("#ffffff");
const imageFormat = ref<ImageFormat>(ImageFormat.PNG);
const switchGraph = ref<GraphTypes>(GraphTypes.SANKEY);
// Methods
const switchGraphType = () => {
  if (switchGraph.value == GraphTypes.SANKEY) {
    switchGraph.value = GraphTypes.SUNBURST;
    reloadChart(sankeyOption);
  } else {
    switchGraph.value = GraphTypes.SANKEY;
    reloadChart(sunburstOption);
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
  if (params.data.depth) {
    switch (params.data.depth) {
      case SANKEYLEVELS.LEVEL1:
        return;
      case SANKEYLEVELS.LEVEL2:
        if (selected.value.has(params.name)) {
          deleteSelection(params.name);
        } else {
          addSelection(params.name, params.color);
        }
        break;
      case SANKEYLEVELS.LEVEL3:
        return;
    }
  } else if (params.data) {
    const level = params.treePathInfo.length;
    if (level === 4) {
      if (params.name && selected.value.has(params.name)) {
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
    } else if (level === 2 && params.value < 10) {
      let color = params.color;
      let data = sunburstData.children.find((node: any) => node.name === params.name);
      reloadChart(sunburstOption1, data, color);
      return;
    } else if (level === 2) {
      chart.clear();
      chart.setOption(sunburstOption);
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
  loadSidebarIndicator();
}
// Synchronize the sidebar saved indicators to the reloaded sunburst chart
function loadSidebarIndicator(): void {
  let savedIndicators = localStorage.getItem(LocalStorageEvent.SIDEBARSAVED);
  if (savedIndicators) {
    selected.value = new Set<string>(JSON.parse(savedIndicators));
    chart.dispatchAction({
      type: "select",
      seriesIndex: 0,
      name: JSON.parse(savedIndicators),
    });
  }
}
function addSelection(name: string, color: string) {
  selected.value.add(name);
  selectedIndicator[name] = color;
}
function deleteSelection(name: string) {
  selected.value.delete(name);
  delete selectedIndicator[name];
}
// Store the changes of sunburst selected indicators
watch(
  selected,
  (newVal) => {
    if (!chart) return;
    localStorage.setItem(
      LocalStorageEvent.CHARTSELECTED,
      JSON.stringify(selectedIndicator),
    );
  },
  { deep: true },
);
// Watch for deletion in sidebar and update sidebar Selected indicators
window.addEventListener("storage", (event: StorageEvent) => {
  if (event.key === LocalStorageEvent.SIDEBARDELETED) {
    let deletedIndicator = event.newValue!;
    selected.value.delete(deletedIndicator);
    delete selectedIndicator[deletedIndicator];
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
