<script lang="ts" setup>
import useSidebarStore from "@/stores/sidebarStore";
import CitySelector from "./CitySelector.vue";
const sidebarStore = useSidebarStore();
</script>
<template>
  <div class="leaflet-sidebar-pane" id="settings">
    <h1 class="leaflet-sidebar-header">
      Settings<span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <div class="info-content"></div>
    <!-- Step 1 -->
    <div
      v-if="sidebarStore.currentStep === 1"
      class="info-content"
      style="margin-top: 80px"
    >
      <strong class="info-title">Step 1</strong>
      <p class="info-content-text" style="margin-top: 30px">
        <strong>Please select your city:</strong>
      </p>
      <city-selector style="margin-bottom: 100px"></city-selector>
    </div>
    <!-- Step 2 -->
    <div
      v-if="sidebarStore.currentStep === 2"
      class="info-content"
      style="margin-top: 80px"
    >
      <strong class="info-title">Step 2</strong>
      <p class="info-content-text">2.</p>
    </div>
    <!-- Step 3 -->
    <div
      v-if="sidebarStore.currentStep === 3"
      class="info-content"
      style="margin-top: 80px"
    >
      <strong class="info-title">Step 3</strong>
      <p class="info-content-text">3.</p>
    </div>
    <!-- Step 4 -->
    <div
      v-if="sidebarStore.currentStep === 4"
      class="info-content"
      style="margin-top: 80px"
    >
      <strong class="info-title">Step 4</strong>
      <p class="info-content-text">You have reached the end.</p>
    </div>
    <button
      type="button"
      class="btn btn-sm btn-success"
      @click="sidebarStore.goToFirstStep"
      style="float: left"
      v-if="sidebarStore.currentStep === 4"
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
        sidebarStore.currentStep < 4 ? " Next" : " Finish"
      }}</i>
    </button>
  </div>
</template>
