import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import * as L from "leaflet";

const useSidebarStore = defineStore("sidebar", () => {
  const { locale } = useI18n();
  const sidebar = ref<L.Control.Sidebar | null>(null);
  const currentStep = ref(1);
  const selectedTopic = ref("");
  const currentLanguage = ref<"EN" | "УКР">("EN");

  // Methods
  const getSidebar = () => sidebar.value;
  const goToSetting = () => sidebar.value!.open("settings");
  const goToNextPage = () =>
    currentStep.value < 3 ? currentStep.value++ : sidebar.value!.open("layer");
  const goToPreviousPage = () =>
    currentStep.value === 1 ? sidebar.value!.open("info") : currentStep.value--;
  const goToFirstStep = () => (currentStep.value = 1);
  // Update the active language and i18n locale
  const setLanguage = (lang: "EN" | "УКР") => {
    currentLanguage.value = lang;
    locale.value = lang == "EN" ? "en" : "ua";
    localStorage.setItem("language", lang);
  };
  return {
    sidebar,
    currentStep,
    selectedTopic,
    currentLanguage,
    goToNextPage,
    goToPreviousPage,
    goToFirstStep,
    goToSetting,
    getSidebar,
    setLanguage,
  };
});
export default useSidebarStore;
