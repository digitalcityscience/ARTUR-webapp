<script lang="ts" setup>
import type { Language } from "@/assets/ts/types";
import useSidebarStore from "@/stores/sidebarStore";

const sidebarStore = useSidebarStore();
const languages = ["УКР", "EN"] as const;
const buttonClass = (lang: Language) =>
  sidebarStore.currentLanguage === lang
    ? "btn btn-outline-primary active"
    : "btn btn-outline-primary";
</script>
<template>
  <div class="btn-group btn-group-sm float-end mt-2">
    <button
      v-for="lang in languages"
      :key="lang"
      :class="buttonClass(lang)"
      @click="sidebarStore.setLanguage(lang)"
    >
      {{ lang }}
    </button>
  </div>
</template>
