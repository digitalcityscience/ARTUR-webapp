<script setup lang="ts">
import {
  LMap,
  LControlScale,
  LTileLayer,
  LGeoJson,
  LFeatureGroup,
  LCircleMarker,
  LTooltip,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import { ref } from "vue";
import useMapStore from "@/stores/mapStore";
import { basemaps } from "@/assets/ts/constants";
import { getVulnerabilityColor, getVulnerabilityRadius } from "@/assets/ts/functions";
import OverlayControl from "./controls/OverlayControl.vue";
import SidebarControl from "@/components/controls/SidebarControl.vue";

// Pinia Store
const mapStore = useMapStore();
// Map Settings
const map = ref();
const mapOptions = {
  zoomControl: false,
  attributionControl: false,
  zoom: 6,
  minZoom: 4,
  maxZoom: 18,
  center: [49.35910584900799, 32.49031727913723],
  preferCanvas: true,
  interactive: false,
  maxBounds: [
    // South-West corner of the bounding box
    [35.0, 20.0],
    // North-East corner of the bounding box
    [55.0, 50.0],
  ],
  maxBoundsViscosity: 1.0,
};
// Boundary Style
const boundaryStyle = () => {
  return {
    fillOpacity: 0,
    color: mapStore.boundaryLayer.color,
  };
};
mapStore.fetchCountrywideData();

const isReady = ref(false);
const onReady = () => {
  mapStore.map = map.value.leafletObject;
  isReady.value = true;
};
</script>

<template>
  <!-- Map Shadow Overlay -->
  <div v-if="mapStore.isSilent" class="map-overlay"></div>
  <l-map
    ref="map"
    :use-global-leaflet="false"
    :options="mapOptions"
    @ready="onReady"
    attributionControl="false"
  >
    <!-- Base Layers -->
    <template v-for="basemap in basemaps" :key="basemap.name">
      <l-tile-layer
        :url="basemap.url"
        layer-type="base"
        :name="basemap.name"
        :visible="basemap.visible.value"
        pane="tilePane"
      ></l-tile-layer>
    </template>
    <l-feature-group
      name="Cities' Vulnerability"
      layer-type="overlay"
      v-if="mapStore.geojsonData.vulnerabilityPoint"
    >
      <l-circle-marker
        pane="markerPane"
        v-for="(feature, index) in mapStore.geojsonData.vulnerabilityPoint!.features"
        :key="`${index}-${feature.properties.name}`"
        :name="feature.properties.city"
        :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
        :options="
          mapStore.getMarkerOptions(
            getVulnerabilityColor(feature.properties.alarm_hours_2024),
            getVulnerabilityRadius(feature.properties.population_),
          )
        "
        layer-type="overlay"
        ><l-tooltip
          ><span
            >Total Alarm Hours in 2024: {{ feature.properties.alarm_hours_2024 }}</span
          ><br /><span>Population: {{ feature.properties.population_ }}</span></l-tooltip
        ><l-popup>
          <div style="max-height: 200px" class="overflow-auto">
            <h5 class="text-center mb-2">{{ feature.properties.name }}</h5>
            <table class="table table-bordered table-striped table-sm mb-0">
              <tbody>
                <tr v-for="(value, key) in feature.properties" :key="key">
                  <th scope="row" class="text-capitalize">
                    {{ key }}
                  </th>
                  <td>{{ value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </l-popup>
      </l-circle-marker>
    </l-feature-group>
    <l-geo-json
      name="Ukraine Boundary"
      :geojson="mapStore.geojsonData.countryBoundary"
      layer-type="overlay"
      :options-style="boundaryStyle"
      pane="overlayPane"
    ></l-geo-json>
    <!-- Controls -->
    <l-control-scale :imperial="false"></l-control-scale>
    <overlay-control v-if="isReady"></overlay-control>
    <sidebar-control v-if="isReady"></sidebar-control>
  </l-map>
</template>
<style scoped>
.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 900;
  pointer-events: all;
}
</style>
