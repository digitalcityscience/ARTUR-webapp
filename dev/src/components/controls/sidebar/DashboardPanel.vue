<script lang="ts" setup>
import LanguageSwitcher from "./LanguageSwitcher.vue";
import useIndicatorStore from "@/stores/indicatorStore";
import { LocalStorageEvent } from "@/assets/ts/constants";
import useEchartsStore from "@/stores/chartStore";

const indicatorStore = useIndicatorStore();
const echartsStore = useEchartsStore();
// Open the Indicator Selection Window
const openIndicatorSelection = (): void => {
  let mainWinWidth = window.innerWidth;
  let mainWinHeight = window.innerHeight;
  let newWinWidth = 1000;
  let newWinHeight = 1000;
  let leftOffset = (mainWinWidth - newWinWidth) / 2;
  let topOffset = (mainWinHeight - newWinHeight) / 2;
  window.open(
    "/indicator-selection-popup.html",
    "",
    `left=${leftOffset},top=${topOffset},width=${newWinWidth},height=${newWinHeight}`,
  );
};
// Delete the selected indicator and save the delted indicator name in Local Storage
function deleteSelection(indicator: string) {
  indicatorStore.deleteIndicator(indicator);
  localStorage.setItem(LocalStorageEvent.DELETE, JSON.stringify(indicator));
}
// Convert the color
function indicatorColor(color: string): string {
  if (color in echartsStore.sunburstColorConvertion)
    return echartsStore.sunburstColorConvertion[color];
  return color;
}
// The Analysis
const analyzeResults = () => {};
</script>
<template>
  <div class="leaflet-sidebar-pane" id="dashboard">
    <h1 class="leaflet-sidebar-header">
      {{ $t("sidebar.dashboardPanel.header") }}
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <language-switcher></language-switcher>
    <ul class="list-unstyled ps-0 mt-2">
      <li class="mb-1">
        <button
          class="btn btn-toggle rounded collapsed ps-0"
          data-bs-toggle="collapse"
          data-bs-target="#indicator-collapse"
          aria-expanded="true"
        >
          {{ $t("sidebar.dashboardPanel.indicator") }}
        </button>
        <div class="collapse show" id="indicator-collapse">
          <template
            v-for="indicator in Object.entries(indicatorStore.selectedIndicator).map(
              ([key, value]) => ({
                key,
                value,
              }),
            )"
            :key="indicator.key"
          >
            <div
              class="rounded border ps-2 py-1 m-0 clearfix"
              :style="{ backgroundColor: indicatorColor(indicator.value) }"
              data-bs-toggle="modal"
              data-bs-target="#questionnaire"
            >
              {{ indicator.key }}
              <button
                class="btn btn-close float-end"
                aria-label="Close"
                @click="deleteSelection(indicator.key)"
              ></button>
            </div>
          </template>
          <div class="btn-group mt-1" role="group" aria-label="Indicator actions">
            <button class="btn btn-primary" @click="openIndicatorSelection">
              {{ $t("sidebar.dashboardPanel.button.select") }}
            </button>
            <button class="btn btn-success" @click="analyzeResults">
              {{ $t("sidebar.dashboardPanel.button.run") }}
            </button>
          </div>
        </div>
      </li>
      <li class="mb-1">
        <button
          class="btn btn-toggle rounded collapsed ps-0"
          data-bs-toggle="collapse"
          data-bs-target="#results-collapse"
          aria-expanded="true"
        >
          {{ $t("sidebar.dashboardPanel.result") }}
        </button>
        <div class="collapse show" id="results-collapse"></div>
      </li>
    </ul>
  </div>
  <!-- Questionnaire Modal -->
  <div class="modal fade" id="questionnaire" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="questionnaire-title">
            {{ $t("sidebar.dashboardPanel.questionnaire.title") }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t("sidebar.dashboardPanel.questionnaire.buttons.close") }}
          </button>
          <button type="button" class="btn btn-primary">
            {{ $t("sidebar.dashboardPanel.questionnaire.buttons.save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
