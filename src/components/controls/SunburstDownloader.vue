<template>
  <div>
    <label for="color-select">Backgroud Color:</label>
    <span>
      <input
        type="color"
        class="form-control form-control-color"
        id="color-select"
        value="#563d7c"
        title="Choose your color"
    /></span>

    <label for="resolution-range">Resolution:</label>
    <span>
      <input
        type="range"
        class="form-range"
        min="1"
        max="10"
        step="1"
        id="resolution-range"
    /></span>

    <div>
      <button class="btn btn-sm btn-primary" style="float: left">
        <i class="bi bi-download"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
<style scoped></style>
