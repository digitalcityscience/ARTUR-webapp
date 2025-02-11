<script lang="ts" setup>
import { onMounted, ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import * as echarts from "echarts";
import ChartDownloadModal from "@/components/chart/ChartDownloadModal.vue";
import useChartStore from "@/stores/indicatorChartStore";
import LanguageSwitcher from "../chart/LanguageSwitcher.vue";

// Text data
const sections = ref([
  {
    title: "sidebar.dictionaryPanel.content.capacities.class.1",
    items: [
      { label: "Robustness", iconClass: "bi bi-shield-check" },
      { label: "Redundancy", iconClass: "bi bi-diagram-2" },
      { label: "Inclusiveness", iconClass: "bi bi-people-fill" },
    ],
  },
  {
    title: "sidebar.dictionaryPanel.content.capacities.class.2",
    items: [
      { label: "Diversity", iconClass: "bi bi-palette" },
      { label: "Flexibility", iconClass: "bi bi-arrow-repeat" },
      { label: "Resourcefulness", iconClass: "bi bi-tree-fill" },
    ],
  },
  {
    title: "sidebar.dictionaryPanel.content.capacities.class.3",
    items: [
      { label: "Integration", iconClass: "bi bi-gear-wide-connected" },
      { label: "Reflectiveness", iconClass: "bi bi-graph-up-arrow" },
      { label: "Transparency", iconClass: "bi bi-eye-fill" },
    ],
  },
]);
const { locale, getLocaleMessage } = useI18n();
const textData = computed(() => getLocaleMessage(locale.value) as any);
const phaseText = computed(
  () => textData.value.sidebar.dictionaryPanel.content.description.phase,
);
const capacity = computed(
  () => textData.value.sidebar.dictionaryPanel.content.capacities,
);
// Sankey chart constants
const chartStore = useChartStore();
const chartContainer = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts;
const showDownloadModal = ref<boolean>(false);
// Methods
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
  <div class="leaflet-sidebar-pane" id="dictionary">
    <!-- Start Page -->
    <h1 class="leaflet-sidebar-header">
      {{ $t("sidebar.dictionaryPanel.header") }}
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <language-switcher></language-switcher>
    <div class="sidebar-content">
      <h5 class="fw-bold text-uppercase text-secondary">
        {{ $t("sidebar.dictionaryPanel.content.title") }}
      </h5>
      <div class="sidebar-content-text text-secondary">
        <h6 class="fw-bold">
          {{ $t("sidebar.dictionaryPanel.content.subtitle.definition") }}:
        </h6>
        {{ $t("sidebar.dictionaryPanel.content.description.definition") }}
      </div>
      <div class="sidebar-content-text text-secondary">
        <h6 class="fw-bold">
          {{ $t("sidebar.dictionaryPanel.content.subtitle.access") }}:
        </h6>
        {{ $t("sidebar.dictionaryPanel.content.description.access") }}
      </div>
      <div class="sidebar-content-text text-secondary">
        <h6 class="fw-bold">
          {{ $t("sidebar.dictionaryPanel.content.subtitle.phase") }}:
        </h6>
        <p v-for="(item, index) in phaseText" :key="index">{{ item.loc.source }}</p>
      </div>
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
              @click="
                chartStore.capacitySelected = item.label;
                chartStore.showCapacityModal = true;
              "
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
  <div v-show="chartStore.showCapacityModal">
    <div
      class="modal fade show"
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
            <button
              type="button"
              class="btn-close"
              @click="chartStore.showCapacityModal = false"
            ></button>
          </div>
          <!-- Modal Body -->
          <div class="modal-body bg-light p-4">
            <!-- Definition Section -->
            <div class="mb-4">
              <h6 class="text-uppercase text-secondary">
                {{ $t("sidebar.dictionaryPanel.content.capacities.title.definition") }}
              </h6>
              <p class="text-muted">
                {{
                  $t(
                    `sidebar.dictionaryPanel.content.capacities.${chartStore.capacitySelected}.definition`,
                  )
                }}
              </p>
            </div>
            <!-- Best Practices Section -->
            <div class="mb-4">
              <h6 class="text-uppercase text-secondary">
                {{ $t("sidebar.dictionaryPanel.content.capacities.title.practice") }}
              </h6>
              <ul class="list-group p-0">
                <li
                  v-for="(item, index) in capacity[chartStore.capacitySelected].practice"
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
                {{ $t("sidebar.dictionaryPanel.content.capacities.title.example") }}
              </h6>
              <div
                v-if="
                  capacity[chartStore.capacitySelected].example.type.loc.source === 'list'
                "
              >
                <ul class="list-group p-0">
                  <li
                    v-for="(item, index) in capacity[chartStore.capacitySelected].example
                      .data"
                    :key="index"
                    class="list-group-item px-2"
                  >
                    {{ item.loc.source }}
                  </li>
                </ul>
              </div>
              <div
                v-else-if="
                  capacity[chartStore.capacitySelected].example.type.loc.source ===
                  'grouped'
                "
              >
                <div
                  v-for="(group, groupKey) in capacity[chartStore.capacitySelected]
                    .example.data"
                  :key="groupKey"
                >
                  <h6 class="text-secondary">
                    {{
                      capacity[chartStore.capacitySelected].example.group[groupKey].loc
                        .source + ":"
                    }}:
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
              @click="chartStore.showSankeyModal = true"
            >
              {{ $t("sidebar.dictionaryPanel.buttons.toSankey") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
  <!-- Sankey Modal -->
  <div v-show="chartStore.showSankeyModal">
    <div class="modal-backdrop fade show"></div>
    <div
      class="modal fade show"
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
            <button
              type="button"
              class="btn-close"
              @click="chartStore.showSankeyModal = false"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Chart -->
            <div ref="chartContainer" class="chart-container"></div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" @click="showDownloadModal = true">
              <i class="fa fa-download">{{ $t("indicatorChart.buttons.download") }}</i>
            </button>
            <button
              class="btn btn-primary"
              @click="
                chartStore.showSankeyModal = false;
                chartStore.showCapacityModal = true;
              "
            >
              {{ $t("sidebar.dictionaryPanel.buttons.back") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Download Chart Modal -->
  <chart-download-modal v-model:show="showDownloadModal" :chart="chart" />
</template>
<style scoped>
.text-muted {
  white-space: pre-line;
}
.chart-container {
  width: 1100px;
  height: 900px;
}
.modal {
  display: block;
}
</style>
