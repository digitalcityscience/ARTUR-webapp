<script setup lang="ts">
import {
  LGeoJson,
  LCircleMarker,
  LFeatureGroup,
  LTooltip,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import { type Layer } from "leaflet";
import { watch } from "vue";
import LegendControl from "@/components/LegendControl.vue";
import { getIsochroneColor, getPopulationColor } from "@/assets/ts/functions";
import { CityName, LayerName } from "@/assets/ts/constants";
import useGeoDataStore from "@/stores/geoDataStore";
import useLayerStore from "@/stores/layerStore";
import { useI18n } from "vue-i18n";

// Constants
const geoDataStore = useGeoDataStore();
const layerStore = useLayerStore();
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
    color: layerStore.waterNetworkLayers.waterNetworkLineLayer.color,
    weight: 5,
    opacity: 0.8,
  };
};
const segmentStyle = () => {
  return {
    color: layerStore.waterNetworkLayers.waterNetworkSegmentLayer.color,
    weight: 2,
    opacity: 0.8,
  };
};
const getWaterNetworkPointColor = (property: any) => {
  return layerStore.getMarkerOptions(layerStore.getWaterNetworkPointColor(property), 4);
};
// Stagnent Rainfall Street
const streetCriticalityStyle = (feature: any) => {
  return {
    color: layerStore.getStreetCriticalityColor(feature.properties.nach),
    weight: 1,
  };
};
const streetHierarchyStyle = (feature: any) => {
  return {
    color: layerStore.getStreetHierachyColor(feature.properties.fclass),
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
  () => layerStore.selectedWaterScenario,
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
  <div v-if="geoDataStore.isJsonDataLoad">
    <!-- Shelters -->
    <l-feature-group
      :name="LayerName.SHELTER"
      layer-type="overlay"
      :visible="layerStore.shelterLayers.shelterLayer.visible"
    >
      <l-circle-marker
        v-for="(feature, index) in geoDataStore.geojsonData.shelters!.features"
        :key="`${index}-${feature.properties.name}`"
        :name="feature.properties.name"
        :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
        :options="layerStore.getMarkerOptions(layerStore.shelterLayers.shelterLayer.color!)"
        @mouseover="layerStore.highlightPoint"
        @mouseout="layerStore.resetHighlight"
        layer-type="overlay"
        ><l-popup :content="feature.properties.description"></l-popup
        ><l-tooltip>
          {{ feature.properties.name }}
        </l-tooltip>
      </l-circle-marker>
    </l-feature-group>
    <!-- Boundary -->
    <l-geo-json
      :name="LayerName.BOUNDARY"
      :geojson="geoDataStore.geojsonData.boundary"
      :visible="layerStore.boundaryLayer.visible"
      layer-type="overlay"
      :options-style="layerStore.boundaryStyle"
    ></l-geo-json>
    <!-- Isochrones -->
    <l-geo-json
      :name="LayerName.SHELTERISOCHRONE"
      :geojson="geoDataStore.geojsonData.isochrones"
      :visible="layerStore.shelterLayers.isochroneLayer.visible"
      layer-type="overlay"
      :options-style="isochroneStyle"
    ></l-geo-json>
    <!-- Shelter Population -->
    <l-geo-json
      :key="locale"
      :name="LayerName.SHELTERPOPULATION"
      :geojson="geoDataStore.geojsonData.population"
      :visible="layerStore.shelterLayers.populationLayer.visible"
      layer-type="overlay"
      :options-style="populationStyle"
      :options="{ onEachFeature: onEachPopulationFeature }"
    ></l-geo-json>
    <!-- Health Site Point -->
    <l-feature-group
      :name="LayerName.HEALTHSITE"
      layer-type="overlay"
      :visible="layerStore.healthSiteLayers.healthSiteLayer.visible"
    >
      <l-circle-marker
        v-for="(feature, index) in geoDataStore.geojsonData.healthSitePoint!.features"
        :key="`${index}-${feature.properties.name}`"
        :lat-lng="[
          feature.geometry.coordinates[0][1],
          feature.geometry.coordinates[0][0],
        ]"
        :options="layerStore.getMarkerOptions(layerStore.healthSiteLayers.healthSiteLayer.color!)"
        @mouseover="layerStore.highlightPoint"
        @mouseout="layerStore.resetHighlight"
        layer-type="overlay"
        ><l-tooltip>{{ feature.properties.amenity }}</l-tooltip>
        <l-popup>{{ feature.properties.name }}</l-popup>
      </l-circle-marker>
    </l-feature-group>
    <!-- Health Site Isochrones -->
    <l-geo-json
      :name="LayerName.HEALTHSITEISOCHRONE"
      :geojson="geoDataStore.geojsonData.healthSiteIsochrone"
      :visible="layerStore.healthSiteLayers.healthSiteIsochroneLayer.visible"
      layer-type="overlay"
      :options-style="healthSiteIsochroneStyle"
    ></l-geo-json>
    <!-- Health Site Population -->
    <l-geo-json
      :key="locale"
      :name="LayerName.HEALTHSITEPOPULATION"
      :geojson="geoDataStore.geojsonData.healthSitePopulation"
      :visible="layerStore.healthSiteLayers.healthSitePopulationLayer.visible"
      layer-type="overlay"
      :options-style="populationStyle"
      :options="{ onEachFeature: onEachPopulationFeature }"
    ></l-geo-json>
    <!-- KRYVYIRIH water network segments -->
    <l-geo-json
      v-if="geoDataStore.city === CityName.KRYVYIRIH"
      :name="LayerName.WATERNETWORKSEGMENT"
      :geojson="geoDataStore.geojsonData.waterNetworkSegment"
      :visible="layerStore.waterNetworkLayers.waterNetworkPointLayer.visible"
      layer-type="overlay"
      :options-style="segmentStyle"
    ></l-geo-json>
    <!-- KRYVYIRIH Water Network Point -->
    <l-feature-group
      :key="layerStore.selectedWaterScenario"
      v-if="geoDataStore.city === CityName.KRYVYIRIH"
      :name="LayerName.WATERNETWORKPOINT"
      layer-type="overlay"
      :visible="layerStore.waterNetworkLayers.waterNetworkPointLayer.visible"
    >
      <l-circle-marker
        v-for="(feature, index) in geoDataStore.geojsonData.waterNetworkPoint!.features"
        :key="`${index}-${feature.properties.ogc_fid}`"
        :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
        :options="
          getWaterNetworkPointColor(
            feature.properties[`betwcen_s${layerStore.selectedWaterScenario}`],
          )
        "
        @mouseover="layerStore.highlightPoint"
        @mouseout="layerStore.resetHighlight"
        layer-type="overlay"
        ><l-tooltip
          >{{ $t("legend.waterNetwork.betwcen") + ": "
          }}{{
            feature.properties[`betwcen_s${layerStore.selectedWaterScenario}`]
          }}</l-tooltip
        >
      </l-circle-marker>
    </l-feature-group>
    <!-- KRYVYIRIH Water Network Changes -->
    <l-geo-json
      :key="locale"
      v-if="geoDataStore.city === CityName.KRYVYIRIH"
      :name="LayerName.WATERNETWORKLINE"
      :geojson="geoDataStore.geojsonData.waterNetworkLine"
      :visible="
        layerStore.waterNetworkLayers.waterNetworkPointLayer.visible ||
        layerStore.waterNetworkLayers.waterNetworkLineLayer.visible
      "
      layer-type="overlay"
      :options-style="lineStyle"
      :options="{ onEachFeature: onEachWaterNetworkLine }"
    ></l-geo-json>
    <!-- NIKOPOL Sewage Line -->
    <l-geo-json
      v-if="geoDataStore.city === CityName.NIKOPOL"
      :name="LayerName.SEWAGELINE"
      :geojson="geoDataStore.geojsonData.sewageLine"
      :visible="layerStore.sewageSystemLayers.sewageLineLayer.visible"
      :options-style="segmentStyle"
    ></l-geo-json>
    <!-- NIKOPOL Sewage Point -->
    <l-feature-group
      v-if="geoDataStore.city === CityName.NIKOPOL"
      :name="LayerName.SEWAGEPOINT"
      layer-type="overlay"
      :visible="layerStore.sewageSystemLayers.sewagePointLayer.visible"
    >
      <l-circle-marker
        v-for="(feature, index) in geoDataStore.geojsonData.sewagePoint!.features"
        :key="`${index}-${feature.properties.ogc_fid}`"
        :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
        :options="
        layerStore.getMarkerOptions(layerStore.sewageSystemLayers.sewagePointLayer.color!)
        "
        @mouseover="layerStore.highlightPoint"
        @mouseout="layerStore.resetHighlight"
        layer-type="overlay"
      >
      </l-circle-marker>
    </l-feature-group>
    <!-- NIKOPOL Street Hierachy -->
    <l-geo-json
      v-if="geoDataStore.city === CityName.NIKOPOL"
      :name="LayerName.STREETHIERARCHY"
      :geojson="geoDataStore.geojsonData.streetHierarchy"
      :visible="layerStore.stagnentRainfallLayers.streetHierarchyLayer.visible"
      layer-type="overlay"
      :options-style="streetHierarchyStyle"
    ></l-geo-json>
    <!-- NIKOPOL Street Criticality -->
    <l-geo-json
      v-if="geoDataStore.city === CityName.NIKOPOL"
      :name="LayerName.STREETCRITICALITY"
      :geojson="geoDataStore.geojsonData.streetCriticality"
      :visible="layerStore.stagnentRainfallLayers.streetCriticalityLayer.visible"
      layer-type="overlay"
      :options-style="streetCriticalityStyle"
    ></l-geo-json>
    <!-- NIKOPOL Stagnent Rainfall Point -->
    <l-feature-group
      v-if="geoDataStore.city === CityName.NIKOPOL"
      :name="LayerName.FLOODPOINT"
      layer-type="overlay"
      :visible="layerStore.stagnentRainfallLayers.floodPointLayer.visible"
    >
      <l-circle-marker
        v-for="(feature, index) in geoDataStore.geojsonData.floodPoint!.features"
        :key="`${index}`"
        :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
        :options="
          layerStore.getMarkerOptions(
            layerStore.getRainfallPointColor(feature.properties.criticality),
          )
        "
        @mouseover="layerStore.highlightPoint"
        @mouseout="layerStore.resetHighlight"
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
