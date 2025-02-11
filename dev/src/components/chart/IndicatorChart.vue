<script lang="ts" setup>
import { ref, computed, watch, type HTMLAttributes, onUnmounted } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { SankeyChart, SunburstChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import VChart from "vue-echarts";
import ChartDownloadModal from "@/components/chart/ChartDownloadModal.vue";
import { GraphTypes } from "@/assets/ts/constants";
import useIndicatorStore from "@/stores/indicatorStore";
import useIndicatorChartStore from "@/stores/indicatorChartStore";
import { useI18n } from "vue-i18n";

/* ECharts */
use([
  CanvasRenderer,
  SankeyChart,
  SunburstChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
/* Stores */
const indicatorStore = useIndicatorStore();
const chartStore = useIndicatorChartStore();
/* i18n */
const { locale } = useI18n();
/* Refs */
const showModal = ref<boolean>(false);
const switchGraph = ref<string>(GraphTypes.SANKEY);
const chartRef = ref();

/* Chart Behavior */
const chartOption = computed(() => {
  if (indicatorStore.indicatorType === "basic") {
    return switchGraph.value == GraphTypes.SANKEY
      ? chartStore.sunburstBasicOption
      : chartStore.sankeyBasicOption;
  } else {
    return switchGraph.value == GraphTypes.SANKEY
      ? chartStore.sunburstOptionLevel0
      : chartStore.sankeyOption;
  }
});
const switchGraphType = () => {
  switchGraph.value =
    switchGraph.value == GraphTypes.SANKEY ? GraphTypes.SUNBURST : GraphTypes.SANKEY;
};
// Function to handle node clicks
function handleSunburstClick(params: any): void {
  if (indicatorStore.indicatorType === "basic") return;
  if (!params.data) return;

  const level = params.treePathInfo.length;
  const chart = chartRef.value;

  if (level === 2 && chartStore.sunburstCategory.has(params.name)) {
    // Sunburst Second Graph Click Category
    let dimensionData = chartStore.sunburstData.find(
      (node: any) => node.name === chartStore.sunburstColorSet[params.color],
    );
    reloadChart(chartStore.sunburstOptionLevel1, dimensionData, params.color);
  } else if (level === 2 && params.value < 15) {
    // Sunburst First Graph Click Dimension
    let data = chartStore.sunburstData.find((node: any) => node.name === params.name);
    reloadChart(chartStore.sunburstOptionLevel1, data, params.color);
  } else if (level === 2) {
    // Sunburst Second Graph Click Dimension
    chart.setOption(chartStore.sunburstOptionLevel0);
  } else if (level === 3 && chartStore.sunburstCategory.has(params.name)) {
    // Sunburst First Graph && Second Graph Click Category
    let dimension = params.treePathInfo[1];
    let dimensionData = chartStore.sunburstData.find(
      (node: any) => node.name === dimension.name,
    );
    let data = dimensionData?.children?.find((node: any) => node.name === params.name);
    reloadChart(chartStore.sunburstOptionLevel2, data, params.color);
  }
}
// Reload chart option
function reloadChart(option: any, data?: any, color?: string): void {
  if (data !== undefined && color !== undefined) {
    option.series.data = [data];
    option.color = color;
  }
  chartRef.value?.setOption(option);
}
// watch the changes of language
watch(locale, () => {
  chartRef.value?.setOption(chartOption.value);
});

/* Dragging */
const isDragging = ref(false);
const modalPosition = ref({ x: 0, y: 0 });
const startPos = ref({ x: 0, y: 0 });
const startModalPos = ref({ x: 0, y: 0 });
// drag handlers
const startDrag = (e: MouseEvent) => {
  if (
    e.target instanceof Element &&
    (e.target.classList.contains("btn") || e.target.classList.contains("btn-close"))
  )
    return;

  isDragging.value = true;

  // If this is the first drag (modal is centered), calculate the current position
  if (!hasPosition.value) {
    const modalElement = e.currentTarget as HTMLElement;
    const modalDiv = modalElement.closest(".custom-modal");
    if (modalDiv instanceof HTMLElement) {
      const rect = modalDiv.getBoundingClientRect();
      modalPosition.value = {
        x: rect.left,
        y: rect.top,
      };
      startModalPos.value = { ...modalPosition.value };
    }
  }

  startPos.value = { x: e.clientX, y: e.clientY };
  startModalPos.value = { ...modalPosition.value };

  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", stopDrag);
};
const handleDrag = (e: MouseEvent) => {
  if (!isDragging.value) return;

  const deltaX = e.clientX - startPos.value.x;
  const deltaY = e.clientY - startPos.value.y;

  modalPosition.value = {
    x: startModalPos.value.x + deltaX,
    y: startModalPos.value.y + deltaY,
  };
};
const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", stopDrag);
};
const hasPosition = computed(
  () => modalPosition.value.x !== 0 || modalPosition.value.y !== 0,
);
/* Resizing */
const startSize = ref({ width: 850, height: 880 });
const currentSize = ref({ width: 850, height: 880 });
const isResizing = ref(false);
// resize handlers
const startResize = (e: MouseEvent) => {
  isResizing.value = true;
  startPos.value = { x: e.clientX, y: e.clientY };
  startSize.value = { ...currentSize.value };

  document.addEventListener("mousemove", handleResize);
  document.addEventListener("mouseup", stopResize);
};
const handleResize = (e: MouseEvent) => {
  if (!isResizing.value) return;

  const deltaX = e.clientX - startPos.value.x;
  const deltaY = e.clientY - startPos.value.y;

  currentSize.value = {
    width: Math.max(600, startSize.value.width + deltaX),
    height: Math.max(620, startSize.value.height + deltaY),
  };
};
const stopResize = () => {
  isResizing.value = false;
  document.removeEventListener("mousemove", handleResize);
  document.removeEventListener("mouseup", stopResize);
};
// Update modalTransformStyle
const modalTransformStyle = computed<HTMLAttributes>(() => ({
  style: {
    top: !hasPosition.value ? "50%" : "0",
    left: !hasPosition.value ? "50%" : "0",
    transform: !hasPosition.value
      ? "translate(-50%, -50%)"
      : `translate(${modalPosition.value.x}px, ${modalPosition.value.y}px)`,
    width: `${currentSize.value.width}px`,
    height: `${currentSize.value.height}px`,
  },
}));

onUnmounted(() => {
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("mousemove", handleResize);
  document.removeEventListener("mouseup", stopResize);
});
</script>
<template>
  <div class="modal" tabindex="-1" :class="{ 'd-block': true }">
    <div class="modal-dialog modal-xl custom-modal" v-bind="modalTransformStyle">
      <div class="modal-content h-100">
        <div class="modal-header" @mousedown="startDrag">
          <div class="btn-group" role="group">
            <div class="d-flex align-items-center gap-2">
              <div class="btn-group btn-group-sm">
                <button class="btn btn-success" @click="showModal = true">
                  <i class="fa fa-download">{{
                    $t("indicatorChart.buttons.download")
                  }}</i>
                </button>
                <button class="btn btn-warning" @click="switchGraphType">
                  <i class="bi bi-arrow-repeat">
                    {{ $t("indicatorChart.buttons.switch") }}
                    {{ $t("indicatorChart.graphTypes." + switchGraph) }}
                  </i>
                </button>
              </div>
            </div>
          </div>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body p-0" @mousedown="startDrag">
          <chart-download-modal v-model:show="showModal" :chart="chartRef" />
          <v-chart
            ref="chartRef"
            class="chart"
            :option="chartOption"
            @click="handleSunburstClick"
            autoresize
          />
        </div>
        <!-- Add resize handle -->
        <div class="resize-handle" @mousedown.prevent="startResize"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-header {
  cursor: move;
  padding: 0.5rem 1rem;
}
.modal-body {
  height: calc(100% - 2px);
}
.custom-modal {
  margin: 0;
  min-width: 400px;
  min-height: 400px;
  position: fixed;
}
.resize-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 15px;
  height: 15px;
  cursor: se-resize;
  background: linear-gradient(135deg, transparent 50%, #666 50%);
  z-index: 1000;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
