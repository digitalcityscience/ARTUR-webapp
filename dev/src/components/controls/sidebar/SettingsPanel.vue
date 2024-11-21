<script lang="ts" setup>
import { ref } from "vue";
import useSidebarStore from "@/stores/sidebarStore";
import useMapStore from "@/stores/mapStore";
import CitySelector from "./CitySelector.vue";
import FirstDashboard from "./FirstDashboard.vue";
import { Challenge } from "@/assets/ts/constants";

const sidebarStore = useSidebarStore();
const mapStore = useMapStore();
const summary = ref("");
summary.value =
  sidebarStore.selectedTopic === "Water" ? Challenge.WATER : Challenge.ENERGY;
</script>
<template>
  <div class="leaflet-sidebar-pane" id="settings">
    <h1 class="leaflet-sidebar-header">
      Settings<span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <!-- Step 1 -->
    <div v-if="sidebarStore.currentStep === 1" class="info-content">
      <p class="info-title"><strong>Step 1</strong></p>
      <p class="info-content-text">
        <strong>Please select your city:</strong>
      </p>
      <city-selector
        class="info-content-text"
        style="margin-bottom: 100px"
      ></city-selector>
    </div>
    <!-- Step 2 -->
    <div v-if="sidebarStore.currentStep === 2" class="info-content">
      <table class="table table-light">
        <tbody>
          <tr>
            <th scope="row"><strong>City:</strong></th>
            <td>{{ mapStore.city }}</td>
          </tr>
        </tbody>
      </table>
      <p class="info-title"><strong>Step 2</strong></p>
      <p class="info-content-text">
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
    <div v-if="sidebarStore.currentStep === 3" class="info-content">
      <p class="info-title"><strong>Step 3</strong></p>
      <p class="info-content-text">
        Please open the dashborad and then select one type of disruption in the top
        diagram to evaluate in the map. Afterwards, click "<i class="fa fa-caret-right">
          Go to Layer Control</i
        >" to toggle the layers and see more information.
      </p>
      <table class="table table-light">
        <thead>
          <tr>
            <th colspan="2">
              <strong>First Diagnose Dashboard</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"><strong>City:</strong></th>
            <td>{{ mapStore.city }}</td>
          </tr>
          <tr>
            <th scope="row"><strong>Challenge:</strong></th>
            <td>{{ sidebarStore.selectedTopic }}</td>
          </tr>
          <tr>
            <th scope="row"><strong>Summary:</strong></th>
            <td>{{ summary }}</td>
          </tr>
        </tbody>
      </table>
      <first-dashboard></first-dashboard>
    </div>
    <!-- Step 4 -->
    <!-- <div v-if="sidebarStore.currentStep === 4" class="info-content">
      <p class="info-title"><strong>Step 4</strong></p>
      <p class="info-content-text">You have reached the end.</p>
    </div> -->
    <button
      type="button"
      class="btn btn-sm btn-success"
      @click="sidebarStore.goToFirstStep"
      style="float: left"
      v-if="sidebarStore.currentStep === 3"
    >
      <i class="fa fa-chevron-circle-left"> Go to Step 1</i>
    </button>
    <button
      type="button"
      class="btn btn-sm btn-primary"
      @click="sidebarStore.goToPreviousPage()"
      style="float: left"
      v-if="sidebarStore.currentStep > 0"
    >
      <i class="fa fa-caret-left"> Back</i>
    </button>
    <button
      type="button"
      class="btn btn-sm btn-primary"
      @click="sidebarStore.goToNextPage()"
      style="float: right"
      v-if="sidebarStore.currentStep > 0"
    >
      <i class="fa fa-caret-right">{{
        sidebarStore.currentStep < 3 ? " Next" : " Go to Layer Control"
      }}</i>
    </button>
  </div>
</template>
<style>
.form-group .form-select option:disabled {
  background-color: var(--bs-gray-300);
  color: var(--bs-gray-600);
}
.form-select {
  max-width: 300px;
}
</style>
