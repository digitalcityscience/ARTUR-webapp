<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import useSidebarStore from "@/stores/sidebarStore";
import useMapStore from "@/stores/mapStore";
import { useI18n } from "vue-i18n";
import { CityName, cities, basemaps } from "@/assets/ts/constants";
import FirstDashboard from "./FirstDashboard.vue";

const { locale } = useI18n();
const sidebarStore = useSidebarStore();
const mapStore = useMapStore();
const map = mapStore.map;
// Reactive summary value
const topic = ref("");
watch(
  () => sidebarStore.selectedTopic,
  (newVal) => {
    topic.value = newVal === "water" ? "water" : "energy";
  },
);
// Cities and topics for dropdowns
const cityOptions = computed(() =>
  cities.map((city) => ({
    name: city.name,
    latLng: city.latLng,
    isDisabled: !(city.name === CityName.KRYVYIRIH || city.name === CityName.NIKOPOL),
    isSelected: mapStore.city === city.name,
  })),
);
const topics = computed(() => [
  { value: "water" },
  { value: "energy" },
  { value: "evacuation", disabled: true },
  { value: "heating", disabled: true },
  { value: "ecology", disabled: true },
  { value: "physicalSafety", disabled: true },
]);
// Event handlers
const handleCityChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const selectedCityName = target.value;
  const city = cities.find((c) => c.name === selectedCityName);

  if (city) {
    map.flyTo(city.latLng, 12);
    mapStore.setCity(city.name);
  }
};
// Basemap Settings
// Track the currently selected base map by its name, default is the first
const selectedBasemap = ref(basemaps[0].name);
// Function to change the visible base map
watch(selectedBasemap, (newBasemap) => {
  basemaps.forEach((basemap) => {
    basemap.visible.value = basemap.name === newBasemap;
  });
});
</script>
<template>
  <div class="leaflet-sidebar-pane" id="settings">
    <!-- Header -->
    <h1 class="leaflet-sidebar-header d-flex justify-content-between align-items-center">
      {{ $t("sidebar.settingsPanel.header") }}
      <button class="leaflet-sidebar-close btn p-0">
        <i class="fa fa-caret-right"></i>
      </button>
    </h1>
    <div class="sidebar-content">
      <ul class="list-unstyled ps-0">
        <li class="mb-1">
          <label class="form-label" for="language-setting-selector">
            <h6>{{ $t("sidebar.settingsPanel.language") }}</h6>
          </label>
          <select class="form-select" id="language-setting-selector" v-model="locale">
            <option value="ua">Українська</option>
            <option value="en">English</option>
          </select>
        </li>
        <!-- basemaps -->
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded ps-0"
            data-bs-toggle="collapse"
            data-bs-target="#basemap-switch"
            aria-expanded="true"
          >
            {{ $t("sidebar.dataPanel.control.basemaps") }}
          </button>
          <div class="form-check collapse show" id="basemap-switch">
            <div v-for="basemap in basemaps" :key="basemap.name">
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
          </div>
        </li>
        <!-- Abandoned -->
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded ps-0"
            data-bs-toggle="collapse"
            data-bs-target="#sidebar-steps"
            aria-expanded="false"
          >
            {{ $t("sidebar.settingsPanel") }}
          </button>
          <div id="sidebar-steps" class="collapse">
            <!-- Step 1 -->
            <div v-if="sidebarStore.currentStep === 1">
              <p class="fw-bold">{{ $t("sidebar.settingsPanel.step1.title") }}</p>
              <p class="sidebar-content-text">
                {{ $t("sidebar.settingsPanel.step1.content") }}
              </p>
              <div class="form-group">
                <select
                  id="city-select"
                  class="form-select"
                  @change="handleCityChange"
                  aria-label="Select a city"
                >
                  <option value="" disabled selected>
                    {{ $t("sidebar.settingsPanel.step1.selectDefault") }}
                  </option>
                  <option
                    v-for="city in cityOptions"
                    :key="city.name"
                    :value="city.name"
                    :disabled="city.isDisabled"
                    :selected="city.isSelected"
                  >
                    {{ $t("cityNames." + city.name) }}
                  </option>
                </select>
              </div>
            </div>
            <!-- Step 2 -->
            <div v-if="sidebarStore.currentStep === 2">
              <table class="table table-light">
                <tbody>
                  <tr>
                    <th scope="row">
                      {{ $t("sidebar.settingsPanel.step3.tableHeaders.city") }}
                    </th>
                    <td>{{ $t("cityNames." + mapStore.city) }}</td>
                  </tr>
                </tbody>
              </table>
              <p class="fw-bold">{{ $t("sidebar.settingsPanel.step2.title") }}</p>
              <p
                class="sidebar-content-text"
                v-html="$t('sidebar.settingsPanel.step2.content')"
              ></p>
              <div class="form-group pt-3">
                <select
                  id="topic-select"
                  class="form-select"
                  v-model="sidebarStore.selectedTopic"
                  aria-label="Select a topic"
                >
                  <option value="" disabled selected>
                    {{ $t("sidebar.settingsPanel.step2.selectDefault") }}
                  </option>
                  <option
                    v-for="topic in topics"
                    :key="topic.value"
                    :value="topic.value"
                    :disabled="topic.disabled"
                  >
                    {{ $t("sidebar.topics." + topic.value) }}
                  </option>
                </select>
              </div>
            </div>
            <!-- Step 3 -->
            <div v-if="sidebarStore.currentStep === 3">
              <p class="fw-bold">{{ $t("sidebar.settingsPanel.step3.title") }}</p>
              <p
                class="sidebar-content-text"
                v-html="$t('sidebar.settingsPanel.step3.content')"
              ></p>
              <table class="table table-light">
                <thead>
                  <tr>
                    <th colspan="2">
                      {{
                        $t("sidebar.settingsPanel.step3.tableHeaders.diagnoseDashboard")
                      }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {{ $t("sidebar.settingsPanel.step3.tableHeaders.city") }}
                    </th>
                    <td>{{ $t("cityNames." + mapStore.city) }}</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ $t("sidebar.settingsPanel.step3.tableHeaders.challenge") }}
                    </th>
                    <td>{{ $t("sidebar.topics." + sidebarStore.selectedTopic) }}</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ $t("sidebar.settingsPanel.step3.tableHeaders.summary") }}
                    </th>
                    <td>{{ $t("sidebar.settingsPanel.step3.summary." + topic) }}</td>
                  </tr>
                </tbody>
              </table>
              <first-dashboard />
            </div>
            <!-- Navigation Buttons -->
            <div class="d-flex justify-content-between mt-3">
              <div>
                <button
                  type="button"
                  class="btn btn-sm btn-success"
                  @click="sidebarStore.openFirstStep"
                  v-if="sidebarStore.currentStep === 3"
                >
                  <i class="fa fa-chevron-circle-left">
                    {{ $t("sidebar.buttons.openStep1") }}</i
                  >
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-primary"
                  @click="sidebarStore.openPreviousPage()"
                  v-if="sidebarStore.currentStep > 0"
                >
                  <i class="fa fa-caret-left">{{ $t("sidebar.buttons.back") }}</i>
                </button>
              </div>
              <button
                type="button"
                class="btn btn-sm btn-primary"
                @click="sidebarStore.openNextPage()"
                v-if="sidebarStore.currentStep > 0"
              >
                <i class="fa fa-caret-right">{{
                  sidebarStore.currentStep < 3
                    ? $t("sidebar.buttons.next")
                    : $t("sidebar.buttons.openLayerControl")
                }}</i>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.form-group .form-select option:disabled {
  background-color: var(--bs-gray-300);
  color: var(--bs-gray-600);
}
.form-select {
  max-width: 300px;
}
.table-light {
  width: 100%;
  margin-top: 15px;
}
</style>
