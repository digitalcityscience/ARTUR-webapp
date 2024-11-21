import { defineStore } from "pinia";
import { ref } from "vue";
import * as L from "leaflet";

const useSidebarStore = defineStore("sidebar", () => {
  const sidebar = ref<L.Control.Sidebar | null>(null);
  const currentStep = ref(1);
  const activeLang = ref<"EN" | "UA">("EN");
  const selectedTopic = ref("");
  // Methods
  const goToSetting = () => sidebar.value!.open("settings");
  const goToNextPage = () =>
    currentStep.value < 3 ? currentStep.value++ : sidebar.value!.open("layer");
  const goToPreviousPage = () =>
    currentStep.value === 1 ? sidebar.value!.open("info") : currentStep.value--;
  const goToFirstStep = () => (currentStep.value = 1);
  const setActiveLang = (lang: "EN" | "UA") => {
    activeLang.value = lang;
    //.....
  };

  return {
    sidebar,
    currentStep,
    activeLang,
    selectedTopic,
    goToNextPage,
    goToPreviousPage,
    goToFirstStep,
    goToSetting,
    setActiveLang,
  };
});
export default useSidebarStore;
