<script setup lang="ts">
import {
  LGeoJson,
  LCircleMarker,
  LFeatureGroup,
  LTooltip,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import LegendControl from "@/components/controls/LegendControl.vue";
import { getIsochroneColor, getPopulationColor } from "@/assets/ts/functions";
import { LayerName } from "@/assets/ts/constants";
import { onMounted, ref } from "vue";
import useMapStore from "@/stores/mapStore";

// Pinia Store
const mapStore = useMapStore();

// Isochrone Layer Settings
const isochroneStyle = (feature: any) => {
  return {
    fillColor: getIsochroneColor(feature.properties.range, 5),
    fillOpacity: 0.5,
    color: "white",
    weight: 0.5,
    opacity: 1,
  };
};
// Population Layer Settings
const populationStyle = (feature: any) => {
  return {
    fillColor: getPopulationColor(feature.properties.value, feature.properties.access),
    fillOpacity: 0.8,
    color: "white",
    weight: 0.05,
    opacity: 0.95,
  };
};
const onEachFeatureFunction = () => {
  return (feature: any, layer: any) => {
    layer.bindTooltip(`<div>${feature.properties.value}</div>`, {
      permanent: true,
      sticky: true,
    });
  };
};
const populationOptions = {
  onEachFeature: onEachFeatureFunction,
};
// Health Site Point Layer Settings
const healthSiteIsochroneStyle = (feature: any) => {
  return {
    fillColor: getIsochroneColor(feature.properties.range, 10),
    fillOpacity: 0.5,
    color: "white",
    weight: 0.5,
    opacity: 1,
  };
};
const isLayerLoad = ref(false);
onMounted(() => {
  isLayerLoad.value = true;
});
</script>

<template>
  <div class="leaflet.overlay" v-if="mapStore.isJsonDataLoad">
    <!-- Shelters -->
    <l-feature-group
      :name="LayerName.SHELTER"
      layer-type="overlay"
      :visible="mapStore.shelterLayers.shelterLayer.visible as unknown as boolean"
    >
      <l-circle-marker
        pane="markerPane"
        v-for="(feature, index) in mapStore.geojsonData.shelters!.features"
        :key="`${index}-${feature.properties.name}`"
        :name="feature.properties.name"
        :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
        :options="mapStore.getMarkerOptions(mapStore.shelterLayers.shelterLayer.color!)"
        @click="mapStore.togglePopup(feature)"
        @mouseover="mapStore.highlightPoint"
        @mouseout="mapStore.resetHighlight"
        layer-type="overlay"
        ><l-tooltip>
          {{ feature.properties.name }}
        </l-tooltip>
      </l-circle-marker>
    </l-feature-group>
    <!-- Boundary -->
    <l-geo-json
      :name="LayerName.BOUNDARY"
      :geojson="mapStore.geojsonData.boundary"
      :visible="mapStore.boundaryLayer.visible as unknown as boolean"
      layer-type="overlay"
      :options-style="mapStore.boundaryStyle"
      pane="overlayPane"
    ></l-geo-json>
    <!-- Isochrones -->
    <l-geo-json
      :name="LayerName.SHELTERISOCHRONE"
      :geojson="mapStore.geojsonData.isochrones"
      :visible="mapStore.shelterLayers.isochroneLayer.visible as unknown as boolean"
      layer-type="overlay"
      :options-style="isochroneStyle"
      pane="overlayPane"
    ></l-geo-json>
    <!-- Shelter Population -->
    <l-geo-json
      :name="LayerName.SHELTERPOPULATION"
      :geojson="mapStore.geojsonData.population"
      :visible="mapStore.shelterLayers.populationLayer.visible as unknown as boolean"
      layer-type="overlay"
      :options-style="populationStyle"
      pane="overlayPane"
    ></l-geo-json>
    <!-- Health Site Point -->
    <l-feature-group
      :name="LayerName.HEALTHSITE"
      layer-type="overlay"
      :visible="mapStore.healthSiteLayers.healthSiteLayer.visible as unknown as boolean"
    >
      <l-circle-marker
        pane="markerPane"
        v-for="(feature, index) in mapStore.geojsonData.healthSitePoint!.features"
        :key="`${index}-${feature.properties.name}`"
        :lat-lng="[
          feature.geometry.coordinates[0][1],
          feature.geometry.coordinates[0][0],
        ]"
        :options="mapStore.getMarkerOptions(mapStore.healthSiteLayers.healthSiteLayer.color!)"
        @mouseover="mapStore.highlightPoint"
        @mouseout="mapStore.resetHighlight"
        layer-type="overlay"
        ><l-tooltip>{{ feature.properties.amenity }}</l-tooltip>
        <l-popup>{{ feature.properties.name }}</l-popup>
      </l-circle-marker>
    </l-feature-group>
    <!-- Health Site Isochrones -->
    <l-geo-json
      :name="LayerName.HEALTHSITEISOCHRONE"
      :geojson="mapStore.geojsonData.healthSiteIsochrone"
      :visible="mapStore.healthSiteLayers.healthSiteIsochroneLayer.visible as unknown as boolean"
      layer-type="overlay"
      :options-style="healthSiteIsochroneStyle"
      pane="overlayPane"
    ></l-geo-json>
    <!-- Health Site Population -->
    <l-geo-json
      :name="LayerName.HEALTHSITEPOPULATION"
      :geojson="mapStore.geojsonData.healthSitePopulation"
      :visible="mapStore.healthSiteLayers.healthSitePopulationLayer.visible as unknown as boolean"
      layer-type="overlay"
      :options-style="populationStyle"
      :options="populationOptions"
      pane="overlayPane"
    ></l-geo-json>
    <!-- Water Source Point -->
    <l-feature-group
      :name="LayerName.WATERSOURCE"
      layer-type="overlay"
      :visible="mapStore.waterSourceLayers.waterSourceLayer.visible as unknown as boolean"
    >
      <l-circle-marker
        pane="markerPane"
        v-for="(feature, index) in mapStore.geojsonData.waterSourcePoint!.features"
        :key="`${index}-${feature.properties.id}`"
        :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
        :options="mapStore.getMarkerOptions(mapStore.waterSourceLayers.waterSourceLayer.color!)"
        @mouseover="mapStore.highlightPoint"
        @mouseout="mapStore.resetHighlight"
        layer-type="overlay"
        ><l-tooltip> {{ feature.properties.capacity }} m^3 </l-tooltip>
      </l-circle-marker>
    </l-feature-group>
    <!-- Water Source Catchment Area -->
    <l-geo-json
      :name="LayerName.WATERSOURCECATCHMENT"
      :geojson="mapStore.geojsonData.waterSourceCatchment"
      :visible="mapStore.waterSourceLayers.waterSourceCatchmentLayer.visible as unknown as boolean"
      layer-type="overlay"
      :options-style="isochroneStyle"
      pane="overlayPane"
    ></l-geo-json>
    <!-- Water Source Population -->
    <l-geo-json
      :name="LayerName.HEALTHSITEPOPULATION"
      :geojson="mapStore.geojsonData.waterSourcePopulation"
      :visible="mapStore.waterSourceLayers.waterSourcePopulationLayer.visible as unknown as boolean"
      layer-type="overlay"
      :options-style="populationStyle"
      :options="populationOptions"
      pane="overlayPane"
    ></l-geo-json>
    <!-- Energy Supply Point -->
    <l-feature-group
      :name="LayerName.ENERGYSUPPLY"
      layer-type="overlay"
      :visible="mapStore.energySupplyLayers.energySupplyLayer.visible as unknown as boolean"
    >
      <l-circle-marker
        pane="markerPane"
        v-for="(feature, index) in mapStore.geojsonData.energySupplyPoint!.features"
        :key="`${index}-${feature.properties.id}`"
        :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
        :options="
          mapStore.getMarkerOptions(mapStore.energySupplyLayers.energySupplyLayer.color!)
        "
        @mouseover="mapStore.highlightPoint"
        @mouseout="mapStore.resetHighlight"
        layer-type="overlay"
        ><l-tooltip> {{ feature.properties.capacity }} kw </l-tooltip>
      </l-circle-marker>
    </l-feature-group>
    <!-- Energy Supply Catchment Area -->
    <l-geo-json
      :name="LayerName.ENERGYSUPPLYCATCHMENT"
      :geojson="mapStore.geojsonData.energySupplyCatchment"
      :visible="mapStore.energySupplyLayers.energySupplyCatchmentLayer.visible as unknown as boolean"
      layer-type="overlay"
      :options-style="isochroneStyle"
      pane="overlayPane"
    ></l-geo-json>
  </div>
  <legend-control></legend-control>
</template>
