import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import * as L from "leaflet";

const useSidebarStore = defineStore("sidebar", () => {
  const { locale } = useI18n();
  const sidebar = ref<L.Control.Sidebar | null>(null);
  const currentStep = ref(1);
  const selectedTopic = ref("");
  const currentLanguage = ref<"EN" | "УКР">("EN");

  // Methods
  const getSidebar = () => sidebar.value;
  const openPanel = (index: number) => {
    switch (index) {
      case 0:
        sidebar.value!.open("dictionary");
        break;
      case 1:
        sidebar.value!.open("vulnerability");
        break;
      case 2:
        sidebar.value!.open("indicator");
        break;
      case 3:
        sidebar.value!.open("data");
        break;
      default:
    }
  };
  const openSetting = () => sidebar.value!.open("settings");
  const openNextPage = () =>
    currentStep.value < 3 ? currentStep.value++ : sidebar.value!.open("data");
  const openPreviousPage = () =>
    currentStep.value === 1 ? sidebar.value!.open("introduction") : currentStep.value--;
  const openFirstStep = () => (currentStep.value = 1);
  // Update the active language and i18n locale
  const setLanguage = (lang: "EN" | "УКР") => {
    currentLanguage.value = lang;
    locale.value = lang == "EN" ? "en" : "ua";
    localStorage.setItem("language", lang);
  };
  watch(locale, (newVal) => {
    currentLanguage.value = newVal === "en" ? "EN" : "УКР";
  });

  return {
    sidebar,
    currentStep,
    selectedTopic,
    currentLanguage,
    openPanel,
    openNextPage,
    openPreviousPage,
    openFirstStep,
    openSetting,
    getSidebar,
    setLanguage,
  };
});
export default useSidebarStore;
