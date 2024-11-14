import { defineStore } from "pinia";
import { ref } from "vue";
import * as L from "leaflet";
import SidebarControl from "@/components/controls/SidebarControl.vue";

const useSidebarStore = defineStore("sidebar", () => {
  const currentStep = ref(1);
  const activeLang = ref<"EN" | "UA">("EN");
  // Methods
  const goToSetting = (sidebar: L.Control.Sidebar) => sidebar.open("settings");
  const goToNextPage = (sidebar: L.Control.Sidebar) =>
    currentStep.value < 4 ? currentStep.value++ : sidebar.open("layer");
  const goToPreviousPage = (sidebar: L.Control.Sidebar) =>
    currentStep.value === 1 ? sidebar.open("home") : currentStep.value--;
  const goToFirstStep = () => (currentStep.value = 1);
  const setActiveLang = (lang: "EN" | "UA") => {
    activeLang.value = lang;
    //.....
  };

  return {
    currentStep,
    activeLang,
    goToNextPage,
    goToPreviousPage,
    goToFirstStep,
    goToSetting,
    setActiveLang,
  };
});
export default useSidebarStore;
