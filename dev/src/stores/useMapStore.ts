import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { cities, CityName, LayerName } from "@/assets/ts/constants";
import type { VectorLayer } from "@/assets/ts/types";
import type { FeatureCollection, Point, Polygon, MultiPolygon } from "geojson";
import type {
  ShelterProperties,
  IsochroneProperties,
  PopulationProperties,
} from "@/assets/ts/types";
// Define a common structure for all layer data
type GeoJSONData = {
  shelters?: FeatureCollection<Point, ShelterProperties>;
  boundary?: FeatureCollection<Polygon>;
  isochrones?: FeatureCollection<MultiPolygon, IsochroneProperties>;
  population?: FeatureCollection<MultiPolygon, PopulationProperties>;
};
export const useMapStore = defineStore("city", () => {
  // State
  const map = ref();
  const city = ref(cities[0].name);
  const geojsonData = ref<GeoJSONData>({});
  const isJsonDataLoad = ref<boolean>(false);
  // Cache for all cities' data
  const dataCache = ref<Record<string, GeoJSONData>>({});
  const vectorLayers: Record<string, VectorLayer> = {
    shelterLayer: { name: LayerName.SHELTER, visible: ref(true), color: "orange" },
    boundaryLayer: {
      name: LayerName.BOUNDARY,
      visible: ref(true),
      color: "black",
    },
    isochroneLayer: {
      name: LayerName.ISOCHRONE,
      visible: ref(true),
      range: [1, 2, 3, 4, 5],
    },
    populationLayer: {
      name: LayerName.POPULATION,
      visible: ref(false),
      range: [45, 35, 25, 15, 5],
    },
  };
  // Actions
  const fetchGeoData = async (cityName: CityName) => {
    // Check if data for the city is cached
    if (dataCache.value[cityName]) {
      geojsonData.value = dataCache.value[cityName];
      isJsonDataLoad.value = true;
      return;
    }

    try {
      // Create an array of promises for API requests
      const [shelterRes, boundaryRes, isochroneRes, populationRes] = await Promise.all([
        axios.get(`/api/shelter/${cityName}`),
        axios.get(`/api/boundary/${cityName}`),
        axios.get(`/api/isochrone/${cityName}`),
        axios.get(`/api/population/${cityName}`),
      ]);

      // Assign data to geojsonData
      geojsonData.value = {
        shelters: shelterRes.data,
        boundary: boundaryRes.data,
        isochrones: isochroneRes.data,
        population: populationRes.data,
      };

      // Sort isochrones by range
      geojsonData.value.isochrones?.features.sort(
        (a, b) => b.properties.range - a.properties.range,
      );

      // Cache the fetched data
      dataCache.value[cityName] = geojsonData.value;

      isJsonDataLoad.value = true; // Set loading state to true after all data is loaded
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  // Actions to change city and refetch data
  const setCity = (newCity: CityName) => {
    city.value = newCity;
    fetchGeoData(newCity);
  };

  return {
    map,
    city,
    geojsonData,
    vectorLayers,
    isJsonDataLoad,
    setCity,
    fetchGeoData,
  };
});
