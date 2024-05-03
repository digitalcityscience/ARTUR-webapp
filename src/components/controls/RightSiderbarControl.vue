<script setup>
import { onMounted, inject, ref } from "vue";
const map = inject("map");
const sheltersLayer = inject("sheltersLayer");
const boundaryLayer = inject("boundaryLayer");
const isochronesLayer = inject("isochronesLayer");
const overlays = [sheltersLayer, boundaryLayer, isochronesLayer];
onMounted(() => {
  console.log("Right Sidebar is mounted");
  let sidebar = L.control
    .sidebar({
      container: "rightsidebar",
      position: "right",
      closebutton: true,
    })
    .addTo(map.value.leafletObject)
    .open("layer");
});
// Initiallize My Layer Control
const ready = ref(false);
map.value.leafletObject.on("layeradd", () => {
  ready.value = true;
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
          <a href="#layer" role="tab"><i class="bi bi-stack"></i></a>
        </li>
        <li>
          <a href="#dashboard" role="tab"><i class="fa fa-bar-chart"></i></a>
        </li>
      </ul>
      <!-- bottom tabs -->
      <ul role="tablist">
        <li>
          <a href="#settings"><i class="fa fa-gear"></i></a>
        </li>
      </ul>
    </div>
    <!-- panel content -->
    <div class="leaflet-sidebar-content">
      <!-- Layers -->
      <div class="leaflet-sidebar-pane" id="layer">
        <h1 class="leaflet-sidebar-header">
          Layer Control
          <span class="leaflet-sidebar-close"
            ><i class="fa fa-caret-down"></i
          ></span>
        </h1>
        <div class="layer-control-content" style="margin-top: 10px">
          <template v-if="ready">
            <label>
              <span>
                <input type="radio" name="baselayer" :checked="true" />
                <span class="label-text">Open Street Map</span>
              </span>
            </label>
            <template v-for="overlay in overlays" :key="overlay.name">
              <label>
                <span>
                  <input
                    type="checkbox"
                    :name="overlay.name"
                    v-model="overlay.visible.value"
                  />
                  <span class="label-text">{{ overlay.name }}</span>
                </span>
              </label>
            </template>
          </template>
        </div>

        <h2>Shelters' Information</h2>
        <ul>
          <li><a href="./position-right.html">Right aligned</a></li>
          <li>
            <a href="./halfheight.html"
              >The sidebar adapts to map container size</a
            >
          </li>
          <li>
            <a href="./leaflet-0.7.html"
              >Proof that it works with leaflet 0.7</a
            >
          </li>
        </ul>
      </div>
      <!-- Dashboard -->
      <div class="leaflet-sidebar-pane" id="dashboard">
        <h1 class="leaflet-sidebar-header">
          Dashboard
          <span class="leaflet-sidebar-close"
            ><i class="fa fa-caret-down"></i
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
.label-text {
  margin-left: 3px;
}
label {
  display: block;
}
</style>
