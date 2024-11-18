<script lang="ts" setup>
import PopulationSumChart from "@/components/controls/PopulationSumChart.vue";
import { basemaps, LayerName, populationType } from "@/assets/ts/constants";
import { ref, watch } from "vue";
import useMapStore from "@/stores/mapStore";

const mapStore = useMapStore();
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
</script>
<template>
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
          <div class="collapse show" id="layer-control-collapse" style="margin-left: 1em">
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
                  <div v-if="overlay.name === LayerName.HEALTHSITEISOCHRONE" class="mt-2">
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
            <h6 v-html="mapStore.popup"></h6>
          </div>
        </li>
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#shelter-population-collapse"
            v-show="mapStore.vectorLayers.populationLayer.visible"
            aria-expanded="true"
            style="padding-left: 0"
          >
            Shelter Access Population Information
          </button>
          <div class="collapse show" id="shelter-population-collapse">
            <population-sum-chart
              v-if="
                mapStore.vectorLayers.populationLayer.visible &&
                mapStore.shelterPopulation
              "
              :type="populationType.SHELTER"
            ></population-sum-chart>
          </div>
        </li>
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#healthsite-population-collapse"
            v-show="mapStore.vectorLayers.healthSitePopulationLayer.visible"
            aria-expanded="true"
            style="padding-left: 0"
          >
            Health Site Access Population Information
          </button>
          <div class="collapse show" id="healthsite-population-collapse">
            <population-sum-chart
              v-if="
                mapStore.vectorLayers.healthSitePopulationLayer.visible &&
                mapStore.healthSitePopulation
              "
              :type="populationType.HEALTHSITE"
            ></population-sum-chart>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
