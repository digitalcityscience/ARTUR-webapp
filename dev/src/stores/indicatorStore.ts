import { defineStore } from "pinia";
import { ref, watch, type Ref } from "vue";

const useIndicatorStore = defineStore("selected indicators", () => {
  const selectedIndicator: Ref<Record<string, string>> = ref({});
  // Initialize BroadcastChannel
  const channel = new BroadcastChannel("indicator-channel");
  let isLocalUpdate = false; // Prevent feedback loops

  // 1. Load the initial state from localStorage
  const loadFromLocalStorage = () => {
    const storedData = localStorage.getItem("selectedIndicators");
    if (storedData) {
      selectedIndicator.value = JSON.parse(storedData);
    }
  };

  // Call it when store is initialized
  loadFromLocalStorage();

  // 2. Watch for changes and sync across windows + persist in localStorage
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
      localStorage.setItem("selectedIndicators", JSON.stringify(newValue));
      isLocalUpdate = false; // Reset the flag after broadcasting
    },
    { deep: true }, // Deep watch to detect changes inside the object
  );

  // 3. Listen for messages from other tabs/windows
  channel.onmessage = (event) => {
    if (event.data && event.data.type === "update-indicator") {
      isLocalUpdate = true; // Set flag to prevent rebroadcasting
      selectedIndicator.value = JSON.parse(event.data.payload); // Sync the data
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
