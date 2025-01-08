import { defineStore } from "pinia";
import { ref, watch, type Ref } from "vue";
import { LocalStorageEvent } from "@/assets/ts/constants";
import { useI18n } from "vue-i18n";

const useIndicatorStore = defineStore("selected indicators", () => {
  const { t, locale } = useI18n();
  const selectedIndicator: Ref<Record<string, string>> = ref({});
  // Initialize BroadcastChannel
  const channel = new BroadcastChannel("indicator-channel");
  // Prevent feedback loops
  let isLocalUpdate = false;

  const loadFromLocalStorage = () => {
    const storedData = localStorage.getItem(LocalStorageEvent.UPDATE);
    if (storedData) {
      selectedIndicator.value = JSON.parse(storedData);
    }
  };

  loadFromLocalStorage();

  watch(
    selectedIndicator,
    (newValue) => {
      if (!isLocalUpdate) {
        // Broadcast the changes to other windows
        channel.postMessage({
          type: "update-indicator",
          payload: JSON.stringify(newValue),
        });
      }
      // Always save the changes to localStorage
      localStorage.setItem(LocalStorageEvent.UPDATE, JSON.stringify(newValue));

      isLocalUpdate = false;
    },
    { deep: true },
  );

  channel.onmessage = (event) => {
    if (event.data && event.data.type === "update-indicator") {
      isLocalUpdate = true;
      selectedIndicator.value = JSON.parse(event.data.payload);
    }
  };
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
    "initialIndicators.economic.2.1.name": "#FAC858",
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
  function initializeSelectedIndicator() {
    selectedIndicator.value = Object.fromEntries(
      Object.keys(initialSelection).map((key) => {
        const translatedKey = t(`${key}`);
        return [translatedKey, initialSelection[key]];
      }),
    );
  }
  watch(locale, () => {
    initializeSelectedIndicator(); // Reinitialize the indicators when the locale changes
  });

  function addIndicator(name: string, color: string) {
    selectedIndicator.value[name] = color;
  }
  function deleteIndicator(name: string) {
    delete selectedIndicator.value[name];
  }
  return {
    selectedIndicator,
    addIndicator,
    deleteIndicator,
    initializeSelectedIndicator,
  };
});

export default useIndicatorStore;
