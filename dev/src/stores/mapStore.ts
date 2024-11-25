import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";
import { CityName, LayerName, healthSiteIsochroneType } from "@/assets/ts/constants";
import type { VectorLayer, GeoJSONData, Population } from "@/assets/ts/types";

const useMapStore = defineStore("city", () => {
  // State
  const map = ref();
  const city = ref<CityName | null>(null);
  const zoom = 12;
  const geojsonData = ref<GeoJSONData>({});
  const isJsonDataLoad = ref<boolean>(false);
  const popup = ref<string>("");
  const dataCache = ref<Record<string, GeoJSONData>>({});
  const isochroneCache = ref<Record<string, Record<string, any>>>({});
  const shelterPopulation = ref<Record<string, Population>>({});
  const healthSitePopulation = ref<Record<string, Population>>({});
  const waterSourcePopulation = ref<Record<string, Population>>({});
  const boundaryLayer: VectorLayer = {
    name: LayerName.BOUNDARY,
    visible: ref(true),
    color: "#057dcd",
  };
  const shelterLayers: Record<string, VectorLayer> = {
    shelterLayer: { name: LayerName.SHELTER, visible: ref(false), color: "orange" },
    isochroneLayer: {
      name: LayerName.ISOCHRONE,
      visible: ref(false),
      range: [1, 2, 3, 4, 5],
    },
    populationLayer: {
      name: LayerName.POPULATION,
      visible: ref(false),
      range: [45, 35, 25, 15, 5],
    },
  };
  const healthsiteLayers: Record<string, VectorLayer> = {
    healthSiteLayer: {
      name: LayerName.HEALTHSITEPOINT,
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
  const isochroneType = ref("auto");
  const isIsochroneChanged = ref(false);
  // Track which layers have been loaded per city (excluding isochrones)
  const layerLoaded = ref<Record<string, Record<string, boolean>>>({});
  // Initialize or reset the loading state for the given city
  const resetLayerLoaded = (cityName: string) => {
    layerLoaded.value[cityName] = {
      shelters: false,
      boundary: false,
      isochrones: false,
      population: false,
      healthSitePoint: false,
      healthSitePopualtion: false,
      waterSource: false,
      waterSourceCatchment: false,
      waterSourcePopulation: false,
      energySupply: false,
      energySupplyCatchment: false,
    };
  };
  axios
    .get("/api/country-boundary")
    .then((res) => (geojsonData.value.countryBoundary = res.data));
  const fetchGeoData = async (cityName: CityName, isochroneTypeParam = "") => {
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
      isJsonDataLoad.value = true;
      return;
    }

    try {
      const promises: Promise<any>[] = [];
      // Fetch other city data only if it's not already cached
      if (!dataCache.value[cityName]) {
        promises.push(
          axios.get(`/api/shelter/${cityName}`).then((res) => {
            geojsonData.value.shelters = res.data;
          }),
        );
        promises.push(
          axios.get(`/api/boundary/${cityName}`).then((res) => {
            geojsonData.value.boundary = res.data;
          }),
        );
        promises.push(
          axios.get(`/api/population/${cityName}`).then((res) => {
            geojsonData.value.population = res.data;
            shelterPopulation.value[cityName] = {
              accessible: res.data.properties.accessible,
              inaccessible: res.data.properties.inaccessible,
            };
          }),
        );
        promises.push(
          axios.get(`/api/isochrone/${cityName}`).then((res) => {
            geojsonData.value.isochrones = res.data;
            geojsonData.value.isochrones!.features.sort(
              (a, b) => b.properties.range - a.properties.range,
            );
          }),
        );
        promises.push(
          axios.get(`/api/health-site-point/${cityName}`).then((res) => {
            geojsonData.value.healthSitePoint = res.data;
          }),
        );
        promises.push(
          axios.get(`/api/hospital-auto-population/${cityName}`).then((res) => {
            geojsonData.value.healthSitePopulation = res.data;
            healthSitePopulation.value[cityName] = {
              accessible: res.data.properties.accessible,
              inaccessible: res.data.properties.inaccessible,
            };
          }),
        );
        promises.push(
          axios.get(`/api/water-source/${cityName}`).then((res) => {
            geojsonData.value.waterSourcePoint = res.data;
          }),
        );
        promises.push(
          axios.get(`/api/water-source-catchment/${cityName}`).then((res) => {
            geojsonData.value.waterSourceCatchment = res.data;
            geojsonData.value.waterSourceCatchment!.features.sort(
              (a, b) => b.properties.range - a.properties.range,
            );
          }),
        );
        promises.push(
          axios.get(`/api/water-source-population/${cityName}`).then((res) => {
            geojsonData.value.waterSourcePopulation = res.data;
            waterSourcePopulation.value[cityName] = {
              accessible: res.data.properties.accessible,
              inaccessible: res.data.properties.inaccessible,
            };
          }),
        );
        promises.push(
          axios.get(`/api/energy-supply/${cityName}`).then((res) => {
            geojsonData.value.energySupplyPoint = res.data;
          }),
        );
        promises.push(
          axios.get(`/api/energy-supply-catchment/${cityName}`).then((res) => {
            geojsonData.value.energySupplyCatchment = res.data;
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
          axios
            .get(`/api/health-site-isochrone-${isochroneTypeParam}/${cityName}`)
            .then((res) => {
              geojsonData.value.healthSiteIsochrone = res.data;
              geojsonData.value.healthSiteIsochrone!.features.sort(
                (a, b) => b.properties.range - a.properties.range,
              );

              // Cache the isochrone data for this city and type
              if (!isochroneCache.value[cityName]) {
                isochroneCache.value[cityName] = {};
              }
              isochroneCache.value[cityName][isochroneTypeParam] = res.data;

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

      isJsonDataLoad.value = true;
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const setIsochroneType = (newType: string) => {
    isIsochroneChanged.value = true;
    isochroneType.value = newType;

    // Only fetch the new isochrone data (others remain unchanged)
    if (city.value) fetchGeoData(city.value, newType);
  };

  // Actions to change city and refetch data
  const setCity = (newCity: CityName) => {
    // Reset the layer loading state for the new city
    resetLayerLoaded(newCity);
    city.value = newCity;

    // Fetch all data for the new city
    fetchGeoData(newCity);
  };

  const getIsochroneType = (): string => healthSiteIsochroneType[isochroneType.value];
  watch(city, () => {
    popup.value = "";
  });
  return {
    map,
    city,
    zoom,
    geojsonData,
    popup,
    shelterLayers,
    boundaryLayer,
    healthsiteLayers,
    waterSourceLayers,
    energySupplyLayers,
    isJsonDataLoad,
    shelterPopulation,
    healthSitePopulation,
    waterSourcePopulation,
    setCity,
    setIsochroneType,
    getIsochroneType,
    fetchGeoData,
  };
});
export default useMapStore;
