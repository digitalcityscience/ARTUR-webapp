<script setup lang="ts">
import {
  LGeoJson,
  LCircleMarker,
  LFeatureGroup,
  LTooltip,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import type { Layer } from "leaflet";
import { watch, computed } from "vue";
import LegendControl from "@/components/controls/LegendControl.vue";
import { getIsochroneColor, getPopulationColor } from "@/assets/ts/functions";
import { CityName, LayerName } from "@/assets/ts/constants";
import useMapStore from "@/stores/mapStore";
import { useI18n } from "vue-i18n";

// Constants
const mapStore = useMapStore();
const { t, locale } = useI18n();
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
const onEachPopulationFeature = (feature: any, layer: Layer) => {
  const content = `<span>${t("legend.population.population")}: ${
    feature.properties.value
  }</span>`;
  layer.bindTooltip(content);
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
// Water Distribution Network
const lineStyle = () => {
  return {
    color: mapStore.waterNetworkLayers.waterNetworkLineLayer.color,
    weight: 5,
    opacity: 0.8,
  };
};
const getWaterNetworkPointColor = (property: any) => {
  if (mapStore.city === CityName.NIKOPOL)
    return mapStore.getMarkerOptions(
      mapStore.waterNetworkLayers.waterNetworkPointLayer.color!,
      4,
    );
  else return mapStore.getMarkerOptions(mapStore.getWaterNetworkPointColor(property), 4);
};
// Create a map to store references to layers by scenario
const scenarioLayerMap = new Map<number, Layer>();
const onEachWaterNetworkLine = (feature: any, layer: Layer) => {
  // Store a reference to the layer by its scenario
  const scenario = feature?.properties?.scenario;
  if (scenario !== undefined) {
    scenarioLayerMap.set(scenario, layer);
  }
  // Customize the content of your popup
  const popupContent = `
    <div style="max-height: 100px" class="overflow-auto">
      <table class="table table-bordered table-striped table-sm mb-0">
        <tbody><tr><th scope="row">${t("legend.waterNetwork.scenario")}</th>
        <td>${scenario}</td></tr>
        <tr><th scope="row">${t("legend.waterNetwork.change")}</th>
        <td>${feature.properties.change}</td></tr>
        </tbody>
      </table>
    </div>`;
  // Bind the popup to the layer
  layer.bindPopup(popupContent);
};
// Watch for changes to the selected scenario and open the corresponding popup
watch(
  () => mapStore.selectedWaterScenario,
  (newScenario) => {
    if (newScenario != 0) {
      // Close all popups first
      scenarioLayerMap.forEach((layer) => layer.closePopup());
      // Open the popup for the selected scenario, if it exists
      const matchingLayer = scenarioLayerMap.get(newScenario);
      if (matchingLayer) {
        matchingLayer.openPopup();
      }
    }
  },
);
</script>
<template>
  <div class="leaflet.overlay" v-if="mapStore.isJsonDataLoad">
    <!-- Shelters -->
    <l-feature-group
      :name="LayerName.SHELTER"
      layer-type="overlay"
      :visible="mapStore.shelterLayers.shelterLayer.visible"
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
      :visible="mapStore.boundaryLayer.visible"
      layer-type="overlay"
      :options-style="mapStore.boundaryStyle"
    ></l-geo-json>
    <!-- Isochrones -->
    <l-geo-json
      :name="LayerName.SHELTERISOCHRONE"
      :geojson="mapStore.geojsonData.isochrones"
      :visible="mapStore.shelterLayers.isochroneLayer.visible"
      layer-type="overlay"
      :options-style="isochroneStyle"
    ></l-geo-json>
    <!-- Shelter Population -->
    <l-geo-json
      :key="locale"
      :name="LayerName.SHELTERPOPULATION"
      :geojson="mapStore.geojsonData.population"
      :visible="mapStore.shelterLayers.populationLayer.visible"
      layer-type="overlay"
      :options-style="populationStyle"
      :options="{ onEachFeature: onEachPopulationFeature }"
    ></l-geo-json>
    <!-- Health Site Point -->
    <l-feature-group
      :name="LayerName.HEALTHSITE"
      layer-type="overlay"
      :visible="mapStore.healthSiteLayers.healthSiteLayer.visible"
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
      :visible="mapStore.healthSiteLayers.healthSiteIsochroneLayer.visible"
      layer-type="overlay"
      :options-style="healthSiteIsochroneStyle"
    ></l-geo-json>
    <!-- Health Site Population -->
    <l-geo-json
      :key="locale"
      :name="LayerName.HEALTHSITEPOPULATION"
      :geojson="mapStore.geojsonData.healthSitePopulation"
      :visible="mapStore.healthSiteLayers.healthSitePopulationLayer.visible"
      layer-type="overlay"
      :options-style="populationStyle"
      :options="{ onEachFeature: onEachPopulationFeature }"
    ></l-geo-json>
    <!-- Water Source Point -->
    <l-feature-group
      :name="LayerName.WATERSOURCE"
      layer-type="overlay"
      :visible="mapStore.waterSourceLayers.waterSourceLayer.visible"
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
      :visible="mapStore.waterSourceLayers.waterSourceCatchmentLayer.visible"
      layer-type="overlay"
      :options-style="isochroneStyle"
    ></l-geo-json>
    <!-- Water Source Population -->
    <l-geo-json
      :key="locale"
      :name="LayerName.HEALTHSITEPOPULATION"
      :geojson="mapStore.geojsonData.waterSourcePopulation"
      :visible="mapStore.waterSourceLayers.waterSourcePopulationLayer.visible"
      layer-type="overlay"
      :options-style="populationStyle"
      :options="{ onEachFeature: onEachPopulationFeature }"
    ></l-geo-json>
    <!-- Energy Supply Point -->
    <l-feature-group
      :name="LayerName.ENERGYSUPPLY"
      layer-type="overlay"
      :visible="mapStore.energySupplyLayers.energySupplyLayer.visible"
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
      :visible="mapStore.energySupplyLayers.energySupplyCatchmentLayer.visible"
      layer-type="overlay"
      :options-style="isochroneStyle"
    ></l-geo-json>
    <!-- KRYVYIRIH Water Network Changes -->
    <l-geo-json
      v-if="mapStore.city === CityName.KRYVYIRIH"
      :name="LayerName.WATERNETWORKLINE"
      :geojson="mapStore.geojsonData.waterNetworkLine"
      :visible="
        mapStore.waterNetworkLayers.waterNetworkPointLayer.visible ||
        mapStore.waterNetworkLayers.waterNetworkLineLayer.visible
      "
      layer-type="overlay"
      :options-style="lineStyle"
      :options="{ onEachFeature: onEachWaterNetworkLine }"
    ></l-geo-json>
    <!-- KRYVYIRIH Water Network Point -->
    <l-feature-group
      :key="mapStore.selectedWaterScenario"
      v-if="mapStore.city === CityName.KRYVYIRIH"
      :name="LayerName.WATERNETWORKPOINT"
      layer-type="overlay"
      :visible="mapStore.waterNetworkLayers.waterNetworkPointLayer.visible"
    >
      <l-circle-marker
        pane="markerPane"
        v-for="(feature, index) in mapStore.geojsonData.waterNetworkPoint!.features"
        :key="`${index}-${feature.properties.ogc_fid}`"
        :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
        :options="
          getWaterNetworkPointColor(
            feature.properties[`betwcen_s${mapStore.selectedWaterScenario}`],
          )
        "
        @mouseover="mapStore.highlightPoint"
        @mouseout="mapStore.resetHighlight"
        layer-type="overlay"
        ><l-tooltip
          >{{ $t("legend.waterNetwork.betwcen") + ": "
          }}{{
            feature.properties[`betwcen_s${mapStore.selectedWaterScenario}`]
          }}</l-tooltip
        >
      </l-circle-marker>
    </l-feature-group>
    <!-- NIKOPOL Sewage Line -->
    <l-geo-json
      v-if="mapStore.city === CityName.NIKOPOL"
      :name="LayerName.WATERNETWORKLINE"
      :geojson="mapStore.geojsonData.waterNetworkLine"
      :visible="mapStore.waterNetworkLayers.waterNetworkLineLayer.visible"
      layer-type="overlay"
      :options-style="lineStyle"
    ></l-geo-json>
    <!-- NIKOPOL Sewage Point -->
    <l-feature-group
      v-if="mapStore.city === CityName.NIKOPOL"
      :name="LayerName.WATERNETWORKPOINT"
      layer-type="overlay"
      :visible="mapStore.waterNetworkLayers.waterNetworkPointLayer.visible"
    >
      <l-circle-marker
        pane="markerPane"
        v-for="(feature, index) in mapStore.geojsonData.waterNetworkPoint!.features"
        :key="`${index}-${feature.properties.ogc_fid}`"
        :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
        :options="
        mapStore.getMarkerOptions(mapStore.waterNetworkLayers.waterNetworkPointLayer.color!)
        "
        @mouseover="mapStore.highlightPoint"
        @mouseout="mapStore.resetHighlight"
        layer-type="overlay"
      >
      </l-circle-marker>
    </l-feature-group>
  </div>
  <legend-control></legend-control>
</template>
