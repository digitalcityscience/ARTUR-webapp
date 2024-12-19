import { defineStore } from "pinia";
import { ref, watch, type Ref } from "vue";
import { LocalStorageEvent } from "@/assets/ts/constants";

const useIndicatorStore = defineStore("selected indicators", () => {
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

  function initializeSelectedIndicator() {
    /* Update Need: change the selectedIndicator.value based on the locale language setting */
    selectedIndicator.value = {
      "Safe & affordable housing": "#91CC75",
      "Effective sanitation": "#91CC75",
      "Sufficient affordable food supply": "#91CC75",
      "Grassroots or community organizations participating in pre-event planning and post event response":
        "#91CC75",
      "Public education towards awareness of hazard, risk and disaster information":
        "#91CC75",
      "Risk and resilience training to all sectors of the city including government, business, NGOs and community":
        "#91CC75",
      "Awareness of equipment and supply needed + provision": "#91CC75",
      "Businesses with a documented business continuity plan": "#FAC858",
      "Knowledge to funding opportunities (for local economy and recovery)": "#FAC858",
      "Financial plan and budget for resilience, including contingency funds": "#FAC858",
      "Adequate access to quality healthcare": "#EE6666",
      "Effective emergency response services": "#EE6666",
      "Disaster management authority have sufficient staffing capacity": "#EE6666",
      "Early warning system and reaching level": "#EE6666",
      'Water - potable and Sanitation, Energy, Transport, Communications, Health care: ensured minimal provision for "most severe" disaster scenario':
        "#73C0DE",
      "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others":
        "#73C0DE",
      "Housing destroyed and damaged": "#73C0DE",
      "Critical infrastructure: mapping, planning and protection strategies": "#73C0DE",
      '% of education structures at risk of damage from "most probable" and "most severe" scenarios':
        "#73C0DE",
    };
  }
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
