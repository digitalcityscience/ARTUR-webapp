import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import type { VectorLayer } from "@/assets/ts/types";
import { LayerName } from "@/assets/ts/constants";

interface RGB {
  r: number;
  g: number;
  b: number;
}
const useLayerStore = defineStore("layer", () => {
  // Overlay Visualisation Settings
  const boundaryLayer = reactive<VectorLayer>({
    name: LayerName.BOUNDARY,
    visible: true,
    color: "#057dcd",
  });
  const shelterLayers = reactive<Record<string, VectorLayer>>({
    shelterLayer: {
      name: LayerName.SHELTER,
      visible: false,
      color: "orange",
    },
    isochroneLayer: {
      name: LayerName.SHELTERISOCHRONE,
      visible: false,
      range: [1, 2, 3, 4, 5],
    },
    populationLayer: {
      name: LayerName.SHELTERPOPULATION,
      visible: false,
      range: [45, 35, 25, 15, 5],
    },
  });
  const healthSiteLayers = reactive<Record<string, VectorLayer>>({
    healthSiteLayer: {
      name: LayerName.HEALTHSITE,
      visible: false,
      color: "#EE6666",
    },
    healthSiteIsochroneLayer: {
      name: LayerName.HEALTHSITEISOCHRONE,
      visible: false,
      range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    healthSitePopulationLayer: {
      name: LayerName.HEALTHSITEPOPULATION,
      visible: false,
      range: [45, 35, 25, 15, 5],
    },
  });
  /* Water Network layer */
  const waterNetworkLayers = reactive<Record<string, VectorLayer>>({
    waterNetworkPointLayer: {
      name: LayerName.WATERNETWORKPOINT,
      visible: false,
      range: [0.1, 0.2, 0.3, 0.4], // Store breaks here
    },
    waterNetworkLineLayer: {
      name: LayerName.WATERNETWORKLINE,
      visible: false,
      color: "#c7522a",
    },
    waterNetworkSegmentLayer: {
      name: LayerName.WATERNETWORKSEGMENT,
      visible: false,
      color: "#bdb2ff",
    },
  });
  const selectedWaterScenario = ref(0);
  const getWaterNetworkPointColor = (value: number) => {
    // Define color stops from bottom to top of the scale
    const colorStops: [number, RGB][] = [
      [0.0, { r: 49, g: 54, b: 149 }], // Liquid Denim
      [0.1, { r: 93, g: 226, b: 231 }], // Turquoise
      [0.2, { r: 125, g: 218, b: 88 }], // Fairy Tale Green
      [0.3, { r: 255, g: 222, b: 89 }], // Dragon’s Gold
      [0.4, { r: 210, g: 1, b: 3 }], // Dark Red
      [0.45, { r: 215, g: 48, b: 39 }], // Devilish
    ];
    // Find the color stops between which our value falls
    let lowerStop: [number, RGB] = colorStops[0];
    let upperStop: [number, RGB] = colorStops[colorStops.length - 1];

    for (let i = 0; i < colorStops.length - 1; i++) {
      if (value >= colorStops[i][0] && value <= colorStops[i + 1][0]) {
        lowerStop = colorStops[i];
        upperStop = colorStops[i + 1];
        break;
      }
    }
    // Calculate how far between the two stops our value is (0-1)
    const range = upperStop[0] - lowerStop[0];
    const factor = range === 0 ? 0 : (value - lowerStop[0]) / range;
    // Interpolate between the two colors
    const r = Math.round(lowerStop[1].r + (upperStop[1].r - lowerStop[1].r) * factor);
    const g = Math.round(lowerStop[1].g + (upperStop[1].g - lowerStop[1].g) * factor);
    const b = Math.round(lowerStop[1].b + (upperStop[1].b - lowerStop[1].b) * factor);

    return `rgb(${r}, ${g}, ${b})`;
  };
  // Sewage System Layer
  const sewageSystemLayers = reactive<Record<string, VectorLayer>>({
    sewagePointLayer: {
      name: LayerName.SEWAGEPOINT,
      visible: false,
      color: "#c7522a",
    },
    sewageLineLayer: {
      name: LayerName.SEWAGELINE,
      visible: false,
      color: "#bdb2ff",
    },
  });
  // Stagnant Rainfall Layer
  const stagnantRainfallLayers = reactive<Record<string, VectorLayer>>({
    floodPointLayer: {
      name: LayerName.FLOODPOINT,
      visible: false,
    },
    streetHierarchyLayer: {
      name: LayerName.STREETHIERARCHY,
      visible: false,
      class: ["primary", "secondary", "tertiary", "other"],
    },
    streetCriticalityLayer: {
      name: LayerName.STREETCRITICALITY,
      visible: false,
    },
  });
  const getRainfallPointColor = (value: number) => {
    // Define color stops from bottom to top of the scale
    const colorStops: [number, RGB][] = [
      [3.43, { r: 49, g: 54, b: 149 }], // Liquid Denim
      [4.47, { r: 125, g: 218, b: 88 }], // Fairy Tale Green
      [5.68, { r: 255, g: 222, b: 89 }], // Dragon’s Gold
      [7.28, { r: 254, g: 153, b: 0 }], // Vitamin C
      [10.6, { r: 210, g: 1, b: 3 }], // Dark Red
    ];
    // Find the color stops between which our value falls
    let lowerStop: [number, RGB] = colorStops[0];
    let upperStop: [number, RGB] = colorStops[colorStops.length - 1];

    for (let i = 0; i < colorStops.length - 1; i++) {
      if (value >= colorStops[i][0] && value <= colorStops[i + 1][0]) {
        lowerStop = colorStops[i];
        upperStop = colorStops[i + 1];
        break;
      }
    }
    // Calculate how far between the two stops our value is (0-1)
    const range = upperStop[0] - lowerStop[0];
    const factor = range === 0 ? 0 : (value - lowerStop[0]) / range;
    // Interpolate between the two colors
    const r = Math.round(lowerStop[1].r + (upperStop[1].r - lowerStop[1].r) * factor);
    const g = Math.round(lowerStop[1].g + (upperStop[1].g - lowerStop[1].g) * factor);
    const b = Math.round(lowerStop[1].b + (upperStop[1].b - lowerStop[1].b) * factor);

    return `rgb(${r}, ${g}, ${b})`;
  };
  const getStreetCriticalityColor = (value: number) => {
    // Define color stops from bottom to top of the scale
    const colorStops: [number, RGB][] = [
      [0.29, { r: 49, g: 54, b: 149 }], // Liquid Denim
      [0.71, { r: 125, g: 218, b: 88 }], // Fairy Tale Green
      [0.98, { r: 255, g: 222, b: 89 }], // Dragon’s Gold
      [1.2, { r: 254, g: 153, b: 0 }], // Vitamin C
      [1.56, { r: 210, g: 1, b: 3 }], // Dark Red
    ];
    // Find the color stops between which our value falls
    let lowerStop: [number, RGB] = colorStops[0];
    let upperStop: [number, RGB] = colorStops[colorStops.length - 1];

    for (let i = 0; i < colorStops.length - 1; i++) {
      if (value >= colorStops[i][0] && value <= colorStops[i + 1][0]) {
        lowerStop = colorStops[i];
        upperStop = colorStops[i + 1];
        break;
      }
    }
    // Calculate how far between the two stops our value is (0-1)
    const range = upperStop[0] - lowerStop[0];
    const factor = range === 0 ? 0 : (value - lowerStop[0]) / range;
    // Interpolate between the two colors
    const r = Math.round(lowerStop[1].r + (upperStop[1].r - lowerStop[1].r) * factor);
    const g = Math.round(lowerStop[1].g + (upperStop[1].g - lowerStop[1].g) * factor);
    const b = Math.round(lowerStop[1].b + (upperStop[1].b - lowerStop[1].b) * factor);

    return `rgb(${r}, ${g}, ${b})`;
  };
  const getStreetHierarchyColor = (fclass: string): string => {
    switch (true) {
      case fclass == "primary":
        return "red";
      case fclass == "secondary":
        return "green";
      case fclass == "tertiary":
        return "blue";
      default:
        return "grey";
    }
  };
  // points options
  const getMarkerOptions = (color: string, radius = 5) => {
    return {
      radius: radius,
      fillColor: color,
      color: "white",
      weight: 1,
      opacity: 0.8,
      fillOpacity: 0.8,
    };
  };
  const highlightPoint = (e: any) => {
    e.target.setStyle({
      weight: 3,
      dashArray: "",
      color: "black",
    });
  };
  const resetHighlight = (e: any) => {
    e.target.setStyle({ color: "white", weight: 1 });
  };
  // boundary options
  const boundaryStyle = () => {
    return {
      fillOpacity: 0,
      color: boundaryLayer.color,
    };
  };

  return {
    shelterLayers,
    boundaryLayer,
    healthSiteLayers,
    waterNetworkLayers,
    sewageSystemLayers,
    stagnantRainfallLayers,
    selectedWaterScenario,
    getWaterNetworkPointColor,
    getRainfallPointColor,
    getStreetCriticalityColor,
    getStreetHierarchyColor,
    getMarkerOptions,
    highlightPoint,
    resetHighlight,
    boundaryStyle,
  };
});
export default useLayerStore;
