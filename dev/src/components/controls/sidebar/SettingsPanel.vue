<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import useSidebarStore from "@/stores/sidebarStore";
import useMapStore from "@/stores/mapStore";
import { CityName, cities, Challenge } from "@/assets/ts/constants";
import FirstDashboard from "./FirstDashboard.vue";

const sidebarStore = useSidebarStore();
const mapStore = useMapStore();
const map = mapStore.map;
// Reactive summary value
const summary = ref("");
watch(
  () => sidebarStore.selectedTopic,
  (newVal) => {
    summary.value = newVal === "Water" ? Challenge.WATER : Challenge.ENERGY;
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
  { value: "Water" },
  { value: "Energy" },
  { value: "Evacuation", disabled: true },
  { value: "Heating", disabled: true },
  { value: "Ecology", disabled: true },
  { value: "Physical Safety", disabled: true },
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
      Settings
      <button class="leaflet-sidebar-close btn p-0">
        <i class="fa fa-caret-right"></i>
      </button>
    </h1>
    <!-- Step 1 -->
    <div v-if="sidebarStore.currentStep === 1" class="sidebar-content">
      <p class="sidebar-title">Step 1</p>
      <p class="sidebar-content-text">Please select your city:</p>
      <div class="form-group">
        <select
          id="city-select"
          class="form-select"
          @change="handleCityChange"
          aria-label="Select a city"
        >
          <option value="" disabled selected>Select a city</option>
          <option
            v-for="city in cityOptions"
            :key="city.name"
            :value="city.name"
            :disabled="city.isDisabled"
            :selected="city.isSelected"
          >
            {{ city.name }}
          </option>
        </select>
      </div>
    </div>
    <!-- Step 2 -->
    <div v-if="sidebarStore.currentStep === 2" class="sidebar-content">
      <table class="table table-light">
        <tbody>
          <tr>
            <th scope="row">City:</th>
            <td>{{ mapStore.city }}</td>
          </tr>
        </tbody>
      </table>
      <p class="sidebar-title">Step 2</p>
      <p class="sidebar-content-text">
        From the identified types of challenges in this city, please select the one you
        would like to consult. Afterwards, click "<i class="fa fa-caret-right"> Next</i>"!
      </p>
      <div class="form-group pt-3">
        <select
          id="topic-select"
          class="form-select"
          v-model="sidebarStore.selectedTopic"
          aria-label="Select a topic"
        >
          <option value="" disabled selected>Select a topic</option>
          <option
            v-for="topic in topics"
            :key="topic.value"
            :value="topic.value"
            :disabled="topic.disabled"
          >
            {{ topic.value }}
          </option>
        </select>
      </div>
    </div>
    <!-- Step 3 -->
    <div v-if="sidebarStore.currentStep === 3" class="sidebar-content">
      <p class="sidebar-title">Step 3</p>
      <p class="sidebar-content-text">
        Please open the dashboard and then select one type of disruption in the top
        diagram to evaluate in the map. Afterwards, click "<i class="fa fa-caret-right">
          Go to Layer Control</i
        >" to toggle the layers and see more information.
      </p>
      <table class="table table-light">
        <thead>
          <tr>
            <th colspan="2">First Diagnose Dashboard</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">City:</th>
            <td>{{ mapStore.city }}</td>
          </tr>
          <tr>
            <th scope="row">Challenge:</th>
            <td>{{ sidebarStore.selectedTopic }}</td>
          </tr>
          <tr>
            <th scope="row">Summary:</th>
            <td>{{ summary }}</td>
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
          <i class="fa fa-chevron-circle-left"> Go to Step 1</i>
        </button>
        <button
          type="button"
          class="btn btn-sm btn-primary"
          @click="sidebarStore.goToPreviousPage()"
          v-if="sidebarStore.currentStep > 0"
        >
          <i class="fa fa-caret-left"> Back</i>
        </button>
      </div>
      <button
        type="button"
        class="btn btn-sm btn-primary"
        @click="sidebarStore.goToNextPage()"
        v-if="sidebarStore.currentStep > 0"
      >
        <i class="fa fa-caret-right">{{
          sidebarStore.currentStep < 3 ? " Next" : " Go to Layer Control"
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
