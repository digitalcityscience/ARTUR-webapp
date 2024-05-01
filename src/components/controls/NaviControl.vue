<script setup>
import { LControl } from "@vue-leaflet/vue-leaflet";
// [@vue/compiler-sfc] `defineProps` is a compiler macro and no longer needs to be imported.
// Save the data sent from parent component MapView.vue in props
const props = defineProps({
  map: Object,
  zoom: Number,
  centers: Array,
});
const btnNaviClick = (latLng) => {
  props.map.leafletObject.setView(latLng, props.zoom);
};
</script>

<template>
  <l-control position="topleft">
    <div class="btn-group dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-auto-close="false"
      >
        Navigation
      </button>
      <ul class="dropdown-menu show">
        <template v-for="center in props.centers" :key="center.name">
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click="btnNaviClick(center.latLng)"
            >
              {{ center.name }}
            </a>
          </li>
        </template>
      </ul>
    </div>
  </l-control>
</template>

<style scoped>
.btn-group .dropdown-menu {
  --bs-dropdown-link-hover-bg: var(--bs-gray-500);
}
.btn-group .dropdown-menu a {
  color: black;
}
ul {
  position: absolute;
  will-change: transform;
  top: 0px;
  left: 0px;
  transform: translate3d(0px, 39px, 0px);
}
</style>
