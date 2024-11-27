<script lang="ts" setup>
import useSidebarStore from "@/stores/sidebarStore";

const sidebarStore = useSidebarStore();
const languages = ["UA", "EN"] as const;
const buttonClass = (lang: "EN" | "UA") =>
  sidebarStore.activeLang === lang
    ? "btn btn-outline-primary active"
    : "btn btn-outline-primary";
</script>
<template>
  <div class="leaflet-sidebar-pane" id="info">
    <h1 class="leaflet-sidebar-header">
      Info
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <div class="btn-group btn-group-sm float-end mt-2">
      <button
        v-for="lang in languages"
        :key="lang"
        :class="buttonClass(lang)"
        @click="sidebarStore.setActiveLang(lang)"
      >
        {{ lang }}
      </button>
    </div>
    <div class="sidebar-content">
      <strong class="sidebar-title">Objective of the tool:</strong>
      <p class="sidebar-content-text">
        The ARTUR Tool has been designed as an interactive platform that serves as a
        resilience checker for Ukrainian cities. The specific tasks within this tool
        include:
      </p>
      <p class="sidebar-content-text">1. Dissect the challenges of a city.</p>
      <p class="sidebar-content-text">
        2. Diagnose the causes and effects of its challenges.
      </p>
      <p class="sidebar-content-text">3. Relate these to specific locations.</p>
      <p class="sidebar-content-text">
        4. Understand poorly performing resilience capacities.
      </p>
      <p class="sidebar-content-text">
        <strong
          >To continue please click "<i class="fa fa-caret-right"> Next</i>"!</strong
        >
      </p>
      <button
        type="button"
        class="btn btn-sm btn-primary float-end"
        @click="sidebarStore.goToSetting()"
      >
        <i class="fa fa-caret-right"> Next</i>
      </button>
    </div>
  </div>
</template>
