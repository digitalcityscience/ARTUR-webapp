import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import chroma from "chroma-js";
import type {
  VectorLayer,
  GeoJSONData,
  Population,
  IsochroneTypeKey,
} from "@/assets/ts/types";
import { CityName, LayerName } from "@/assets/ts/constants";
import type { Point, Feature } from "geojson";
import type { ShelterProperties } from "@/assets/ts/types";

const useMapStore = defineStore("map", () => {
  // Geojson Data Settings
  const map = ref();
  const city = ref<string | null>(null);
  const zoom = 12;
  const geojsonData = ref<GeoJSONData>({});
  const isJsonDataLoad = ref<boolean>(false);
  // const isSilent = ref(true);
  const popup = ref<string>("");
  const isochroneType = ref<IsochroneTypeKey>("auto");
  const dataCache = ref<Record<string, GeoJSONData>>({});
  const isochroneCache = ref<Record<string, Record<string, any>>>({});
  const shelterPopulation = ref<Record<string, Population>>({});
  const healthSitePopulation = ref<Record<string, Population>>({});
  const waterSourcePopulation = ref<Record<string, Population>>({});
  const isIsochroneChanged = ref(false);
  // Fetch Data
  const fetchCountrywideData = async () => {
    try {
      const promises: Promise<any>[] = [];
      promises.push(
        fetch("/api/vulnerability")
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
          })
          .then((data) => {
            geojsonData.value.vulnerabilityPoint = data;
          }),
      );
      promises.push(
        fetch("/api/country-boundary")
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
          })
          .then((data) => {
            geojsonData.value.countryBoundary = data;
          }),
      );
      await Promise.all(promises);
    } catch (error) {
      console.error("Fail to load initial data: ", error);
    }
  };
  const fetchGeoData = async (cityName: string, isochroneTypeParam = "") => {
    isochroneTypeParam = isochroneType.value;
    // Check if city data is fully cached (including isochrone for the current type)
    if (
      dataCache.value[cityName] &&
      isochroneCache.value[cityName]?.[isochroneTypeParam]
    ) {
      geojsonData.value = {
        ...dataCache.value[cityName],
        healthSiteIsochrone: isochroneCache.value[cityName][isochroneTypeParam],
      };
      return;
    }
    try {
      const promises: Promise<any>[] = [];
      // Fetch other city data only if it's not already cached
      if (!dataCache.value[cityName]) {
        promises.push(
          fetch(`/api/shelter/${cityName}`)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              geojsonData.value.shelters = data;
            }),
        );
        promises.push(
          fetch(`/api/boundary/${cityName}`)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              geojsonData.value.boundary = data;
            }),
        );
        promises.push(
          fetch(`/api/population/${cityName}`)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              geojsonData.value.population = data;
              shelterPopulation.value[cityName] = {
                accessible: data.properties.accessible,
                inaccessible: data.properties.inaccessible,
              };
            }),
        );
        promises.push(
          fetch(`/api/isochrone/${cityName}`)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              geojsonData.value.isochrones = data;
              geojsonData.value.isochrones!.features.sort(
                (a, b) => b.properties.range - a.properties.range,
              );
            }),
        );
        promises.push(
          fetch(`/api/health-site-point/${cityName}`)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              geojsonData.value.healthSitePoint = data;
            }),
        );
        promises.push(
          fetch(`/api/hospital-auto-population/${cityName}`)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              geojsonData.value.healthSitePopulation = data;
              healthSitePopulation.value[cityName] = {
                accessible: data.properties.accessible,
                inaccessible: data.properties.inaccessible,
              };
            }),
        );
        promises.push(
          fetch(`/api/water-source/${cityName}`)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              geojsonData.value.waterSourcePoint = data;
            }),
        );
        promises.push(
          fetch(`/api/water-source-catchment/${cityName}`)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              geojsonData.value.waterSourceCatchment = data;
              geojsonData.value.waterSourceCatchment!.features.sort(
                (a, b) => b.properties.range - a.properties.range,
              );
            }),
        );
        promises.push(
          fetch(`/api/water-source-population/${cityName}`)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              geojsonData.value.waterSourcePopulation = data;
              waterSourcePopulation.value[cityName] = {
                accessible: data.properties.accessible,
                inaccessible: data.properties.inaccessible,
              };
            }),
        );
        promises.push(
          fetch(`/api/energy-supply/${cityName}`)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              geojsonData.value.energySupplyPoint = data;
            }),
        );
        promises.push(
          fetch(`/api/energy-supply-catchment/${cityName}`)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              geojsonData.value.energySupplyCatchment = data;
              geojsonData.value.energySupplyCatchment!.features.sort(
                (a, b) => b.properties.range - a.properties.range,
              );
            }),
        );
        const url =
          cityName === CityName.NIKOPOL
            ? "sewage"
            : CityName.KRYVYIRIH
            ? "water-network"
            : "";
        promises.push(
          fetch(`/api/${url}-point/${cityName}`)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              geojsonData.value.waterNetworkPoint = data;
            }),
        );
        promises.push(
          fetch(`/api/${url}-line/${cityName}`)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              geojsonData.value.waterNetworkLine = data;
            }),
        );
      } else {
        // If city data is cached, load it from the cache
        geojsonData.value = { ...dataCache.value[cityName] };
      }
      // Fetch Health Site isochrone data if not cached for the current city and type
      if (
        !isochroneCache.value[cityName]?.[isochroneTypeParam] ||
        isIsochroneChanged.value
      ) {
        promises.push(
          fetch(`/api/health-site-isochrone-${isochroneTypeParam}/${cityName}`)
            .then((res) => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
            .then((data) => {
              geojsonData.value.healthSiteIsochrone = data;
              geojsonData.value.healthSiteIsochrone!.features.sort(
                (a, b) => b.properties.range - a.properties.range,
              );

              // Cache the isochrone data for this city and type
              if (!isochroneCache.value[cityName]) {
                isochroneCache.value[cityName] = {};
              }
              isochroneCache.value[cityName][isochroneTypeParam] = data;

              isIsochroneChanged.value = false;
            }),
        );
      } else {
        // Load isochrone data from cache if available
        geojsonData.value.healthSiteIsochrone =
          isochroneCache.value[cityName][isochroneTypeParam];
      }
      // Wait for all fetches to complete
      await Promise.all(promises);
      // Cache all non-isochrone data for the city (if not already cached)
      if (!dataCache.value[cityName]) {
        dataCache.value[cityName] = {
          ...geojsonData.value,
        };
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };
  // Actions to change city and refetch data
  const setCity = async (newCity: string) => {
    // Reset the layer loading state for the new city
    isJsonDataLoad.value = false;
    city.value = newCity;
    // Fetch all data for the new city
    await fetchGeoData(newCity);
    isJsonDataLoad.value = true;
    popup.value = "";
  };
  // Get/Set isochrone types
  const setIsochroneType = (newType: IsochroneTypeKey) => {
    isIsochroneChanged.value = true;
    isochroneType.value = newType;
    // Only fetch the new isochrone data (others remain unchanged)
    if (city.value) fetchGeoData(city.value, newType);
  };
  const getIsochroneType = (): string => isochroneType.value;

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
  const waterSourceLayers = reactive<Record<string, VectorLayer>>({
    waterSourceLayer: {
      name: LayerName.WATERSOURCE,
      visible: false,
      color: "#660e60",
    },
    waterSourceCatchmentLayer: {
      name: LayerName.WATERSOURCECATCHMENT,
      visible: false,
      range: [1, 2, 3, 4, 5, 6, 8, 10],
    },
    waterSourcePopulationLayer: {
      name: LayerName.WATERSOURCEPOPULATION,
      visible: false,
      range: [45, 35, 25, 15, 5],
    },
  });
  const energySupplyLayers = reactive<Record<string, VectorLayer>>({
    energySupplyLayer: {
      name: LayerName.ENERGYSUPPLY,
      visible: false,
      color: "red",
    },
    energySupplyCatchmentLayer: {
      name: LayerName.ENERGYSUPPLYCATCHMENT,
      visible: false,
      range: [1, 2, 3, 4, 5, 6, 8, 10],
    },
  });
  /* Water Network layer */
  const waterNetworkLayers = reactive<Record<string, VectorLayer>>({
    waterNetworkPointLayer: {
      name: LayerName.WATERNETWORKPOINT,
      visible: false,
      color: "#c7522a",
      range: [0.1, 0.2, 0.3, 0.4], // Store breaks here
    },
    waterNetworkLineLayer: {
      name: LayerName.WATERNETWORKLINE,
      visible: false,
      color: "#c7522a",
    },
  });
  const selectedWaterScenario = ref(0);
  const getWaterNetworkPointColor = (value: number) => {
    interface RGB {
      r: number;
      g: number;
      b: number;
    }
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
  /* Vulnerability layer */
  const vulnerabilityLayer = reactive<VectorLayer>({
    name: LayerName.VULNERABILITY,
    visible: false,
    range: [], // Store breaks here
  });
  const selectedVulnerableProperty = ref("city_area"); //duration of alarms, hours in 2024
  // calculate class breaks dynamically
  const calculateClassBreaks = (
    minValue: number,
    maxValue: number,
    numClasses: number = 5,
  ): number[] => {
    const breaks: number[] = [];
    const step = (maxValue - minValue) / numClasses;

    for (let i = 0; i <= numClasses; i++) {
      breaks.push(parseFloat((minValue + i * step).toFixed(2))); // Equal interval breaks
    }

    return breaks;
  };
  // assign color based on value and pre-calculated breaks
  const getVulnerabilityColor = (value: number, breaks: number[]): string => {
    let colorRamp = ["#ffcd00", "#f03b20"]; // Default ramp
    // Reverse the ramp for specific property
    if (
      selectedVulnerableProperty.value ===
      "distance from the border with rf / rb / front line"
    )
      colorRamp = [...colorRamp].reverse();

    const colorScale = chroma.scale(colorRamp).classes(breaks);
    // Match the value to its appropriate break range
    for (let i = 0; i < breaks.length - 1; i++) {
      if (value >= breaks[i] && value <= breaks[i + 1]) {
        return colorScale(breaks[i]).hex(); // Return HEX color
      }
    }
    // Default to white if value doesn't fall in any range
    return "#fff";
  };
  function getVulnerabilityRadius(population: number) {
    const minRadius = 3; // Minimum point size
    const maxRadius = 25; // Maximum point size
    const maxPopulation = 2952301; // Largest population in the dataset

    // Normalize the population to the size range
    const size = minRadius + (population / maxPopulation) * (maxRadius - minRadius);
    return Math.round(size);
  }
  const initializeVulnerabilityLayer = (): void => {
    const minValue: number =
      geojsonData.value.vulnerabilityPoint.properties[
        selectedVulnerableProperty.value
      ][0];
    const maxValue: number =
      geojsonData.value.vulnerabilityPoint.properties[
        selectedVulnerableProperty.value
      ][1];
    // Calculate and store breaks in the range
    vulnerabilityLayer.range = calculateClassBreaks(minValue, maxValue, 5); // 5 is default numClasses
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
  const togglePopup = (feature: Feature<Point, ShelterProperties>) => {
    popup.value = feature.properties.description
      ? feature.properties.description
      : feature.properties.name;
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
    map,
    city,
    zoom,
    geojsonData,
    popup,
    isJsonDataLoad,
    shelterPopulation,
    healthSitePopulation,
    waterSourcePopulation,
    shelterLayers,
    boundaryLayer,
    vulnerabilityLayer,
    healthSiteLayers,
    waterSourceLayers,
    energySupplyLayers,
    waterNetworkLayers,
    selectedVulnerableProperty,
    selectedWaterScenario,
    setCity,
    fetchCountrywideData,
    setIsochroneType,
    getIsochroneType,
    getWaterNetworkPointColor,
    getMarkerOptions,
    togglePopup,
    highlightPoint,
    resetHighlight,
    boundaryStyle,
    initializeVulnerabilityLayer,
    getVulnerabilityColor,
    getVulnerabilityRadius,
  };
});
export default useMapStore;
