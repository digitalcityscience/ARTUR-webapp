import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import axios from "axios";
import { cities, CityName } from "@/assets/ts/constants";
import type { FeatureCollection, Point, Polygon, MultiPolygon } from "geojson";
import type {
  ShelterProperties,
  IsochroneProperties,
  PopulationProperties,
} from "@/assets/ts/types";

export const useMapStore = defineStore("city", () => {
  // State
  const map = ref();
  const city = ref(cities[0].name);
  const shelters = ref() as Ref<FeatureCollection<Point, ShelterProperties>>;
  const boundary = ref() as Ref<FeatureCollection<Polygon>>;
  const isochrones = ref() as Ref<FeatureCollection<MultiPolygon, IsochroneProperties>>;
  const population = ref() as Ref<FeatureCollection<MultiPolygon, PopulationProperties>>;
  const isJsonDataLoad = ref<boolean>(false);

  // Actions
  const fetchGeoData = async (cityName: CityName) => {
    try {
      // Create an array of promises
      const requests = [
        axios.get(`/api/shelter/${cityName}`),
        axios.get(`/api/boundary/${cityName}`),
        axios.get(`/api/isochrone/${cityName}`),
        axios.get(`/api/population/${cityName}`),
      ];

      // Use Promise.all to fetch all data concurrently
      const [shelterRes, boundaryRes, isochroneRes, populationRes] = await Promise.all(
        requests,
      );

      // Assign data to state
      shelters.value = shelterRes.data;
      boundary.value = boundaryRes.data;
      isochrones.value = isochroneRes.data;
      isochrones.value.features.sort((a, b) => b.properties.range - a.properties.range);
      population.value = populationRes.data;

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
    shelters,
    boundary,
    isochrones,
    population,
    isJsonDataLoad,
    setCity,
    fetchGeoData,
  };
});
