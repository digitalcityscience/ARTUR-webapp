<script setup lang="ts">
import { CityName } from "@/assets/ts/constants";
import { cities } from "@/assets/ts/constants";
import useMapStore from "@/stores/mapStore";

const mapStore = useMapStore();
const map = mapStore.map;

// Navigate to the selected city
const btnNaviClick = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const selectedCityName = target.value;
  const city = cities.find((c) => c.name === selectedCityName);

  if (city) {
    map.flyTo(city.latLng, 12);
    mapStore.setCity(city.name);
  }
};
// Check if a city is already selected
const isSelected = (city: CityName) => mapStore.city === city;
// Check if data is available for a city
const hasData = (city: CityName) =>
  city !== CityName.KRYVYIRIH && city !== CityName.NIKOPOL;
</script>

<template>
  <div class="form-group">
    <select id="city-select" class="form-select" @change="btnNaviClick">
      <option value="" disabled selected>Select a city</option>
      <option
        v-for="city in cities"
        :key="city.name"
        :value="city.name"
        :disabled="hasData(city.name)"
        :selected="isSelected(city.name)"
      >
        {{ city.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.form-group .form-select option:disabled {
  background-color: var(--bs-gray-300);
  color: var(--bs-gray-600);
}
.form-select {
  max-width: 300px;
}
</style>
