<script lang="ts" setup>
import useSidebarStore from "@/stores/sidebarStore";
import languageSwitcher from "./LanguageSwitcher.vue";

const sidebarStore = useSidebarStore();
</script>
<template>
  <div class="leaflet-sidebar-pane" id="info">
    <h1 class="leaflet-sidebar-header">
      {{ $t("sidebar.InfoPanel.header") }}
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <language-switcher></language-switcher>
    <div class="sidebar-content">
      <strong class="sidebar-title">{{ $t("sidebar.InfoPanel.content.title") }}</strong>
      <p class="sidebar-content-text">
        {{ $t("sidebar.InfoPanel.content.description") }}
      </p>
      <p class="sidebar-content-text">{{ $t("sidebar.InfoPanel.content.step1") }}</p>
      <p class="sidebar-content-text">
        {{ $t("sidebar.InfoPanel.content.step2") }}
      </p>
      <p class="sidebar-content-text">{{ $t("sidebar.InfoPanel.content.step3") }}</p>
      <p class="sidebar-content-text">
        {{ $t("sidebar.InfoPanel.content.step4") }}
      </p>
      <p class="sidebar-content-text">
        <strong
          >{{ $t("sidebar.InfoPanel.content.continue") }} "<i class="fa fa-caret-right">
            {{ $t("sidebar.buttons.next") }}</i
          >"!</strong
        >
      </p>
      <button
        type="button"
        class="btn btn-sm btn-primary float-end"
        @click="sidebarStore.goToSetting()"
      >
        <i class="fa fa-caret-right"> {{ $t("sidebar.buttons.next") }}</i>
      </button>
    </div>
  </div>
</template>
