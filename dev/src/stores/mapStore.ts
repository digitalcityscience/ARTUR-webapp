import { defineStore } from "pinia";
import { ref, reactive } from "vue";
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
  const popup = ref<string>("");
  const isochroneType = ref<IsochroneTypeKey>("auto");
  const dataCache = ref<Record<string, GeoJSONData>>({});
  const isochroneCache = ref<Record<string, Record<string, any>>>({});
  const shelterPopulation = ref<Record<string, Population>>({});
  const healthSitePopulation = ref<Record<string, Population>>({});
  const isIsochroneChanged = ref(false);
  // Fetch Data
  const fetchCountrywideData = async () => {
    try {
      const promises: Promise<any>[] = [];
      // promises.push(
      //   fetch("/api/vulnerability")
      //     .then((res) => {
      //       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      //       return res.json();
      //     })
      //     .then((data) => {
      //       geojsonData.value.vulnerabilityPoint = data;
      //     }),
      // );
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
        if (cityName === CityName.KRYVYIRIH) {
          promises.push(
            fetch(`/api/water-network-point/${cityName}`)
              .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
              })
              .then((data) => {
                geojsonData.value.waterNetworkPoint = data;
              }),
          );
          promises.push(
            fetch(`/api/water-network-line/${cityName}`)
              .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
              })
              .then((data) => {
                geojsonData.value.waterNetworkLine = data;
              }),
          );
          promises.push(
            fetch(`/api/water-network-segment`)
              .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
              })
              .then((data) => {
                geojsonData.value.waterNetworkSegment = data;
              }),
          );
        } else {
          promises.push(
            fetch(`/api/sewage-point/nikopol`)
              .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
              })
              .then((data) => {
                geojsonData.value.sewagePoint = data;
              }),
          );
          promises.push(
            fetch(`/api/sewage-line/nikopol`)
              .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
              })
              .then((data) => {
                geojsonData.value.sewageLine = data;
              }),
          );
          promises.push(
            fetch(`/api/stagnent-rainfall-point`)
              .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
              })
              .then((data) => {
                geojsonData.value.floodPoint = data;
              }),
          );
          promises.push(
            fetch(`/api/street-segment`)
              .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
              })
              .then((data) => {
                geojsonData.value.streetHierarchy = data;
              }),
          );
          promises.push(
            fetch(`/api/street-criticality`)
              .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
              })
              .then((data) => {
                geojsonData.value.streetCriticality = data;
              }),
          );
        }
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
  interface RGB {
    r: number;
    g: number;
    b: number;
  }
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
  // Stagnent Rainfall Layer
  const stagnentRainfallLayers = reactive<Record<string, VectorLayer>>({
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
  const getStreetHierachyColor = (fclass: string): string => {
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
    shelterLayers,
    boundaryLayer,
    healthSiteLayers,
    waterNetworkLayers,
    sewageSystemLayers,
    stagnentRainfallLayers,
    selectedWaterScenario,
    setCity,
    fetchCountrywideData,
    setIsochroneType,
    getIsochroneType,
    getWaterNetworkPointColor,
    getRainfallPointColor,
    getStreetCriticalityColor,
    getStreetHierachyColor,
    getMarkerOptions,
    togglePopup,
    highlightPoint,
    resetHighlight,
    boundaryStyle,
  };
});
export default useMapStore;
