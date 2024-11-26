<script lang="ts" setup>
import useSidebarStore from "@/stores/sidebarStore";
const sidebarStore = useSidebarStore();
</script>
<template>
  <div class="leaflet-sidebar-pane" id="knowledge">
    <!-- Start Page -->
    <h1 class="leaflet-sidebar-header">
      Knowledge
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
    <div class="sidebar-content">
      <strong class="sidebar-title">Capacities</strong>
    </div>
  </div>
</template>
