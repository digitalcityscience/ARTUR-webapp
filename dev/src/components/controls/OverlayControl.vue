<script setup lang="ts">
import {
  LGeoJson,
  LCircleMarker,
  LFeatureGroup,
  LTooltip,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import { featureGroup, type Layer } from "leaflet";
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
const segmentStyle = () => {
  return {
    color: mapStore.waterNetworkLayers.waterNetworkSegmentLayer.color,
    weight: 2,
    opacity: 0.8,
  };
};
const getWaterNetworkPointColor = (property: any) => {
  return mapStore.getMarkerOptions(mapStore.getWaterNetworkPointColor(property), 4);
};
// Stagnent Rainfall Street
const streetCriticalityStyle = (feature: any) => {
  return {
    color: mapStore.getStreetCriticalityColor(feature.properties.nach),
    weight: 1,
  };
};
const streetHierarchyStyle = (feature: any) => {
  return {
    color: mapStore.getStreetHierachyColor(feature.properties.fclass),
    weight: 1,
    opacity: 0.7,
  };
};
// Create a map to store references to layers by scenario
const scenarioLayerMap = new Map<number, Layer>();
const onEachWaterNetworkLine = (feature: any, layer: Layer) => {
  // Store a reference to the layer by its scenario
  const scenario = feature?.properties?.scenario;
  scenarioLayerMap.set(scenario, layer);
  // Customize the content of your popup
  const popupContent = `<div style="max-height: 100px" class="overflow-auto">
      <table class="table table-bordered table-striped table-sm mb-0">
        <tbody><tr><th scope="row">${t("legend.waterNetwork.scenario")}</th>
        <td>${scenario || "N|A"}</td></tr>
        <tr><th scope="row">${t("legend.waterNetwork.change")}</th>
        <td>${feature?.properties?.change || "N|A"}</td></tr>
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
    // Close all popups first
    scenarioLayerMap.forEach((layer) => layer.closePopup());
    if (newScenario != 0) {
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
  <div v-if="mapStore.isJsonDataLoad">
    <!-- Shelters -->
    <l-feature-group
      :name="LayerName.SHELTER"
      layer-type="overlay"
      :visible="mapStore.shelterLayers.shelterLayer.visible"
    >
      <l-circle-marker
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
    <!-- KRYVYIRIH water network segments -->
    <l-geo-json
      v-if="mapStore.city === CityName.KRYVYIRIH"
      :name="LayerName.WATERNETWORKSEGMENT"
      :geojson="mapStore.geojsonData.waterNetworkSegment"
      :visible="mapStore.waterNetworkLayers.waterNetworkPointLayer.visible"
      layer-type="overlay"
      :options-style="segmentStyle"
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
        v-for="(feature, index) in mapStore.geojsonData.waterNetworkPoint!.features"
        :key="`${index}-${feature.properties.ogc_fid}`"
        :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
        :options="
          mapStore.getMarkerOptions(
            mapStore.getWaterNetworkPointColor(
              feature.properties[`betwcen_s${mapStore.selectedWaterScenario}`],
            ),
            4,
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
    <!-- KRYVYIRIH Water Network Changes -->
    <l-geo-json
      :key="locale"
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
    <!-- NIKOPOL Sewage Line -->
    <l-geo-json
      v-if="mapStore.city === CityName.NIKOPOL"
      :name="LayerName.SEWAGELINE"
      :geojson="mapStore.geojsonData.sewageLine"
      :visible="mapStore.sewageSystemLayers.sewageLineLayer.visible"
      :options-style="segmentStyle"
    ></l-geo-json>
    <!-- NIKOPOL Sewage Point -->
    <l-feature-group
      v-if="mapStore.city === CityName.NIKOPOL"
      :name="LayerName.SEWAGEPOINT"
      layer-type="overlay"
      :visible="mapStore.sewageSystemLayers.sewagePointLayer.visible"
    >
      <l-circle-marker
        v-for="(feature, index) in mapStore.geojsonData.sewagePoint!.features"
        :key="`${index}-${feature.properties.ogc_fid}`"
        :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
        :options="
        mapStore.getMarkerOptions(mapStore.sewageSystemLayers.sewagePointLayer.color!)
        "
        @mouseover="mapStore.highlightPoint"
        @mouseout="mapStore.resetHighlight"
        layer-type="overlay"
      >
      </l-circle-marker>
    </l-feature-group>
    <!-- NIKOPOL Street Hierachy -->
    <l-geo-json
      v-if="mapStore.city === CityName.NIKOPOL"
      :name="LayerName.STREETHIERARCHY"
      :geojson="mapStore.geojsonData.streetHierarchy"
      :visible="mapStore.stagnentRainfallLayers.streetHierarchyLayer.visible"
      layer-type="overlay"
      :options-style="streetHierarchyStyle"
    ></l-geo-json>
    <!-- NIKOPOL Street Criticality -->
    <l-geo-json
      v-if="mapStore.city === CityName.NIKOPOL"
      :name="LayerName.STREETCRITICALITY"
      :geojson="mapStore.geojsonData.streetCriticality"
      :visible="mapStore.stagnentRainfallLayers.streetCriticalityLayer.visible"
      layer-type="overlay"
      :options-style="streetCriticalityStyle"
    ></l-geo-json>
    <!-- NIKOPOL Stagnent Rainfall Point -->
    <l-feature-group
      v-if="mapStore.city === CityName.NIKOPOL"
      :name="LayerName.FLOODPOINT"
      layer-type="overlay"
      :visible="mapStore.stagnentRainfallLayers.floodPointLayer.visible"
    >
      <l-circle-marker
        v-for="(feature, index) in mapStore.geojsonData.floodPoint!.features"
        :key="`${index}`"
        :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
        :options="
          mapStore.getMarkerOptions(
            mapStore.getRainfallPointColor(feature.properties.criticality),
          )
        "
        @mouseover="mapStore.highlightPoint"
        @mouseout="mapStore.resetHighlight"
        ><l-popup
          ><div style="max-height: 100px" class="overflow-auto">
            <table class="table table-bordered table-striped table-sm mb-0">
              <tbody>
                <tr>
                  <th scope="row">ID</th>
                  <td>{{ feature.properties.id }}</td>
                </tr>
                <tr>
                  <th scope="row">Адреса</th>
                  <td>{{ feature.properties.address }}</td>
                </tr>
                <tr>
                  <th scope="row">Запропоновані рішення</th>
                  <td>{{ feature.properties.proposed_solutions }}</td>
                </tr>
              </tbody>
            </table>
          </div></l-popup
        >
      </l-circle-marker>
    </l-feature-group>
  </div>
  <legend-control></legend-control>
</template>
