<script lang="ts" setup>
import { computed } from "vue";
import useSidebarStore from "@/stores/sidebarStore";
import useMapStore from "@/stores/mapStore";
import languageSwitcher from "./LanguageSwitcher.vue";
import { cities, CityName } from "@/assets/ts/constants";
import { useI18n } from "vue-i18n";

const sidebarStore = useSidebarStore();
const { locale, getLocaleMessage } = useI18n();
const textData = computed(() => getLocaleMessage(locale.value) as any);
const listData = computed(() => textData.value.sidebar.introductionPanel.usage.list);

const mapStore = useMapStore();
// Cities and topics for dropdowns
const cityOptions = computed(() =>
  cities.map((city) => ({
    name: city.name,
    latLng: city.latLng,
    isDisabled: !(city.name === CityName.KRYVYIRIH || city.name === CityName.NIKOPOL),
    isSelected: mapStore.city === city.name,
  })),
);
// Handle City Change
const handleCityChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const selectedCityName = target.value;
  const city = cities.find((c) => c.name === selectedCityName);

  if (city) {
    mapStore.map.flyTo(city.latLng, 12);
    mapStore.setCity(city.name);
  }
};
</script>
<template>
  <div class="leaflet-sidebar-pane" id="introduction">
    <h1 class="leaflet-sidebar-header">
      {{ $t("sidebar.introductionPanel.header") }}
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <language-switcher></language-switcher>
    <div class="sidebar-content">
      <ul class="list-unstyled ps-0">
        <!-- Description -->
        <li class="mb-1">
          <h6 class="fw-bold">
            {{ $t("sidebar.introductionPanel.description.title") }}
          </h6>
          <p class="sidebar-content-text">
            {{ $t("sidebar.introductionPanel.description.text") }}
          </p>
        </li>
        <!-- City Selection -->
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded ps-0"
            data-bs-toggle="collapse"
            data-bs-target="#city-selector"
            aria-expanded="true"
          >
            {{ $t("sidebar.vulnerabilityPanel.citySelection.title") }}
          </button>
          <div class="collapse show mb-1" id="city-selector">
            <p class="sidebar-content-text fw-medium">
              {{ $t("sidebar.vulnerabilityPanel.citySelection.text") }}
            </p>
            <div class="form-group">
              <select
                id="city-select"
                class="form-select"
                @change="handleCityChange"
                aria-label="Select a city"
              >
                <option value="" disabled selected>
                  {{ $t("sidebar.settingsPanel.step1.selectDefault") }}
                </option>
                <option
                  v-for="city in cityOptions"
                  :key="city.name"
                  :value="city.name"
                  :disabled="city.isDisabled"
                  :selected="city.isSelected"
                >
                  {{ $t("cityNames." + city.name) }}
                </option>
              </select>
            </div>
          </div>
        </li>
        <!-- Usage -->
        <li class="mb-1">
          <ul class="ps-3">
            <li class="my-3">
              {{ $t("sidebar.introductionPanel.usage.suggestion") }}
            </li>
          </ul>
          <h6 class="fw-bold">{{ $t("sidebar.introductionPanel.usage.title") }}</h6>
          <p class="sidebar-content-text fw-semibold">
            {{ $t("sidebar.introductionPanel.usage.subtitle") }}
          </p>
          <ol class="list-group list-group-numbered">
            <li
              v-for="(item, index) in listData"
              :key="index"
              class="list-group-item d-flex justify-content-between align-items-start"
            >
              <div class="ms-2 d-flex justify-content-between align-items-start">
                <div>
                  {{ item.loc.source + " " }}
                </div>
                <div class="ms-1">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-success"
                    @click="sidebarStore.openPanel(index)"
                  >
                    <i class="bi bi-arrow-right-circle"
                      ><span v-if="index == 0">
                        {{ " " + $t("sidebar.indicatorPanel.header") }} </span
                      ><span v-else-if="index == 1">
                        {{ " " + $t("sidebar.dataPanel.header") }} </span
                      ><span v-else-if="index == 2">
                        {{ " " + $t("sidebar.dictionaryPanel.header") }}</span
                      ><span v-else-if="index == 3">
                        {{ " " + $t("sidebar.buttons.documentation") }}</span
                      >
                    </i>
                  </button>
                </div>
              </div>
            </li>
          </ol>
        </li>
      </ul>
    </div>
  </div>
</template>
