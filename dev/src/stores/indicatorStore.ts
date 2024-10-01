import { defineStore } from "pinia";
import { ref, watch, type Ref } from "vue";
import { LocalStorageEvent } from "@/assets/ts/constants";

const useIndicatorStore = defineStore("selected indicators", () => {
  const selectedIndicator: Ref<Record<string, string>> = ref({});
  // Initialize BroadcastChannel
  const channel = new BroadcastChannel("indicator-channel");
  let isLocalUpdate = false; // Prevent feedback loops

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

  function addIndicator(name: string, color: string) {
    selectedIndicator.value[name] = color;
  }
  function deleteIndicator(name: string) {
    delete selectedIndicator.value[name];
  }
  return { selectedIndicator, addIndicator, deleteIndicator };
});

export default useIndicatorStore;
