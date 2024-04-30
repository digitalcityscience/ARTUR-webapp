<script setup>
import { LControl } from "@vue-leaflet/vue-leaflet";
import { defineProps, onMounted } from "vue";
const props = defineProps({
  map: Object,
  zoom: Number,
  centers: Array,
});
// console.log("NaviControl Setup");
// onMounted(() => {
//   console.log("NaviControl Mounted");
// });
const btnNaviClick = (center) => {
  props.map.leafletObject.setView(center, props.zoom);
};
</script>

<template>
  <l-control position="topleft">
    <div class="btn-group dropend">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-auto-close="false"
      >
        Navi
      </button>
      <ul class="dropdown-menu">
        <template v-for="center in props.centers" :key="center.name">
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click="btnNaviClick(center.latLng)"
              type="button"
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
</style>
