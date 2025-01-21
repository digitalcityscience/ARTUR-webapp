<script lang="ts" setup>
import { computed } from "vue";
import useSidebarStore from "@/stores/sidebarStore";
import languageSwitcher from "./LanguageSwitcher.vue";
import { useI18n } from "vue-i18n";

const sidebarStore = useSidebarStore();
const { locale, getLocaleMessage } = useI18n();
const textData = computed(() => getLocaleMessage(locale.value) as any);
const listData = computed(() => textData.value.sidebar.introductionPanel.usage.list);
</script>
<template>
  <div class="leaflet-sidebar-pane" id="introduction">
    <h1 class="leaflet-sidebar-header">
      {{ $t("sidebar.introductionPanel.header") }}
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <language-switcher></language-switcher>
    <div class="sidebar-content">
      <!-- Description -->
      <div>
        <h6 class="fw-bold">
          {{ $t("sidebar.introductionPanel.description.title") }}
        </h6>
        <p class="sidebar-content-text">
          {{ $t("sidebar.introductionPanel.description.text") }}
        </p>
      </div>
      <!-- Usage -->
      <div>
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
        <p class="sidebar-content-text">
          {{ $t("sidebar.introductionPanel.usage.suggestion") }}
        </p>
      </div>
    </div>
  </div>
</template>
