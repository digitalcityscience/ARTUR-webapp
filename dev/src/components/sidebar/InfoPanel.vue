<script lang="ts" setup>
import useSidebarStore from "@/stores/sidebarStore";
const sidebarStore = useSidebarStore();
</script>
<template>
  <div class="leaflet-sidebar-pane" id="info">
    <!-- Start Page -->
    <h1 class="leaflet-sidebar-header">
      Info
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <!-- Language Switch Butoon -->
    <div class="btn-group btn-group-sm" style="float: right; margin-top: 10px">
      <button
        class="btn btn-outline-primary"
        :class="{ active: sidebarStore.activeLang === 'EN' }"
        @click="sidebarStore.setActiveLang('EN')"
      >
        EN
      </button>
      <button
        class="btn btn-outline-primary"
        :class="{ active: sidebarStore.activeLang === 'UA' }"
        @click="sidebarStore.setActiveLang('UA')"
      >
        UA
      </button>
    </div>
    <div class="info-content" style="margin-top: 80px">
      <strong class="info-title">Objective of the tool:</strong>
      <p class="info-content-text">
        The ARTUR Tool has been designed as an interactive platform which serves as a
        resilience checker for Ukrainian cities. The specific tasks within this tool
        include:
      </p>
      <p class="info-content-text">1. Dissect the challenges of a city;</p>
      <p class="info-content-text">
        2. Diagnose the causes and effects of its challenges;
      </p>
      <p class="info-content-text">3. Relate these to specific locations;</p>
      <p class="info-content-text">
        4. Understand which resilience capacities perform poorly, and where are the areas
        of action where measures can be designed for.
      </p>
      <p class="info-content-text">
        <strong
          >To continue please click "<i class="fa fa-caret-right"> Next</i>"!</strong
        >
      </p>
      <button
        type="button"
        class="btn btn-sm btn-primary"
        @click="sidebarStore.goToSetting()"
        style="float: right"
      >
        <i class="fa fa-caret-right"> Next</i>
      </button>
    </div>
  </div>
</template>
