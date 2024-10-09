<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import * as L from "leaflet";
import "leaflet-sidebar-v2/js/leaflet-sidebar.js";
import "leaflet-sidebar-v2/css/leaflet-sidebar.css";
import PopulationSumChart from "@/components/controls/PopulationSumChart.vue";
import { basemaps, LayerName, LocalStorageEvent } from "@/assets/ts/constants";
import { sunburstColorConvertion } from "@/assets/data/echarts_options";
import useMapStore from "@/stores/mapStore";
import useIndicatorStore from "@/stores/indicatorStore";

// Stores
const mapStore = useMapStore();
const indicatorStore = useIndicatorStore();
// Map
const map = mapStore.map;
// Track the currently selected base map by its name, default is the first
const selectedBasemap = ref(basemaps[0].name);
// Methods
// Function to change the visible base map
watch(selectedBasemap, (newBasemap) => {
  basemaps.forEach((basemap) => {
    basemap.visible.value = basemap.name === newBasemap;
  });
});
// Local state to store the selected isochrone type
const selectedIsochroneType = ref("auto");
// Function to change the isochrone type and fetch the corresponding data
const changeIsochroneType = () => {
  mapStore.setIsochroneType(selectedIsochroneType.value);
};
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
onMounted(() => {
  L.control
    .sidebar({
      container: "rightsidebar",
      position: "right",
      closebutton: true,
    })
    .addTo(map)
    .open("home");
});
</script>
<template>
  <div class="sidebar-container">
    <div id="rightsidebar" class="leaflet-sidebar collapsed">
      <!-- nav tabs -->
      <div class="leaflet-sidebar-tabs">
        <!-- top aligned tabs -->
        <ul role="tablist">
          <li>
            <a href="#home" role="tab" title="Usage of this tool"
              ><i class="bi bi-info-circle"></i
            ></a>
          </li>
          <li>
            <a href="#layer" role="tab" title="Layers Information"
              ><i class="bi bi-stack"></i
            ></a>
          </li>
          <li>
            <a href="#dashboard" role="tab" title="Dashboard"
              ><i class="fa fa-bar-chart"></i
            ></a>
          </li>
        </ul>
        <!-- bottom tabs -->
        <ul role="tablist">
          <li>
            <a href="#settings" title="Settings"><i class="fa fa-gear"></i></a>
          </li>
        </ul>
      </div>
      <!-- panel content -->
      <div class="leaflet-sidebar-content">
        <!-- home -->
        <div class="leaflet-sidebar-pane" id="home">
          <h1 class="leaflet-sidebar-header">
            Info
            <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
          </h1>
          <div class="info-content info-city" style="margin-top: 10px">
            <strong class="info-title"
              >1. <i class="fa fa-crosshairs"></i> Navigation Control
            </strong>
            <p class="info-content-text"><strong>Position: </strong>Top-left</p>
            <p class="info-content-text">
              The navigation control can navigate the user to different cities. By simply
              clicking on the city name, the map view would fly to the city and show the
              feature layers if we had the data.
            </p>
          </div>
          <div class="info-content info-legend" style="margin-top: 10px">
            <strong class="info-title"
              >2. <i class="bi bi-map-fill"></i> Legend Control
            </strong>
            <p class="info-content-text"><strong>Position: </strong>Bottom-left</p>
            <p class="info-content-text">
              The legend control displays the legend of the feature layers. If a feature
              layer is hidden, the legend for that layer is also hidden, and vice versa.
              The toggle button of the legend control switches the collapsed state of the
              legend.
            </p>
          </div>
          <div class="info-content info-layer" style="margin-top: 10px">
            <strong class="info-title"
              >3. <i class="bi bi-stack"></i> Layers Information
            </strong>
            <p class="info-content-text"><strong>Position: </strong>Sidebar</p>
            <p class="info-content-text">
              The "Layer Control" would display checkboxes for each feature layer to
              toggle them on display or hidden. Information about each shelter can be seen
              in the drop-down menu “Shelters Information”. Simply click on the dot symbol
              of a shelter on the map and the address and capacity of that shelter will be
              displayed.
            </p>
          </div>
          <div class="info-content info-chart" style="margin-top: 10px">
            <strong class="info-title"
              >4. <i class="fa fa-bar-chart"></i> Dashboard
            </strong>
            <p class="info-content-text"><strong>Position: </strong>Sidebar</p>
            <p class="info-content-text">
              The Dashboard provides indicator selection and results display. The user can
              click on the "Select" button to view the Indicator Sunburst / Sankey Chart
              and click on the indicator to select it. Selected indicators can be deleted
              by clicking the Cancel button in the sidebar or re-click the indicator in
              the chart. Click the "Run" button to display the analysis results of the
              user-selected indicator.
            </p>
          </div>
        </div>
        <!-- Layers -->
        <div class="leaflet-sidebar-pane" id="layer">
          <h1 class="leaflet-sidebar-header">
            Layers
            <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
          </h1>
          <div class="layer-control-content" style="margin-top: 10px">
            <ul class="list-unstyled ps-0">
              <li class="mb-1">
                <button
                  class="btn btn-toggle rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#layer-control-collapse"
                  aria-expanded="true"
                  style="padding-left: 0"
                >
                  Layer Control
                </button>
                <div
                  class="collapse show"
                  id="layer-control-collapse"
                  style="margin-left: 1em"
                >
                  <ul class="list-unstyled ps-0">
                    <li class="mb-1">
                      <button
                        class="btn btn-toggle rounded collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#basemap-switch"
                        aria-expanded="true"
                        style="padding-left: 0"
                      >
                        Basemaps
                      </button>
                      <div
                        v-for="basemap in basemaps"
                        :key="basemap.name"
                        class="form-check collapse show"
                        id="basemap-switch"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          name="basemap"
                          :id="basemap.name"
                          :value="basemap.name"
                          v-model="selectedBasemap"
                        />
                        <label class="form-check-label" :for="basemap.name">
                          {{ basemap.name }}
                        </label>
                      </div>
                    </li>
                    <li class="mb-1">
                      <button
                        class="btn btn-toggle rounded collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#overlay-switch"
                        aria-expanded="true"
                        style="padding-left: 0"
                      >
                        Overlays
                      </button>
                      <div
                        class="form-check collapse show"
                        v-for="overlay in mapStore.vectorLayers"
                        :key="overlay.name"
                        id="overlay-switch"
                      >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :id="overlay.name"
                          :name="overlay.name"
                          v-model="overlay.visible"
                        />
                        <label class="form-check-label" :for="overlay.name">
                          {{ overlay.name }}
                        </label>
                        <!-- Isochrone switcher for healthSiteIsochroneLayer -->
                        <div
                          v-if="overlay.name === LayerName.HEALTHSITEISOCHRONE"
                          class="mt-2"
                        >
                          <select
                            v-model="selectedIsochroneType"
                            @change="changeIsochroneType"
                            class="form-select"
                            id="isochroneType"
                            aria-label="Isochrone Type Select"
                          >
                            <option value="auto">Car</option>
                            <option value="bus">Bus</option>
                            <option value="bicycle">Bicycle</option>
                            <option value="pedestrian">Pedestrian</option>
                          </select>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="mb-1">
                <button
                  class="btn btn-toggle rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#popup-collapse"
                  aria-expanded="true"
                  style="padding-left: 0"
                >
                  Shelters Information
                </button>
                <div class="collapse show" id="popup-collapse">
                  <slot name="popup"></slot>
                </div>
              </li>
              <li class="mb-1">
                <button
                  class="btn btn-toggle rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#population-collapse"
                  v-show="mapStore.vectorLayers.populationLayer.visible"
                  aria-expanded="true"
                  style="padding-left: 0"
                >
                  Population Information
                </button>
                <div class="collapse show" id="population-collapse">
                  <population-sum-chart
                    v-if="mapStore.vectorLayers.populationLayer.visible"
                  ></population-sum-chart>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- Dashboard -->
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
                  v-for="indicator in Object.entries(
                    indicatorStore.selectedIndicator,
                  ).map(([key, value]) => ({
                    key,
                    value,
                  }))"
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
      </div>
    </div>
  </div>
</template>
<style scoped>
/* .leaflet-sidebar:not(.collapsed) {
  width: 380px;
} */
@media (min-width: 1200px) {
  .leaflet-sidebar-pane {
    min-width: 420px;
  }
}
p {
  margin-bottom: 0;
}
.btn-toggle {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  background-color: transparent;
  border: 0;
}
.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(0, 0, 0, 0.85);
  background-color: #7dbfeb;
}
.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform 0.35s ease;
  transform-origin: 0.5em 50%;
}

.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}
div {
  font-family: var(--bs-font-sans-serif);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2;
}
#indicator-collapse li {
  padding: 5px;
  font-size: 15px;
}
.btn-close {
  right: 0;
}
div.info-content {
  display: block;
}
strong.info-title {
  padding-left: 5px;
  padding-bottom: 10px;
}
p.info-content-text {
  padding-left: 5px;
  padding-top: 5px;
  line-height: 1.5;
}
</style>
