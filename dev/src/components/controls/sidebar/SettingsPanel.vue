<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import useSidebarStore from "@/stores/sidebarStore";
import useMapStore from "@/stores/mapStore";
import { CityName, cities } from "@/assets/ts/constants";
import FirstDashboard from "./FirstDashboard.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";

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
    mapStore.isSilent = false;
    map.flyTo(city.latLng, 12);
    mapStore.setCity(city.name);
  }
};
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
    <language-switcher></language-switcher>
    <!-- Step 1 -->
    <div v-if="sidebarStore.currentStep === 1" class="sidebar-content">
      <p class="sidebar-title">{{ $t("sidebar.settingsPanel.step1.title") }}</p>
      <p class="sidebar-content-text">{{ $t("sidebar.settingsPanel.step1.content") }}</p>
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
    <div v-if="sidebarStore.currentStep === 2" class="sidebar-content">
      <table class="table table-light">
        <tbody>
          <tr>
            <th scope="row">{{ $t("sidebar.settingsPanel.step3.tableHeaders.city") }}</th>
            <td>{{ $t("cityNames." + mapStore.city) }}</td>
          </tr>
        </tbody>
      </table>
      <p class="sidebar-title">{{ $t("sidebar.settingsPanel.step2.title") }}</p>
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
            {{ $t("topics." + topic.value) }}
          </option>
        </select>
      </div>
    </div>
    <!-- Step 3 -->
    <div v-if="sidebarStore.currentStep === 3" class="sidebar-content">
      <p class="sidebar-title">{{ $t("sidebar.settingsPanel.step3.title") }}</p>
      <p
        class="sidebar-content-text"
        v-html="$t('sidebar.settingsPanel.step3.content')"
      ></p>
      <table class="table table-light">
        <thead>
          <tr>
            <th colspan="2">
              {{ $t("sidebar.settingsPanel.step3.tableHeaders.diagnoseDashboard") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{{ $t("sidebar.settingsPanel.step3.tableHeaders.city") }}</th>
            <td>{{ $t("cityNames." + mapStore.city) }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ $t("sidebar.settingsPanel.step3.tableHeaders.challenge") }}
            </th>
            <td>{{ $t("topics." + sidebarStore.selectedTopic) }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ $t("sidebar.settingsPanel.step3.tableHeaders.summary") }}
            </th>
            <td>{{ $t("summary." + topic) }}</td>
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
          @click="sidebarStore.goToFirstStep"
          v-if="sidebarStore.currentStep === 3"
        >
          <i class="fa fa-chevron-circle-left"> {{ $t("sidebar.buttons.goToStep1") }}</i>
        </button>
        <button
          type="button"
          class="btn btn-sm btn-primary"
          @click="sidebarStore.goToPreviousPage()"
          v-if="sidebarStore.currentStep > 0"
        >
          <i class="fa fa-caret-left">{{ $t("sidebar.buttons.back") }}</i>
        </button>
      </div>
      <button
        type="button"
        class="btn btn-sm btn-primary"
        @click="sidebarStore.goToNextPage()"
        v-if="sidebarStore.currentStep > 0"
      >
        <i class="fa fa-caret-right">{{
          sidebarStore.currentStep < 3
            ? $t("sidebar.buttons.next")
            : $t("sidebar.buttons.goToLayerControl")
        }}</i>
      </button>
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
