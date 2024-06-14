<script setup lang="ts">
import MapView from "./components/MapView.vue";
</script>

<template>
  <div class="map-container">
    <map-view></map-view>
  </div>
  <!-- <div class="right-placeholder"></div>
  <div class="bottom-placeholder"></div> -->
</template>

<style scoped>
.map-container {
  flex: 0 0 100%;
  height: 100%;
}
/* .right-placeholder {
  flex: 1;
  height: 60%;
}
.bottom-placeholder {
  flex: 0 0 100%;
  height: 40%;
} */
</style>
