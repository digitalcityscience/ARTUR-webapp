<script lang="ts" setup>
import { onMounted, ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import * as echarts from "echarts";
import { ImageFormat } from "@/assets/ts/constants";
import useChartStore from "@/stores/chartStore";
import LanguageSwitcher from "./LanguageSwitcher.vue";

// Text data
// const capacityIcon = {
//   Robustness: "bi bi-shield-check",
//   Redundancy: "bi bi-diagram-2",
//   Inclusiveness: "bi bi-people-fill",
//   Diversity: "bi bi-palette",
//   Flexibility: "bi bi-arrow-repeat",
//   Resourcefulness: "bi bi-tree-fill",
//   Integration: "bi bi-gear-wide-connected",
//   Reflectiveness: "bi bi-graph-up-arrow",
//   Transparency: "bi bi-eye-fill",
// };
const sections = ref([
  {
    title: "sidebar.knowledgePanel.content.capacities.class.1",
    items: [
      { label: "Robustness", iconClass: "bi bi-shield-check" },
      { label: "Redundancy", iconClass: "bi bi-diagram-2" },
      { label: "Inclusiveness", iconClass: "bi bi-people-fill" },
    ],
  },
  {
    title: "sidebar.knowledgePanel.content.capacities.class.2",
    items: [
      { label: "Diversity", iconClass: "bi bi-palette" },
      { label: "Flexibility", iconClass: "bi bi-arrow-repeat" },
      { label: "Resourcefulness", iconClass: "bi bi-tree-fill" },
    ],
  },
  {
    title: "sidebar.knowledgePanel.content.capacities.class.3",
    items: [
      { label: "Integration", iconClass: "bi bi-gear-wide-connected" },
      { label: "Reflectiveness", iconClass: "bi bi-graph-up-arrow" },
      { label: "Transparency", iconClass: "bi bi-eye-fill" },
    ],
  },
]);
const { locale, getLocaleMessage } = useI18n();
const textData = computed(() => getLocaleMessage(locale.value) as any);
const content = computed(() => textData.value.sidebar.knowledgePanel.content);
// Sankey chart constants
const chartStore = useChartStore();
const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;
const resolution = ref<number>(2);
const backgroundColor = ref<string>("#ffffff");
const imageFormat = ref<ImageFormat>(ImageFormat.PNG);
// Methods
const downloadChart = () => {
  const img = new Image();
  img.src = chart.getDataURL({
    type: imageFormat.value,
    pixelRatio: resolution.value,
    backgroundColor: backgroundColor.value,
  });
  const link = document.createElement("a");
  link.href = img.src;
  link.download = `Sankey-${chartStore.capacitySelected}-chart.` + imageFormat.value;
  link.click();
};
const initChart = (): void => {
  chart = echarts.init(chartContainer.value);
  chart.setOption(chartStore.sankeyOptionCapacity);
};
const reloadOptions = () => {
  chart.clear();
  chart.setOption(chartStore.sankeyOptionCapacity);
};
watch(locale, reloadOptions);
watch(() => chartStore.capacitySelected, reloadOptions);
onMounted(initChart);
</script>
<template>
  <!-- Knowledge Panel -->
  <div class="leaflet-sidebar-pane" id="knowledge">
    <!-- Start Page -->
    <h1 class="leaflet-sidebar-header">
      {{ $t("sidebar.knowledgePanel.title") }}
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <language-switcher></language-switcher>
    <div class="sidebar-content">
      <strong class="sidebar-title">
        {{ $t("sidebar.knowledgePanel.content.title") }}</strong
      >
      <p
        v-for="(item, index) in content.description"
        :key="index"
        class="sidebar-content-text"
      >
        {{ item.loc.source }}
      </p>
      <div class="container mt-4">
        <div v-for="(section, index) in sections" :key="index" class="mb-1">
          <h6
            class="btn btn-primary rounded w-100 text-start"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#capacities-${index}`"
          >
            {{ $t(section.title) }}
          </h6>
          <ul
            class="list-group p-0 collapse show"
            :id="`capacities-${index}`"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
          >
            <li
              v-for="(item, itemIndex) in section.items"
              :key="itemIndex"
              type="button"
              class="list-group-item d-flex align-items-center btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#capacityModal"
              @click="chartStore.capacitySelected = item.label"
            >
              <i :class="item.iconClass"
                >{{ " " }}{{ $t("echarts.capacities." + item.label) }}</i
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- Capacity Modal -->
  <div
    class="modal fade"
    id="capacityModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">
            <i></i>{{ $t("echarts.capacities." + chartStore.capacitySelected) }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <!-- Modal Body -->
        <div class="modal-body bg-light p-4">
          <!-- Definition Section -->
          <div class="mb-4">
            <h6 class="text-uppercase text-secondary">
              {{ $t("sidebar.knowledgePanel.content.capacities.title.definition") }}
            </h6>
            <p class="text-muted">
              {{
                $t(
                  `sidebar.knowledgePanel.content.capacities.${chartStore.capacitySelected}.definition`,
                )
              }}
            </p>
          </div>
          <!-- Best Practices Section -->
          <div class="mb-4">
            <h6 class="text-uppercase text-secondary">
              {{ $t("sidebar.knowledgePanel.content.capacities.title.practice") }}
            </h6>
            <ul class="list-group p-0">
              <li
                v-for="(item, index) in content.capacities[chartStore.capacitySelected]
                  .practice"
                :key="index"
                class="list-group-item px-2"
              >
                {{ item.loc.source }}
              </li>
            </ul>
          </div>
          <!-- Examples Section -->
          <div>
            <h6 class="text-uppercase text-secondary">
              {{ $t("sidebar.knowledgePanel.content.capacities.title.example") }}
            </h6>
            <div
              v-if="
                content.capacities[chartStore.capacitySelected].example.type.loc
                  .source === 'list'
              "
            >
              <ul class="list-group p-0">
                <li
                  v-for="(item, index) in content.capacities[chartStore.capacitySelected]
                    .example.data"
                  :key="index"
                  class="list-group-item px-2"
                >
                  {{ item.loc.source }}
                </li>
              </ul>
            </div>
            <div
              v-else-if="
                content.capacities[chartStore.capacitySelected].example.type.loc
                  .source === 'grouped'
              "
            >
              <div
                v-for="(group, groupKey) in content.capacities[
                  chartStore.capacitySelected
                ].example.data"
                :key="groupKey"
              >
                <h6 class="text-secondary">
                  {{
                    content.capacities[chartStore.capacitySelected].example.group[
                      groupKey
                    ].loc.source + ":"
                  }}
                </h6>
                <ul class="list-group p-0">
                  <li
                    v-for="(item, index) in group"
                    :key="index"
                    class="list-group-item px-2 mb-1"
                  >
                    {{ item.loc.source }}
                  </li>
                </ul>
              </div>
            </div>
            <div v-else>
              <h1>NODATA ERROR</h1>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#sankeyModal"
          >
            {{ $t("sidebar.knowledgePanel.content.button") }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Sankey Modal -->
  <div
    class="modal fade"
    id="sankeyModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">
            {{ $t("echarts.capacities." + chartStore.capacitySelected) }}
            - {{ $t("indicatorChart.graphTypes.sankey") }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <!-- Chart -->
          <div ref="chartContainer" class="chart-container"></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" @click="downloadChart">
            <i class="fa fa-download">{{ $t("indicatorChart.buttons.download") }}</i>
          </button>
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#capacityModal"
          >
            {{ $t("sidebar.buttons.back") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.text-muted {
  white-space: pre-line;
}
.chart-container {
  width: 1100px;
  height: 900px;
}
</style>
