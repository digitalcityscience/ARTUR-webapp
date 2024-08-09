<script setup lang="ts">
import { LControl } from "@vue-leaflet/vue-leaflet";
import type { CityData } from "@/assets/ts/types";
import { inject } from "vue";
import type { Ref } from "vue";
import { CityName, InjectionKeyEnum } from "@/assets/ts/constants";

const map = inject<Ref<any>>(InjectionKeyEnum.MAP);
const props = defineProps({
  zoom: Number,
  cities: Array<CityData>,
});
const btnNaviClick = (city: CityData) => {
  map!.value.leafletObject.flyTo(city.latLng, props.zoom);
  selectedCity!.value = city.name;
};
const selectedCity = inject<Ref<CityName>>(InjectionKeyEnum.CITY);
const isSelected = (cityName: CityName) => selectedCity!.value === cityName;
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
        <template v-for="city in props.cities" :key="city.name">
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
