import { defineStore } from "pinia";
import { ref } from "vue";
import type { GeoJSONData, Population, IsochroneTypeKey } from "@/assets/ts/types";
import { CityName } from "@/assets/ts/constants";

const useGeoDataStore = defineStore("map", () => {
  // Geojson Data Settings
  const map = ref();
  const city = ref<string | null>(null);
  const zoom = 12;
  const geojsonData = ref<GeoJSONData>({});
  const isJsonDataLoad = ref<boolean>(false);
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
            fetch(`/api/stagnant-rainfall-point`)
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
  };
  // Get/Set isochrone types
  const setIsochroneType = (newType: IsochroneTypeKey) => {
    isIsochroneChanged.value = true;
    isochroneType.value = newType;
    // Only fetch the new isochrone data (others remain unchanged)
    if (city.value) fetchGeoData(city.value, newType);
  };
  const getIsochroneType = (): string => isochroneType.value;

  return {
    map,
    city,
    zoom,
    geojsonData,
    isJsonDataLoad,
    shelterPopulation,
    healthSitePopulation,
    setCity,
    fetchCountrywideData,
    setIsochroneType,
    getIsochroneType,
  };
});
export default useGeoDataStore;
