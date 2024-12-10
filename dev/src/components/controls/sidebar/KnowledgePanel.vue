<script lang="ts" setup>
import useSidebarStore from "@/stores/sidebarStore";
import LanguageSwitcher from "./LanguageSwitcher.vue";
const sidebarStore = useSidebarStore();
</script>
<template>
  <div class="leaflet-sidebar-pane" id="knowledge">
    <!-- Start Page -->
    <h1 class="leaflet-sidebar-header">
      {{ $t("sidebar.knowledgePanel.title") }}
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <language-switcher></language-switcher>
    <div class="sidebar-content">
      <strong class="sidebar-title"> {{ $t("sidebar.knowledgePanel.subtitle") }}</strong>
    </div>
  </div>
</template>
