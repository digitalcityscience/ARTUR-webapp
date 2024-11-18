<script setup lang="ts">
import { onMounted } from "vue";
import * as L from "leaflet";
import "leaflet-sidebar-v2/js/leaflet-sidebar.js";
import "leaflet-sidebar-v2/css/leaflet-sidebar.css";
import SidebarTabs from "../sidebar/SidebarTabs.vue";
import InfoPanel from "../sidebar/InfoPanel.vue";
import SettingsPanel from "../sidebar/SettingsPanel.vue";
import DashboardPanel from "../sidebar/DashboardPanel.vue";
import LayerPanel from "../sidebar/LayerPanel.vue";
import useMapStore from "@/stores/mapStore";
import useSidebarStore from "@/stores/sidebarStore";

// Stores
const mapStore = useMapStore();
// Map

const sidebarStore = useSidebarStore();
onMounted(() => {
  sidebarStore.sidebar = L.control
    .sidebar({
      container: "rightsidebar",
      position: "right",
      closebutton: true,
    })
    .addTo(mapStore.map)
    .open("info");
});
</script>
<template>
  <div class="sidebar-container">
    <div id="rightsidebar" class="leaflet-sidebar collapsed">
      <!-- nav tabs -->
      <sidebar-tabs />
      <!-- panel content -->
      <div class="leaflet-sidebar-content">
        <!-- info -->
        <info-panel />
        <!-- Layers -->
        <layer-panel />
        <!-- Dashboard -->
        <dashboard-panel />
        <!-- Settings -->
        <settings-panel />
      </div>
    </div>
  </div>
</template>
<style scoped>
/* .leaflet-sidebar:not(.collapsed) {
  width: 380px;
} */
@media (min-width: 1200px) {
  .leaflet-sidebar-pane {
    min-width: 420px;
  }
}
p {
  margin-bottom: 0;
}
.btn-toggle {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  background-color: transparent;
  border: 0;
}
.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(0, 0, 0, 0.85);
  background-color: #7dbfeb;
}
.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform 0.35s ease;
  transform-origin: 0.5em 50%;
}

.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}
div {
  font-family: var(--bs-font-sans-serif);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2;
}
#indicator-collapse li {
  padding: 5px;
  font-size: 15px;
}
.btn-close {
  right: 0;
}
div.info-content {
  display: block;
}
strong.info-title {
  padding-left: 5px;
  padding-bottom: 10px;
}
p.info-content-text {
  padding-left: 5px;
  padding-top: 5px;
  line-height: 1.5;
}
</style>
