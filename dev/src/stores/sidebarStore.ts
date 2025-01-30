import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import * as L from "leaflet";

const useSidebarStore = defineStore("sidebar", () => {
  const { locale } = useI18n();
  const sidebar = ref<L.Control.Sidebar | null>(null);
  const currentStep = ref(1);
  const currentLanguage = ref<"EN" | "УКР">("EN");

  // Methods
  const getSidebar = () => sidebar.value;
  const openPanel = (index: number) => {
    switch (index) {
      case 0:
        sidebar.value!.open("indicator");
        break;
      case 1:
        sidebar.value!.open("data");
        break;
      case 2:
        sidebar.value!.open("dictionary");
        break;
      case 3:
        sidebar.value!.open("document");
      default:
    }
  };
  const openSetting = () => sidebar.value!.open("settings");
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
    currentLanguage,
    openPanel,
    openSetting,
    getSidebar,
    setLanguage,
  };
});
export default useSidebarStore;
