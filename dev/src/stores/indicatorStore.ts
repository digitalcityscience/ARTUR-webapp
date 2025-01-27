import { defineStore } from "pinia";
import { ref, watch, type Ref } from "vue";
import { useI18n } from "vue-i18n";

const useIndicatorStore = defineStore("selected indicators", () => {
  const { t, locale } = useI18n();
  const indicatorType = ref<"basic" | "total">("basic");
  // Watch for changes in indicatorType and update localStorage
  watch(indicatorType, (newValue) => {
    localStorage.setItem("indicatorType", newValue); // Save the updated value to localStorage
  });
  // Initialize the store with the value from localStorage if available
  if (localStorage.getItem("indicatorType")) {
    indicatorType.value = localStorage.getItem("indicatorType") as "basic" | "total";
  }

  const selectedIndicator: Ref<Record<string, string>> = ref({});
  // Initialize the selectedIndicator with translated keys
  const initialSelection: Record<string, string> = {
    "initialIndicators.social.1.1.name": "#91CC75",
    "initialIndicators.social.1.2.name": "#91CC75",
    "initialIndicators.social.1.3.name": "#91CC75",
    "initialIndicators.social.1.4.name": "#91CC75",
    "initialIndicators.social.2.1.name": "#91CC75",
    "initialIndicators.social.3.1.name": "#91CC75",
    "initialIndicators.social.3.2.name": "#91CC75",
    "initialIndicators.social.3.3.name": "#91CC75",
    "initialIndicators.economic.1.1.name": "#FAC858",
    "initialIndicators.economic.1.2.name": "#FAC858",
    "initialIndicators.economic.1.3.name": "#FAC858",
    "initialIndicators.institutional.1.1.name": "#EE6666",
    "initialIndicators.institutional.2.1.name": "#EE6666",
    "initialIndicators.institutional.3.1.name": "#EE6666",
    "initialIndicators.institutional.3.2.name": "#EE6666",
    "initialIndicators.institutional.3.3.name": "#EE6666",
    "initialIndicators.physical.1.1.name": "#73C0DE",
    "initialIndicators.physical.1.2.name": "#73C0DE",
    "initialIndicators.physical.1.3.name": "#73C0DE",
    "initialIndicators.physical.2.1.name": "#73C0DE",
    "initialIndicators.physical.3.1.name": "#73C0DE",
  };
  const reverseMapping: Record<string, string> = {};
  const indicatorEN: Record<string, string> = {};
  Object.keys(initialSelection).filter((key) => {
    indicatorEN[t(`${key}`, 1, { locale: "ua" })] = t(`${key}`, 1, { locale: "en" });
  });
  function initializeSelectedIndicator() {
    selectedIndicator.value = Object.fromEntries(
      Object.keys(initialSelection).map((key) => {
        const translatedKey = t(`${key}`);
        reverseMapping[translatedKey] = key;
        return [translatedKey, initialSelection[key]];
      }),
    );
  }
  watch(locale, () => {
    initializeSelectedIndicator(); // Reinitialize the indicators when the locale changes
  });

  return {
    indicatorEN,
    indicatorType,
    reverseMapping,
    selectedIndicator,
    initializeSelectedIndicator,
  };
});

export default useIndicatorStore;
