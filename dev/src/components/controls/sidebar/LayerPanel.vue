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
                <ul class="list-unstyled ps-0" id="overlay-switch">
                  <li class="mb-1 form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :id="mapStore.boundaryLayer.name"
                      :name="mapStore.boundaryLayer.name"
                      v-model="mapStore.boundaryLayer.visible"
                    />
                    <label class="form-check-label" :for="mapStore.boundaryLayer.name">
                      {{ mapStore.boundaryLayer.name }}
                    </label>
                  </li>
                  <li class="mb-1">
                    <button
                      class="btn btn-outline-success btn-layer-set"
                      data-bs-toggle="collapse"
                      data-bs-target="#shelter-layer-set"
                      aria-expanded="false"
                    >
                      Layer Set: Shelter
                    </button>
                    <ul class="form-check collapse list-unstyled" id="shelter-layer-set">
                      <li
                        class="mb-1"
                        v-for="overlay in mapStore.shelterLayers"
                        :key="overlay.name"
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
                      </li>
                    </ul>
                  </li>
                  <li class="mb-1">
                    <button
                      class="btn btn-outline-success btn-layer-set"
                      data-bs-toggle="collapse"
                      data-bs-target="#healthsite-layer-set"
                      aria-expanded="false"
                    >
                      Layer Set: Health Site
                    </button>
                    <ul
                      class="form-check collapse list-unstyled"
                      id="healthsite-layer-set"
                    >
                      <li
                        class="mb-1"
                        v-for="overlay in mapStore.healthsiteLayers"
                        :key="overlay.name"
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
                      </li>
                    </ul>
                  </li>
                  <li class="mb-1">
                    <button
                      class="btn btn-outline-success btn-layer-set"
                      data-bs-toggle="collapse"
                      data-bs-target="#watersource-layer-set"
                      aria-expanded="false"
                    >
                      Layer Set: Water Source
                    </button>
                    <ul
                      class="form-check collapse list-unstyled"
                      id="watersource-layer-set"
                    >
                      <li
                        class="mb-1"
                        v-for="overlay in mapStore.waterSourceLayers"
                        :key="overlay.name"
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
                      </li>
                    </ul>
                  </li>
                  <li class="mb-1">
                    <button
                      class="btn btn-outline-success btn-layer-set"
                      data-bs-toggle="collapse"
                      data-bs-target="#energysupply-layer-set"
                      aria-expanded="false"
                    >
                      Layer Set: Energy Supply
                    </button>
                    <ul
                      class="form-check list-unstyled collapse"
                      id="energysupply-layer-set"
                    >
                      <li
                        class="mb-1"
                        v-for="overlay in mapStore.energySupplyLayers"
                        :key="overlay.name"
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
                      </li>
                    </ul>
                  </li>
                </ul>
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
            v-if="mapStore.shelterLayers.shelterLayer.visible"
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
            v-show="mapStore.shelterLayers.populationLayer.visible"
            aria-expanded="true"
            style="padding-left: 0"
          >
            Shelter Access Population Information
          </button>
          <div class="collapse show" id="shelter-population-collapse">
            <population-sum-chart
              v-if="
                mapStore.shelterLayers.populationLayer.visible &&
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
            v-show="mapStore.healthsiteLayers.healthSitePopulationLayer.visible"
            aria-expanded="true"
            style="padding-left: 0"
          >
            Health Site Access Population Information
          </button>
          <div class="collapse show" id="healthsite-population-collapse">
            <population-sum-chart
              v-if="
                mapStore.healthsiteLayers.healthSitePopulationLayer.visible &&
                mapStore.healthSitePopulation
              "
              :type="populationType.HEALTHSITE"
            ></population-sum-chart>
          </div>
        </li>
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#watersource-population-collapse"
            v-show="mapStore.waterSourceLayers.waterSourcePopulationLayer.visible"
            aria-expanded="true"
            style="padding-left: 0"
          >
            Water Source Catchment Area Population
          </button>
          <div class="collapse show" id="watersource-population-collapse">
            <population-sum-chart
              v-if="
                mapStore.waterSourceLayers.waterSourcePopulationLayer.visible &&
                mapStore.waterSourcePopulation
              "
              :type="populationType.WATERSOURCE"
            ></population-sum-chart>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
