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
import { ref, watch, computed, onBeforeMount } from "vue";
import useMapStore from "@/stores/mapStore";
import { basemaps } from "@/assets/ts/constants";
import { getVulnerabilityRadius } from "@/assets/ts/functions";
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
const vulDataReady = ref(false);
onBeforeMount(async () => {
  await mapStore.fetchCountrywideData();
  vulDataReady.value = true; // Set vulDataReady after fetching
});
// Watch for data readiness to initialize the vulnerability layer
watch(
  () => vulDataReady.value,
  (ready) => {
    if (ready) {
      mapStore.initializeVulnerabilityLayer();
    }
  },
);
watch(
  () => mapStore.selectedVulnerableProperty,
  () => {
    if (vulDataReady.value) {
      mapStore.initializeVulnerabilityLayer();
    }
  },
);

const vulnerabilityKey = computed(() => mapStore.selectedVulnerableProperty);
const mapIsReady = ref(false);
const onReady = () => {
  mapStore.map = map.value.leafletObject;
  mapIsReady.value = true;
};
</script>

<template>
  <!-- Map Shadow Overlay -->
  <div v-if="mapStore.isSilent" class="shadow-fullscreen"></div>
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
      :key="vulnerabilityKey"
      name="Cities' Vulnerability"
      layer-type="overlay"
      v-if="vulDataReady"
    >
      <l-circle-marker
        pane="markerPane"
        v-for="(feature, index) in mapStore.geojsonData.vulnerabilityPoint!.features"
        :key="`${index}`"
        :lat-lng="[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]"
        :options="
          mapStore.getMarkerOptions(
            mapStore.getVulnerabilityColor(
              feature.properties[mapStore.selectedVulnerableProperty],mapStore.vulnerabilityLayer.range as number[]
            ),
            getVulnerabilityRadius(feature.properties.population_2022),
          )
        "
        layer-type="overlay"
        ><l-tooltip
          ><span>
            {{ $t("vulnerability.properties." + mapStore.selectedVulnerableProperty) }} :
            {{ feature.properties[mapStore.selectedVulnerableProperty] }}</span
          ><br /><span
            >{{ $t("vulnerability.properties.population_2022") }}:
            {{ feature.properties.population_2022 }}</span
          ></l-tooltip
        ><l-popup>
          <div style="max-height: 200px" class="overflow-auto">
            <table class="table table-bordered table-striped table-sm mb-0">
              <tbody>
                <tr v-for="(value, key) in feature.properties" :key="`${key} - ${value}`">
                  <th scope="row">
                    {{ $t("vulnerability.properties." + key) }}
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
    <overlay-control v-if="vulDataReady && mapIsReady"></overlay-control>
    <sidebar-control v-if="vulDataReady && mapIsReady"></sidebar-control>
  </l-map>
</template>
<style scoped>
.shadow-fullscreen {
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
