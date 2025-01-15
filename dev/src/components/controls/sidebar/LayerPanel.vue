<script lang="ts" setup>
import PopulationSumChart from "@/components/controls/sidebar/PopulationSumChart.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { basemaps, populationType, LayerName } from "@/assets/ts/constants";
import type { IsochroneTypeKey } from "@/assets/ts/types";
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
const selectedIsochroneType = ref<IsochroneTypeKey>("auto");
// Function to change the isochrone type and fetch the corresponding data
const changeIsochroneType = () => {
  mapStore.setIsochroneType(selectedIsochroneType.value);
};
</script>
<template>
  <div class="leaflet-sidebar-pane" id="layer">
    <h1 class="leaflet-sidebar-header">
      {{ $t("sidebar.layerPanel.header") }}
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <language-switcher></language-switcher>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <button
          class="btn btn-toggle rounded ps-0"
          data-bs-toggle="collapse"
          data-bs-target="#layer-control-collapse"
          aria-expanded="true"
        >
          {{ $t("sidebar.layerPanel.control.header") }}
        </button>
        <div class="collapse show ms-1" id="layer-control-collapse">
          <ul class="list-unstyled ps-0">
            <!-- basemaps -->
            <li class="mb-1">
              <button
                class="btn btn-toggle rounded ps-0"
                data-bs-toggle="collapse"
                data-bs-target="#basemap-switch"
                aria-expanded="true"
              >
                {{ $t("sidebar.layerPanel.control.basemaps") }}
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
            <!-- overlays -->
            <li class="mb-1">
              <button
                class="btn btn-toggle rounded ps-0"
                data-bs-toggle="collapse"
                data-bs-target="#overlay-switch"
                aria-expanded="true"
              >
                {{ $t("sidebar.layerPanel.control.overlays") }}
              </button>
              <ul class="list-unstyled ps-0" id="overlay-switch">
                <!-- initial presence layer -->
                <li class="mb-1 form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="mapStore.boundaryLayer.name"
                    :name="mapStore.boundaryLayer.name"
                    v-model="mapStore.boundaryLayer.visible"
                  />
                  <label class="form-check-label" :for="mapStore.boundaryLayer.name">
                    {{ $t("layerNames." + mapStore.boundaryLayer.name) }}
                  </label>
                </li>
                <li class="mb-1 form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="mapStore.vulnerabilityLayer.name"
                    :name="mapStore.vulnerabilityLayer.name"
                    v-model="mapStore.vulnerabilityLayer.visible"
                  />
                  <label
                    class="form-check-label"
                    :for="mapStore.vulnerabilityLayer.name"
                    >{{ $t("layerNames." + mapStore.vulnerabilityLayer.name) }}</label
                  >
                  <div class="form-floating mt-1">
                    <label for="vulnerable-property-select">
                      {{ $t("vulnerability.selectLabel") }}
                    </label>
                    <select
                      id="vulnerable-property-select"
                      class="form-select form-select-sm rounded"
                      v-model="mapStore.selectedVulnerableProperty"
                    >
                      <option
                        v-for="(value, key) in mapStore.geojsonData.vulnerabilityPoint
                          .properties"
                        :key="key"
                        :value="key"
                      >
                        {{ $t("vulnerability.properties." + key) }}
                      </option>
                    </select>
                  </div>
                </li>
                <!-- layer sets -->
                <li class="mb-1">
                  <button
                    class="btn btn-outline-success btn-layer-set"
                    data-bs-toggle="collapse"
                    data-bs-target="#shelter-layer-set"
                    aria-expanded="false"
                  >
                    {{ $t("sidebar.layerPanel.sets.shelter") }}
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
                        {{ $t("layerNames." + overlay.name) }}
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
                    {{ $t("sidebar.layerPanel.sets.healthSite") }}
                  </button>
                  <ul class="form-check collapse list-unstyled" id="healthsite-layer-set">
                    <li
                      class="mb-1"
                      v-for="overlay in mapStore.healthSiteLayers"
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
                        {{ $t("layerNames." + overlay.name) }}
                      </label>
                      <!-- Isochrone switcher for healthSiteIsochroneLayer -->
                      <div
                        v-if="overlay.name === LayerName.HEALTHSITEISOCHRONE"
                        class="form-floating mt-1"
                      >
                        <label for="isochroneType">{{
                          $t("sidebar.layerPanel.healthSiteIsochroneType.label")
                        }}</label>
                        <select
                          v-model="selectedIsochroneType"
                          @change="changeIsochroneType"
                          class="form-select form-select-sm rounded"
                          id="isochroneType"
                          aria-label="Isochrone Type Select"
                        >
                          <option value="auto">
                            {{ $t("sidebar.layerPanel.healthSiteIsochroneType.auto") }}
                          </option>
                          <option value="bus">
                            {{ $t("sidebar.layerPanel.healthSiteIsochroneType.bus") }}
                          </option>
                          <option value="bicycle">
                            {{ $t("sidebar.layerPanel.healthSiteIsochroneType.bicycle") }}
                          </option>
                          <option value="pedestrian">
                            {{
                              $t("sidebar.layerPanel.healthSiteIsochroneType.pedestrian")
                            }}
                          </option>
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
                    {{ $t("sidebar.layerPanel.sets.waterSource") }}
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
                        {{ $t("layerNames." + overlay.name) }}
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
                    {{ $t("sidebar.layerPanel.sets.energySupply") }}
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
                        {{ $t("layerNames." + overlay.name) }}
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
          class="btn btn-toggle rounded collapsed ps-0"
          data-bs-toggle="collapse"
          data-bs-target="#popup-collapse"
          v-show="mapStore.shelterLayers.shelterLayer.visible"
          aria-expanded="true"
        >
          {{ $t("sidebar.layerPanel.popups.sheltersInfo") }}
        </button>
        <div class="collapse show" id="popup-collapse">
          <h6
            v-html="mapStore.popup"
            v-show="mapStore.shelterLayers.shelterLayer.visible"
          ></h6>
        </div>
      </li>
      <li class="mb-1">
        <button
          class="btn btn-toggle rounded collapsed ps-0"
          data-bs-toggle="collapse"
          data-bs-target="#shelter-population-collapse"
          v-show="mapStore.shelterLayers.populationLayer.visible"
          aria-expanded="true"
        >
          {{ $t("sidebar.layerPanel.popups.shelterPopulationInfo") }}
        </button>
        <div class="collapse show" id="shelter-population-collapse">
          <population-sum-chart
            v-if="
              mapStore.shelterLayers.populationLayer.visible && mapStore.shelterPopulation
            "
            :type="populationType.SHELTER"
          ></population-sum-chart>
        </div>
      </li>
      <li class="mb-1">
        <button
          class="btn btn-toggle rounded collapsed ps-0"
          data-bs-toggle="collapse"
          data-bs-target="#healthsite-population-collapse"
          v-show="mapStore.healthSiteLayers.healthSitePopulationLayer.visible"
          aria-expanded="true"
        >
          {{ $t("sidebar.layerPanel.popups.healthSitePopulationInfo") }}
        </button>
        <div class="collapse show" id="healthsite-population-collapse">
          <population-sum-chart
            v-if="
              mapStore.healthSiteLayers.healthSitePopulationLayer.visible &&
              mapStore.healthSitePopulation
            "
            :type="populationType.HEALTHSITE"
          ></population-sum-chart>
        </div>
      </li>
      <li class="mb-1">
        <button
          class="btn btn-toggle rounded collapsed ps-0"
          data-bs-toggle="collapse"
          data-bs-target="#watersource-population-collapse"
          v-show="mapStore.waterSourceLayers.waterSourcePopulationLayer.visible"
          aria-expanded="true"
        >
          {{ $t("sidebar.layerPanel.popups.waterSourcePopulation") }}
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
</template>
<style scoped>
.form-floating label {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  padding: 0.375rem 0 0 0.375rem;
}
</style>
