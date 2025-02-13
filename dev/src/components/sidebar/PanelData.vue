<script lang="ts" setup>
import PopulationSumChart from "@/components/chart/PopulationSumChart.vue";
import LanguageSwitcher from "../chart/LanguageSwitcher.vue";
import { populationType, LayerName, CityName } from "@/assets/ts/constants";
import type { IsochroneTypeKey } from "@/assets/ts/types";
import { ref, computed } from "vue";
import useGeoDataStore from "@/stores/geoDataStore";
import useLayerStore from "@/stores/layerStore";
import { useI18n } from "vue-i18n";

const geoDataStore = useGeoDataStore();
const layerStore = useLayerStore();
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
                  :id="layerStore.boundaryLayer.name"
                  :name="layerStore.boundaryLayer.name"
                  v-model="layerStore.boundaryLayer.visible"
                />
                <label class="form-check-label" :for="layerStore.boundaryLayer.name">
                  {{ $t("layerNames." + layerStore.boundaryLayer.name) }}
                </label>
              </li>
              <!-- layer sets -->
              <div v-show="geoDataStore.city != null">
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
                      v-for="overlay in layerStore.shelterLayers"
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
                      v-for="overlay in layerStore.healthSiteLayers"
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
                          @change="geoDataStore.setIsochroneType(selectedIsochroneType)"
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
                            {{
                              $t("sidebar.dataPanel.healthSiteIsochroneType.pedestrian")
                            }}
                          </option>
                        </select>
                      </div>
                    </li>
                  </ul>
                </li>
                <li class="mb-1" v-if="geoDataStore.city === CityName.KRYVYIRIH">
                  <button
                    class="btn btn-outline-success btn-layer-set"
                    data-bs-toggle="collapse"
                    data-bs-target="#waterNetwork-layer-set"
                    aria-expanded="false"
                  >
                    {{ $t(`sidebar.dataPanel.sets.waterNetworkDistribution`) }}
                  </button>
                  <ul
                    class="form-check list-unstyled collapse"
                    id="waterNetwork-layer-set"
                  >
                    <li
                      class="mb-1"
                      :key="layerStore.waterNetworkLayers.waterNetworkPointLayer.name"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :id="layerStore.waterNetworkLayers.waterNetworkPointLayer.name"
                        :name="layerStore.waterNetworkLayers.waterNetworkPointLayer.name"
                        v-model="
                          layerStore.waterNetworkLayers.waterNetworkPointLayer.visible
                        "
                      />
                      <label
                        class="form-check-label"
                        :for="layerStore.waterNetworkLayers.waterNetworkPointLayer.name"
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
                          v-model="layerStore.selectedWaterScenario"
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
                            {{ layerStore.selectedWaterScenario }}
                          </h6>
                          <ul
                            id="sidebar-dataPanel-water-network-scenario-description"
                            class="collapse show lh-base font-size-sm ps-0"
                          >
                            <li
                              v-for="item in waterNetworkDescription[
                                layerStore.selectedWaterScenario
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
                <li class="mb-1" v-if="geoDataStore.city === CityName.NIKOPOL">
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
                      v-for="overlay in layerStore.sewageSystemLayers"
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
                <li class="mb-1" v-if="geoDataStore.city === CityName.NIKOPOL">
                  <button
                    class="btn btn-outline-success btn-layer-set"
                    data-bs-toggle="collapse"
                    data-bs-target="#stagnant-rainfall-layer-set"
                    aria-expanded="false"
                  >
                    {{ $t(`sidebar.dataPanel.sets.stagnantRainfall`) }}
                  </button>
                  <div id="stagnant-rainfall-layer-set" class="collapse">
                    <!-- layers -->
                    <ul class="form-check list-unstyled mb-2">
                      <li
                        class="mb-1"
                        v-for="overlay in layerStore.stagnantRainfallLayers"
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
                          data-bs-target="#sidebar-dataPanel-stagnant-rainfall-analysis-description"
                          aria-expanded="true"
                          class="btn btn-outline-secondary text-uppercase"
                        >
                          {{ $t("sidebar.dataPanel.stagnantRainfall.description") }}
                        </h6>
                        <ul
                          id="sidebar-dataPanel-stagnant-rainfall-analysis-description"
                          class="collapse show lh-sm fs-6 ps-0"
                        >
                          <li
                            v-show="
                              layerStore.stagnantRainfallLayers.floodPointLayer.visible
                            "
                          >
                            <strong>{{ $t("layerNames.floodPoint") }}:</strong>
                            {{ $t("sidebar.dataPanel.stagnantRainfall.floodPoint") }}
                          </li>
                          <li
                            v-show="
                              layerStore.stagnantRainfallLayers.streetHierarchyLayer
                                .visible
                            "
                          >
                            <strong>{{ $t("layerNames.streetHierarchy") }}:</strong>
                            {{ $t("sidebar.dataPanel.stagnantRainfall.streetHierarchy") }}
                          </li>
                          <li
                            v-show="
                              layerStore.stagnantRainfallLayers.streetCriticalityLayer
                                .visible
                            "
                          >
                            <strong>{{ $t("layerNames.streetCriticality") }} -</strong>
                            {{
                              $t("sidebar.dataPanel.stagnantRainfall.streetCriticality")
                            }}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </li>
        <!-- Chart -->
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded collapsed ps-0"
            data-bs-toggle="collapse"
            data-bs-target="#shelter-population-collapse"
            v-show="layerStore.shelterLayers.populationLayer.visible"
            aria-expanded="true"
          >
            {{ $t("sidebar.dataPanel.popups.shelterPopulationInfo") }}
          </button>
          <div class="collapse show" id="shelter-population-collapse">
            <population-sum-chart
              v-if="
                layerStore.shelterLayers.populationLayer.visible &&
                geoDataStore.shelterPopulation
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
            v-show="layerStore.healthSiteLayers.healthSitePopulationLayer.visible"
            aria-expanded="true"
          >
            {{ $t("sidebar.dataPanel.popups.healthSitePopulationInfo") }}
          </button>
          <div class="collapse show" id="healthsite-population-collapse">
            <population-sum-chart
              v-if="
                layerStore.healthSiteLayers.healthSitePopulationLayer.visible &&
                geoDataStore.healthSitePopulation
              "
              :type="populationType.HEALTHSITE"
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
