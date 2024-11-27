<script setup lang="ts">
import MapView from "./components/MapView.vue";
</script>

<template>
  <div class="app-container">
    <header class="custom-header">
      <div class="container-fluid d-flex align-items-center justify-content-start gap-5">
        <div class="text-light">
          <h4 class="header-title">ARTUR tool</h4>
          <p class="header-subtitle">Resilience Checker</p>
        </div>
        <div class="input-group search-bar">
          <input
            type="text"
            class="form-control"
            placeholder="Search Address..."
            aria-label="Search"
          />
          <button class="btn btn-primary" type="button">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
    </header>
    <div class="map-container">
      <map-view></map-view>
    </div>
    <footer class="custom-footer">
      <div class="footer-logo-container">
        <img src="/giz_logo.png" alt="GIZLogo" class="footer-logo" />
        <img src="/hcu_logo.png" alt="HCULogo" class="footer-logo" />
        <img src="/dcs-logo.png" alt="DCSLogo" class="footer-logo" />
      </div>
    </footer>
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
  width: 100%;
  padding: 0.5rem 0.625rem 0 0;
  background-color: rgba(70, 70, 70, 0.5);
  z-index: 900;
}
.header-title {
  margin: 0;
  font-size: 1.25rem;
}
.header-subtitle {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}
.search-bar {
  max-width: 18.75rem;
  font-size: 1rem;
}
.search-bar input {
  font-size: 0.875rem;
}
.custom-footer {
  position: fixed;
  bottom: 0;
  left: 5.3125rem;
  width: 100%;
  height: 2.1875rem;
  background-color: transparent;
  z-index: 900;
  display: flex;
  justify-content: start;
  align-items: center;
  pointer-events: none;
}
.footer-logo-container {
  pointer-events: none;
}
.footer-logo {
  height: 1.875rem;
  object-fit: contain;
  opacity: 0.5;
}
</style>
