<script lang="ts" setup>
import PopulationSumChart from "@/components/controls/sidebar/PopulationSumChart.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { populationType, LayerName, CityName } from "@/assets/ts/constants";
import type { IsochroneTypeKey } from "@/assets/ts/types";
import { ref, computed } from "vue";
import useMapStore from "@/stores/mapStore";
import { useI18n } from "vue-i18n";

const mapStore = useMapStore();
const { locale, getLocaleMessage } = useI18n();
const textData = computed(() => getLocaleMessage(locale.value) as any);
const waterNetworkDescription = computed(
  () => textData.value.sidebar.dataPanel.waterNetwork.description,
);
const waterNetworkIntroduction = computed(
  () => textData.value.sidebar.dataPanel.waterNetwork.introduction,
);
// Local state to store the selected isochrone type
const selectedIsochroneType = ref<IsochroneTypeKey>("auto");
const waterNetworkType = computed(() =>
  mapStore.city === CityName.NIKOPOL ? "sewageSystem" : "waterNetworkDistribution",
);
</script>
<template>
  <div class="leaflet-sidebar-pane" id="data">
    <h1 class="leaflet-sidebar-header">
      {{ $t("sidebar.dataPanel.header") }}
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <language-switcher></language-switcher>
    <div class="sidebar-content">
      <ul class="list-unstyled ps-0">
        <!-- overlays -->
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded ps-0"
            data-bs-toggle="collapse"
            data-bs-target="#overlay-switch"
            aria-expanded="true"
          >
            {{ $t("sidebar.dataPanel.control.overlays") }}
          </button>
          <div class="collapse show" id="overlay-switch">
            <ul class="list-unstyled ps-0">
              <!-- Boundary Layer -->
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
              <!-- layer sets -->
              <li class="mb-1">
                <button
                  class="btn btn-outline-success btn-layer-set"
                  data-bs-toggle="collapse"
                  data-bs-target="#shelter-layer-set"
                  aria-expanded="false"
                >
                  {{ $t("sidebar.dataPanel.sets.shelter") }}
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
                  {{ $t("sidebar.dataPanel.sets.healthSite") }}
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
                        $t("sidebar.dataPanel.healthSiteIsochroneType.label")
                      }}</label>
                      <select
                        v-model="selectedIsochroneType"
                        @change="mapStore.setIsochroneType(selectedIsochroneType)"
                        class="form-select form-select-sm rounded"
                        id="isochroneType"
                        aria-label="Isochrone Type Select"
                      >
                        <option value="auto">
                          {{ $t("sidebar.dataPanel.healthSiteIsochroneType.auto") }}
                        </option>
                        <option value="bus">
                          {{ $t("sidebar.dataPanel.healthSiteIsochroneType.bus") }}
                        </option>
                        <option value="bicycle">
                          {{ $t("sidebar.dataPanel.healthSiteIsochroneType.bicycle") }}
                        </option>
                        <option value="pedestrian">
                          {{ $t("sidebar.dataPanel.healthSiteIsochroneType.pedestrian") }}
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
                  {{ $t("sidebar.dataPanel.sets.waterSource") }}
                </button>
                <ul class="form-check collapse list-unstyled" id="watersource-layer-set">
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
                  {{ $t("sidebar.dataPanel.sets.energySupply") }}
                </button>
                <ul class="form-check list-unstyled collapse" id="energysupply-layer-set">
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
              <li class="mb-1" v-if="mapStore.city === CityName.KRYVYIRIH">
                <button
                  class="btn btn-outline-success btn-layer-set"
                  data-bs-toggle="collapse"
                  data-bs-target="#waterNetwork-layer-set"
                  aria-expanded="false"
                >
                  {{ $t(`sidebar.dataPanel.sets.${waterNetworkType}`) }}
                </button>
                <ul class="form-check list-unstyled collapse" id="waterNetwork-layer-set">
                  <li
                    class="mb-1"
                    :key="mapStore.waterNetworkLayers.waterNetworkPointLayer.name"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :id="mapStore.waterNetworkLayers.waterNetworkPointLayer.name"
                      :name="mapStore.waterNetworkLayers.waterNetworkPointLayer.name"
                      v-model="mapStore.waterNetworkLayers.waterNetworkPointLayer.visible"
                    />
                    <label
                      class="form-check-label"
                      :for="mapStore.waterNetworkLayers.waterNetworkPointLayer.name"
                    >
                      {{ $t(`layerNames.waterNetwork`) }}
                    </label>
                  </li>
                  <!-- Scenario Switcher -->
                  <li class="mb-1">
                    <div class="form-floating">
                      <label for="water-network-scenario">{{
                        $t("sidebar.dataPanel.waterNetwork.selectScenario")
                      }}</label>
                      <select
                        v-model="mapStore.selectedWaterScenario"
                        class="form-select form-select-sm rounded"
                        id="water-network-scenario"
                        aria-label="water-network-scenario-select"
                      >
                        <option value="0">
                          {{ $t("sidebar.dataPanel.waterNetwork.scenario") }} 0
                        </option>
                        <option value="1">
                          {{ $t("sidebar.dataPanel.waterNetwork.scenario") }} 1
                        </option>
                        <option value="2">
                          {{ $t("sidebar.dataPanel.waterNetwork.scenario") }} 2
                        </option>
                      </select>
                    </div>
                  </li>
                  <!-- Copy Right Info-->
                  <p class="text-secondary m-1" style="font-size: 0.6rem">
                    {{ $t("sidebar.dataPanel.waterNetwork.copyRight") }}
                  </p>
                  <!-- Description -->
                  <li class="mb-1">
                    <!-- Scenario Description -->
                    <ul class="list-unstyled ps-0">
                      <li class="mb-1">
                        <h6
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#sidebar-dataPanel-water-network-scenario-description"
                          aria-expanded="true"
                          class="btn btn-outline-secondary text-uppercase"
                        >
                          {{ waterNetworkDescription.header.loc.source }}
                          {{ mapStore.selectedWaterScenario }}
                        </h6>
                        <ul
                          id="sidebar-dataPanel-water-network-scenario-description"
                          class="collapse show lh-base font-size-sm ps-0"
                        >
                          <li
                            v-for="item in waterNetworkDescription[
                              mapStore.selectedWaterScenario
                            ]"
                          >
                            {{ item.loc.source }}
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <!-- Betweenness Centrality -->
                    <ul class="list-unstyled ps-0">
                      <li class="mb-1">
                        <h6
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#sidebar-dataPanel-water-network-btwcen-intro"
                          aria-expanded="false"
                          class="btn btn-outline-secondary text-uppercase"
                        >
                          {{ waterNetworkIntroduction.header.loc.source }}
                        </h6>
                        <ul
                          id="sidebar-dataPanel-water-network-btwcen-intro"
                          class="collapse lh-base font-size-sm ps-0"
                        >
                          <li v-for="item in waterNetworkIntroduction.introduction">
                            {{ item.loc.source }}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="mb-1" v-if="mapStore.city === CityName.NIKOPOL">
                <button
                  class="btn btn-outline-success btn-layer-set"
                  data-bs-toggle="collapse"
                  data-bs-target="#sewage-system-layer-set"
                  aria-expanded="false"
                >
                  {{ $t(`sidebar.dataPanel.sets.sewageSystem`) }}
                </button>
                <ul
                  class="form-check list-unstyled collapse"
                  id="sewage-system-layer-set"
                >
                  <li
                    class="mb-1"
                    v-for="overlay in mapStore.sewageSystemLayers"
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
                      {{ $t(`layerNames.${overlay.name}`) }}
                    </label>
                  </li>
                </ul>
              </li>
              <li class="mb-1" v-if="mapStore.city === CityName.NIKOPOL">
                <button
                  class="btn btn-outline-success btn-layer-set"
                  data-bs-toggle="collapse"
                  data-bs-target="#stagnent-rainfall-layer-set"
                  aria-expanded="false"
                >
                  {{ $t(`sidebar.dataPanel.sets.stagnentRainfall`) }}
                </button>
                <div id="stagnent-rainfall-layer-set" class="collapse">
                  <!-- layers -->
                  <ul class="form-check list-unstyled mb-2">
                    <li
                      class="mb-1"
                      v-for="overlay in mapStore.stagnentRainfallLayers"
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
                        {{ $t(`layerNames.${overlay.name}`) }}
                      </label>
                    </li>
                  </ul>
                  <!-- Description -->
                  <ul class="list-unstyled ps-0">
                    <li class="mb-1">
                      <h6
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#sidebar-dataPanel-stagnent-rainfall-analysis-description"
                        aria-expanded="false"
                        class="btn btn-outline-secondary text-uppercase"
                      >
                        {{ $t("sidebar.dataPanel.stagnentRainfall.description") }}
                      </h6>
                      <ul
                        id="sidebar-dataPanel-stagnent-rainfall-analysis-description"
                        class="collapse lh-sm fs-6 ps-0"
                      >
                        <li
                          v-show="mapStore.stagnentRainfallLayers.floodPointLayer.visible"
                        >
                          <strong>{{ $t("layerNames.floodPoint") }}:</strong>
                          {{ $t("sidebar.dataPanel.stagnentRainfall.floodPoint") }}
                        </li>
                        <li
                          v-show="
                            mapStore.stagnentRainfallLayers.streetHierarchyLayer.visible
                          "
                        >
                          <strong>{{ $t("layerNames.streetHierarchy") }}:</strong>
                          {{ $t("sidebar.dataPanel.stagnentRainfall.streetHierarchy") }}
                        </li>
                        <li
                          v-show="
                            mapStore.stagnentRainfallLayers.streetCriticalityLayer.visible
                          "
                        >
                          <strong>{{ $t("layerNames.streetCriticality") }} -</strong>
                          {{ $t("sidebar.dataPanel.stagnentRainfall.streetCriticality") }}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <!-- Shelter's Info -->
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded collapsed ps-0"
            data-bs-toggle="collapse"
            data-bs-target="#popup-collapse"
            v-show="mapStore.shelterLayers.shelterLayer.visible"
            aria-expanded="true"
          >
            {{ $t("sidebar.dataPanel.popups.sheltersInfo") }}
          </button>
          <div class="collapse show" id="popup-collapse">
            <h6
              v-html="mapStore.popup"
              v-show="mapStore.shelterLayers.shelterLayer.visible"
            ></h6>
          </div>
        </li>
        <!-- Chart -->
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded collapsed ps-0"
            data-bs-toggle="collapse"
            data-bs-target="#shelter-population-collapse"
            v-show="mapStore.shelterLayers.populationLayer.visible"
            aria-expanded="true"
          >
            {{ $t("sidebar.dataPanel.popups.shelterPopulationInfo") }}
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
            class="btn btn-toggle rounded collapsed ps-0"
            data-bs-toggle="collapse"
            data-bs-target="#healthsite-population-collapse"
            v-show="mapStore.healthSiteLayers.healthSitePopulationLayer.visible"
            aria-expanded="true"
          >
            {{ $t("sidebar.dataPanel.popups.healthSitePopulationInfo") }}
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
            {{ $t("sidebar.dataPanel.popups.waterSourcePopulation") }}
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
<style scoped>
.form-floating label {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  padding: 0.375rem 0 0 0.375rem;
}
</style>
