<script lang="ts" setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { basemaps } from "@/assets/ts/constants";

const { locale } = useI18n();
// Basemap Settings
// Track the currently selected base map by its name, default is the first
const selectedBasemap = ref(basemaps[0].name);
// Function to change the visible base map
watch(selectedBasemap, (newBasemap) => {
  basemaps.forEach((basemap) => {
    basemap.visible.value = basemap.name === newBasemap;
  });
});
</script>
<template>
  <div class="leaflet-sidebar-pane" id="settings">
    <!-- Header -->
    <h1 class="leaflet-sidebar-header d-flex justify-content-between align-items-center">
      {{ $t("sidebar.settingsPanel.header") }}
      <button class="leaflet-sidebar-close btn p-0">
        <i class="fa fa-caret-right"></i>
      </button>
    </h1>
    <div class="sidebar-content">
      <ul class="list-unstyled ps-0">
        <li class="mb-1">
          <label class="form-label" for="language-setting-selector">
            <h6>{{ $t("sidebar.settingsPanel.language") }}</h6>
          </label>
          <select class="form-select" id="language-setting-selector" v-model="locale">
            <option value="ua">Українська</option>
            <option value="en">English</option>
          </select>
        </li>
        <!-- basemaps -->
        <li class="mb-1">
          <button
            class="btn btn-toggle rounded ps-0"
            data-bs-toggle="collapse"
            data-bs-target="#basemap-switch"
            aria-expanded="true"
          >
            {{ $t("sidebar.settingsPanel.basemaps") }}
          </button>
          <div class="form-check collapse show" id="basemap-switch">
            <div v-for="basemap in basemaps" :key="basemap.name">
              <input
                class="form-check-input"
                type="radio"
                name="basemap"
                :id="basemap.name"
                :value="basemap.name"
                v-model="selectedBasemap"
              />
              <label class="form-check-label" :for="basemap.name">
                {{ basemap.name }}
              </label>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
.table-light {
  width: 100%;
  margin-top: 15px;
}
</style>
