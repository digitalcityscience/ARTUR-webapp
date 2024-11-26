<script lang="ts" setup>
import useIndicatorStore from "@/stores/indicatorStore";
import { LocalStorageEvent } from "@/assets/ts/constants";
import { sunburstColorConvertion } from "@/assets/data/echarts_options";

const indicatorStore = useIndicatorStore();
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
  if (color in sunburstColorConvertion) return sunburstColorConvertion[color];
  return color;
}
// The Analysis
const analyzeResults = () => {};
</script>
<template>
  <div class="leaflet-sidebar-pane" id="dashboard">
    <h1 class="leaflet-sidebar-header">
      Dashboard
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <button
          class="btn btn-toggle rounded collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#indicator-collapse"
          aria-expanded="true"
          style="padding-left: 0"
        >
          Select Indicators
        </button>
        <div class="collapse show" id="indicator-collapse">
          <ul
            class="list-group"
            v-for="indicator in Object.entries(indicatorStore.selectedIndicator).map(
              ([key, value]) => ({
                key,
                value,
              }),
            )"
            :key="indicator.key"
          >
            <li
              class="list-group-item list-group-item-secondary"
              :style="{ backgroundColor: indicatorColor(indicator.value) }"
            >
              {{ indicator.key }}
              <button
                class="btn-close"
                aria-label="Close"
                @click="deleteSelection(indicator.key)"
                style="float: right"
              ></button>
            </li>
          </ul>
          <div class="btn-group" role="group" aria-label="select-and-run">
            <button class="btn btn-primary" @click="openIndicatorSelection">
              Select
            </button>
            <button class="btn btn-success" @click="analyzeResults">Run</button>
          </div>
        </div>
      </li>
      <li class="mb-1">
        <button
          class="btn btn-toggle rounded collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#results-collapse"
          aria-expanded="true"
          style="padding-left: 0"
        >
          Results
        </button>
        <div class="collapse show" id="results-collapse"></div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
#indicator-collapse li {
  padding: 5px;
  font-size: 15px;
}
</style>
