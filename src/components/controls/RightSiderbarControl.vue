<script setup lang="ts">
import { onMounted, inject } from "vue";
import type { Ref } from "vue";
import type { Layer } from "@/assets/ts/types";
import * as L from "leaflet";
import "leaflet-sidebar-v2/js/leaflet-sidebar.js";
import "leaflet-sidebar-v2/css/leaflet-sidebar.css";
const map = inject<Ref<any>>("map");
const sheltersLayer = inject<Layer>("sheltersLayer");
const boundaryLayer = inject<Layer>("boundaryLayer");
const isochronesLayer = inject<Layer>("isochronesLayer");
const overlays = [sheltersLayer, boundaryLayer, isochronesLayer].filter(
  (layer): layer is Layer => layer !== undefined,
);
onMounted(() => {
  let sidebar = L.control
    .sidebar({
      container: "rightsidebar",
      position: "right",
      closebutton: true,
    })
    .addTo(map!.value.leafletObject)
    .open("layer");
});
</script>
<template>
  <!-- optionally define the sidebar content via HTML markup -->
  <div id="rightsidebar" class="leaflet-sidebar collapsed">
    <!-- nav tabs -->
    <div class="leaflet-sidebar-tabs">
      <!-- top aligned tabs -->
      <ul role="tablist">
        <li>
          <a href="#layer" role="tab" title="Layers Information"
            ><i class="bi bi-stack"></i
          ></a>
        </li>
        <li>
          <a href="#dashboard" role="tab" title="Dashboard"
            ><i class="fa fa-bar-chart"></i
          ></a>
        </li>
      </ul>
      <!-- bottom tabs -->
      <ul role="tablist">
        <li>
          <a href="#settings" title="Settings"><i class="fa fa-gear"></i></a>
        </li>
      </ul>
    </div>
    <!-- panel content -->
    <div class="leaflet-sidebar-content">
      <!-- Layers -->
      <div class="leaflet-sidebar-pane" id="layer">
        <h1 class="leaflet-sidebar-header">
          Layers
          <span class="leaflet-sidebar-close"
            ><i class="fa fa-caret-right"></i
          ></span>
        </h1>
        <div class="layer-control-content" style="margin-top: 10px">
          <ul class="list-unstyled ps-0">
            <li class="mb-1">
              <button
                class="btn btn-toggle rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#layer-control-collapse"
                aria-expanded="true"
                style="padding-left: 0"
              >
                Layer Control
              </button>
              <div
                class="collapse show"
                id="layer-control-collapse"
                style="margin-left: 1em"
              >
                <p>Base Layers</p>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="osm"
                    id="osm"
                    checked
                  />
                  <label class="form-check-label" for="osm">
                    Open Street Map
                  </label>
                </div>
                <div class="border-top my-1"></div>
                <p>Overlays</p>
                <template v-for="overlay in overlays" :key="overlay.name">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :id="overlay.name"
                      :name="overlay.name"
                      v-model="overlay.visible.value"
                    />
                    <label class="form-check-label" :for="overlay.name">
                      {{ overlay.name }}
                    </label>
                  </div>
                </template>
              </div>
            </li>
            <li class="border-top my-3"></li>
            <li class="mb-1">
              <button
                class="btn btn-toggle rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#popup-collapse"
                aria-expanded="true"
                style="padding-left: 0"
              >
                Shelters Information
              </button>
              <div class="collapse show" id="popup-collapse">
                <slot name="popup"></slot>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- Dashboard -->
      <div class="leaflet-sidebar-pane" id="dashboard">
        <h1 class="leaflet-sidebar-header">
          Dashboard
          <span class="leaflet-sidebar-close"
            ><i class="fa fa-caret-right"></i
          ></span>
        </h1>
        <p>
          <code>Leaflet.control.sidebar({ autopan: true })</code>
          makes shure that the map center always stays visible.
        </p>
        <p>
          The autopan behviour is responsive as well. Try opening and closing
          the sidebar from this pane!
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.leaflet-sidebar:not(.collapsed) {
  width: 380px;
}
@media (min-width: 1200px) {
  .leaflet-sidebar-pane {
    min-width: 335px;
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

/* .btn-toggle-nav a {
  display: inline-flex;
  padding: 0.1875rem 0.5rem;
  margin-top: 0.125rem;
  margin-left: 0;
  text-decoration: none;
} */
/* .btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #d2f4ea;
} */
</style>
