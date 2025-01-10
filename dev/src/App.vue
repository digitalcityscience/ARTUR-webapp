<script setup lang="ts">
import MapView from "./components/MapView.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div class="app-container">
    <header class="custom-header rounded p-0">
      <div class="container-fluid d-flex align-items-center justify-content-start gap-2">
        <div class="header-text text-light text-nowrap rounded px-2 py-1">
          <h4 class="header-title">ARTUR tool</h4>
          <p class="header-subtitle">{{ $t("website.subtitle") }}</p>
        </div>
        <div class="input-group search-bar">
          <input
            type="text"
            class="form-control"
            :placeholder="`${t('website.searchBar')}`"
            aria-label="Search"
          />
          <button class="btn btn-primary" type="button">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <div class="logo-container">
          <img src="/logos.png" alt="logos" class="logo" />
        </div>
      </div>
    </header>
    <div class="map-container">
      <map-view></map-view>
    </div>
  </div>
</template>
<
<style scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100vh;
}
.map-container {
  width: 100%;
  height: 100%;
}
.custom-header {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.5rem 0.625rem 0 0;
  z-index: 900;
}
.header-text {
  background-color: rgba(130, 130, 130, 0.5);
}
.header-title {
  margin: 0;
  font-size: 1.25rem;
}
.header-subtitle {
  margin: 0;
  font-size: 1rem;
}
.search-bar {
  width: 12rem;
  font-size: 1rem;
}
.search-bar input {
  font-size: 0.875rem;
}
.logo-container {
  pointer-events: none;
}
.logo {
  height: 4rem;
  object-fit: contain;
  opacity: 0.6;
}
</style>
