<script lang="ts" setup>
import { ref, watch } from "vue";
import useSidebarStore from "@/stores/sidebarStore";
import useMapStore from "@/stores/mapStore";
import { CityName, cities, Challenge } from "@/assets/ts/constants";
import FirstDashboard from "./FirstDashboard.vue";

const sidebarStore = useSidebarStore();
const mapStore = useMapStore();
const map = mapStore.map;
const summary = ref("");
watch(
  () => sidebarStore.selectedTopic,
  (newVal) => {
    summary.value = newVal === "Water" ? Challenge.WATER : Challenge.ENERGY;
  },
);
// City Select bar
// Navigate to the selected city
const btnNaviClick = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const selectedCityName = target.value;
  const city = cities.find((c) => c.name === selectedCityName);

  if (city) {
    map.flyTo(city.latLng, 12);
    mapStore.setCity(city.name);
  }
};
// Check if a city is already selected
const isSelected = (city: CityName) => mapStore.city === city;
// Check if data is available for a city
const hasData = (city: CityName) =>
  city !== CityName.KRYVYIRIH && city !== CityName.NIKOPOL;
</script>
<template>
  <div class="leaflet-sidebar-pane" id="settings">
    <h1 class="leaflet-sidebar-header">
      Settings<span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <!-- Step 1 -->
    <div v-if="sidebarStore.currentStep === 1" class="sidebar-content">
      <p class="sidebar-title">Step 1</p>
      <p class="sidebar-content-text">Please select your city:</p>
      <div class="form-group">
        <select
          id="city-select"
          class="form-select"
          @change="btnNaviClick"
          aria-label="Select a city"
        >
          <option value="" disabled selected>Select a city</option>
          <option
            v-for="city in cities"
            :key="city.name"
            :value="city.name"
            :disabled="hasData(city.name)"
            :selected="isSelected(city.name)"
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
      <div class="form-group" style="padding-top: 20px">
        <select id="city-select" class="form-select" v-model="sidebarStore.selectedTopic">
          <option value="" disabled selected>Select a topic</option>
          <option value="Water">Water</option>
          <option value="Energy">Energy</option>
          <option value="Evacuation" disabled>Evacuation</option>
          <option value="Heating" disabled>Heating</option>
          <option value="Ecology" disabled>Ecology</option>
          <option value="Physical Safety" disabled>Physical Safety</option>
        </select>
      </div>
    </div>
    <!-- Step 3 -->
    <div v-if="sidebarStore.currentStep === 3" class="sidebar-content">
      <p class="sidebar-title">Step 3</p>
      <p class="sidebar-content-text">
        Please open the dashborad and then select one type of disruption in the top
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
      <first-dashboard></first-dashboard>
    </div>
    <div class="d-flex justify-content-between">
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
</style>
