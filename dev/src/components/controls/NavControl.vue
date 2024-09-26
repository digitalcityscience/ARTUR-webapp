<script setup lang="ts">
import { LControl } from "@vue-leaflet/vue-leaflet";
import type { CityData } from "@/assets/ts/types";
import { CityName } from "@/assets/ts/constants";
import { useMapStore } from "@/stores/useMapStore";
import { cities } from "@/assets/ts/constants";

const mapStore = useMapStore();
const map = mapStore.map;
const btnNaviClick = (city: CityData) => {
  map.flyTo(city.latLng, 12);
  mapStore.setCity(city.name);
};
const isSelected = (cityName: CityName) => mapStore.city === cityName;
</script>

<template>
  <l-control position="topleft">
    <div class="btn-group dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="true"
        data-bs-auto-close="false"
      >
        <i class="fa fa-crosshairs"></i>
        Cities
      </button>
      <ul class="dropdown-menu show">
        <template v-for="city in cities" :key="city.name">
          <li>
            <button
              class="dropdown-item"
              @click="btnNaviClick(city)"
              :class="{ active: isSelected(city.name) }"
            >
              {{ city.name }}
            </button>
          </li>
        </template>
      </ul>
    </div>
  </l-control>
</template>

<style scoped>
.active {
  background-color: var(--bs-gray-500);
  color: black;
}
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
