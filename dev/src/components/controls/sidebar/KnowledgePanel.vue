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
      <strong class="sidebar-title">Urban Resilience</strong>
      <p class="sidebar-content-text">
        <strong>For which phase of development: </strong>resilience can be understood as a
        constantly changing state of a system. In this sense it can be assessed and
        monitored periodically at different stages of development.
      </p>
      <p class="sidebar-content-text">
        This is especially important when considering as part of the theoretical
        framework, that systems under pressure or failure return to a stable state,
        through the phases of: 1) recovery, 2) adaptation and 3) transformation.
      </p>
      <p class="sidebar-content-text">
        The 9 considered capacities of a resilient urban system can, in this sense, relate
        more strongly to a certain phase, whether it is more relevant to assess in the
        short-term (recovery), in the mid-term (adaptation) or in the long-term
        (transformation).
      </p>
    </div>
  </div>
</template>
