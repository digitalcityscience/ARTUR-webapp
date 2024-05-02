<script setup>
import { onMounted, inject } from "vue";
const map = inject("map");
onMounted(() => {
  console.log("Right Sidebar is mounted");
  let sidebar = L.control
    .sidebar({
      container: "rightsidebar",
      position: "right",
      closebutton: true,
    })
    .addTo(map.value.leafletObject);
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
      <div class="leaflet-sidebar-pane" id="layer">
        <h1 class="leaflet-sidebar-header">
          Layer Control
          <span class="leaflet-sidebar-close"
            ><i class="fa fa-caret-down"></i
          ></span>
        </h1>
        <p>
          A responsive sidebar for the mapping library
          <a href="https://leafletjs.com/">Leaflet</a>.
        </p>
        <p>Compatible with version 0.7 and 1.x (tested up to 1.6.0)</p>
        <p><b>Select the other panes for a showcase of each feature.</b></p>
        <h2>More examples</h2>
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
</style>
