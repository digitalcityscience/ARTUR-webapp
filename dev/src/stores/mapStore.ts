import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  VectorLayer,
  GeoJSONData,
  Population,
  IsochroneTypeKey,
} from "@/assets/ts/types";
import { LayerName } from "@/assets/ts/constants";
import type { Point, Feature } from "geojson";
import type { ShelterProperties } from "@/assets/ts/types";

const useMapStore = defineStore("map", () => {
  // Geojson Data Settings
  const map = ref();
  const city = ref<string>("");
  const zoom = 12;
  const geojsonData = ref<GeoJSONData>({});
  const isJsonDataLoad = ref<boolean>(false);
  const isSilent = ref(true);
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
        fetch("api/vulnerability")
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
  const boundaryLayer: VectorLayer = {
    name: LayerName.BOUNDARY,
    visible: ref(true),
    color: "#057dcd",
  };
  const vulnerabilityLayer: VectorLayer = {
    name: LayerName.VULNERABILITY,
    visible: ref(true),
    range: [0.2, 0.4, 0.6, 0.8, 1],
  };
  const shelterLayers: Record<string, VectorLayer> = {
    shelterLayer: {
      name: LayerName.SHELTER,
      visible: ref(false),
      color: "orange",
    },
    isochroneLayer: {
      name: LayerName.SHELTERISOCHRONE,
      visible: ref(false),
      range: [1, 2, 3, 4, 5],
    },
    populationLayer: {
      name: LayerName.SHELTERPOPULATION,
      visible: ref(false),
      range: [45, 35, 25, 15, 5],
    },
  };
  const healthSiteLayers: Record<string, VectorLayer> = {
    healthSiteLayer: {
      name: LayerName.HEALTHSITE,
      visible: ref(false),
      color: "#EE6666",
    },
    healthSiteIsochroneLayer: {
      name: LayerName.HEALTHSITEISOCHRONE,
      visible: ref(false),
      range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    healthSitePopulationLayer: {
      name: LayerName.HEALTHSITEPOPULATION,
      visible: ref(false),
      range: [45, 35, 25, 15, 5],
    },
  };
  const waterSourceLayers: Record<string, VectorLayer> = {
    waterSourceLayer: {
      name: LayerName.WATERSOURCE,
      visible: ref(false),
      color: "#660e60",
    },
    waterSourceCatchmentLayer: {
      name: LayerName.WATERSOURCECATCHMENT,
      visible: ref(false),
      range: [1, 2, 3, 4, 5, 6, 8, 10],
    },
    waterSourcePopulationLayer: {
      name: LayerName.WATERSOURCEPOPULATION,
      visible: ref(false),
      range: [45, 35, 25, 15, 5],
    },
  };
  const energySupplyLayers: Record<string, VectorLayer> = {
    energySupplyLayer: {
      name: LayerName.ENERGYSUPPLY,
      visible: ref(false),
      color: "red",
    },
    energySupplyCatchmentLayer: {
      name: LayerName.ENERGYSUPPLYCATCHMENT,
      visible: ref(false),
      range: [1, 2, 3, 4, 5, 6, 8, 10],
    },
  };
  // Shelter Layer Settings
  // points
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
  // boundary
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
    isSilent,
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
    setCity,
    fetchCountrywideData,
    fetchGeoData,
    setIsochroneType,
    getIsochroneType,
    getMarkerOptions,
    togglePopup,
    highlightPoint,
    resetHighlight,
    boundaryStyle,
  };
});
export default useMapStore;
