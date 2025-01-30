<script setup lang="ts">
import { ref, computed } from "vue";
import { LControl } from "@vue-leaflet/vue-leaflet";
import PopulationLegend from "./legend/PopulationLegend.vue";
import WaterPointLegend from "./legend/WaterPointLegend.vue";
import StagnentPointLegend from "./legend/StagnentPointLegend.vue";
import StreetCriticalityLegend from "./legend/StreetCriticalityLegend.vue";
import { CityName } from "@/assets/ts/constants";
import { getIsochroneColor } from "@/assets/ts/functions";
import useMapStore from "@/stores/geoDataStore";
import useLayerStore from "@/stores/layerStore";

const mapStore = useMapStore();
const layerStore = useLayerStore();
const showLegend = ref(true);
const btnLegendIconClass = computed(() => {
  return showLegend.value ? "bi bi-caret-down-fill" : "bi bi-caret-up-fill";
});
</script>
<template>
  <l-control position="bottomleft">
    <button
      @click="showLegend = !showLegend"
      class="btn btn-primary btn-sm w-100 d-flex justify-content-between"
    >
      <i :class="btnLegendIconClass" class="pe-2"></i>
      <strong>{{ $t("legend.title") }}</strong>
      <i class="bi bi-map ps-2"></i>
    </button>
    <div class="legend" v-show="showLegend">
      <div v-show="layerStore.shelterLayers.shelterLayer.visible">
        <i
          class="point"
          :style="{ background: layerStore.shelterLayers.shelterLayer.color }"
        ></i>
        {{ $t("layerNames." + layerStore.shelterLayers.shelterLayer.name) }}
      </div>
      <div v-show="layerStore.healthSiteLayers.healthSiteLayer.visible">
        <i
          class="point"
          :style="{ background: layerStore.healthSiteLayers.healthSiteLayer.color }"
        ></i>
        {{ $t("layerNames." + layerStore.healthSiteLayers.healthSiteLayer.name) }}
      </div>
      <!-- Water Network Legend for KRYVYIRIH data -->
      <water-point-legend
        v-if="
          layerStore.waterNetworkLayers.waterNetworkPointLayer.visible &&
          mapStore.city === CityName.KRYVYIRIH
        "
      ></water-point-legend>
      <div
        v-if="
          layerStore.waterNetworkLayers.waterNetworkPointLayer.visible &&
          mapStore.city === CityName.KRYVYIRIH
        "
      >
        <i
          class="polyline"
          :style="{
            background: layerStore.waterNetworkLayers.waterNetworkLineLayer.color,
          }"
        ></i>
        {{
          $t(
            `layerNames.${mapStore.city}.${layerStore.waterNetworkLayers.waterNetworkLineLayer.name}`,
          )
        }}
      </div>
      <div
        v-if="
          layerStore.waterNetworkLayers.waterNetworkPointLayer.visible &&
          mapStore.city === CityName.KRYVYIRIH
        "
      >
        <i
          class="polyline"
          :style="{
            background: layerStore.waterNetworkLayers.waterNetworkSegmentLayer.color,
          }"
        ></i>
        {{
          $t(
            `layerNames.${mapStore.city}.${layerStore.waterNetworkLayers.waterNetworkSegmentLayer.name}`,
          )
        }}
      </div>
      <!-- Sewage System Legend for NIKOPOL data -->
      <div
        v-if="
          layerStore.sewageSystemLayers.sewagePointLayer.visible &&
          mapStore.city === CityName.NIKOPOL
        "
      >
        <i
          class="point"
          :style="{
            background: layerStore.sewageSystemLayers.sewagePointLayer.color,
          }"
        ></i>
        {{ $t(`layerNames.${layerStore.sewageSystemLayers.sewagePointLayer.name}`) }}
      </div>
      <div
        v-if="
          layerStore.sewageSystemLayers.sewageLineLayer.visible &&
          mapStore.city === CityName.NIKOPOL
        "
      >
        <i
          class="polyline"
          :style="{ background: layerStore.sewageSystemLayers.sewageLineLayer.color }"
        ></i>
        {{ $t(`layerNames.${layerStore.sewageSystemLayers.sewageLineLayer.name}`) }}
      </div>
      <!-- Stagnent Rainfall Nikopol -->
      <stagnent-point-legend
        v-show="
          layerStore.stagnentRainfallLayers.floodPointLayer.visible &&
          mapStore.city === CityName.NIKOPOL
        "
      ></stagnent-point-legend>
      <street-criticality-legend
        v-show="
          layerStore.stagnentRainfallLayers.streetCriticalityLayer.visible &&
          mapStore.city === CityName.NIKOPOL
        "
      ></street-criticality-legend>
      <div
        v-show="
          layerStore.stagnentRainfallLayers.streetHierarchyLayer.visible &&
          mapStore.city === CityName.NIKOPOL
        "
      >
        <template
          v-for="fclass in layerStore.stagnentRainfallLayers.streetHierarchyLayer.class"
          :key="fclass"
        >
          <i
            class="polyline"
            :style="{ background: layerStore.getStreetHierachyColor(fclass) }"
          ></i
          >{{ $t("legend.stagnentRainfall.streetHierarchy." + fclass) }} <br />
        </template>
      </div>
      <!-- OTHER -->
      <div v-show="layerStore.boundaryLayer.visible">
        <i class="polyline" :style="{ background: layerStore.boundaryLayer.color }"></i>
        {{ $t("layerNames." + layerStore.boundaryLayer.name) }}
      </div>
      <div v-show="layerStore.shelterLayers.isochroneLayer.visible">
        <template
          v-for="range in layerStore.shelterLayers.isochroneLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 5) }"></i
          >{{ $t("legend.isochrone.shelter") }} {{ range }} {{ $t("legend.minute")
          }}<br />
        </template>
      </div>
      <div v-show="layerStore.healthSiteLayers.healthSiteIsochroneLayer.visible">
        <template
          v-for="range in layerStore.healthSiteLayers.healthSiteIsochroneLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 10) }"></i
          >{{ $t("legend.isochrone.healthSite")
          }}{{
            $t("sidebar.dataPanel.healthSiteIsochroneType." + mapStore.getIsochroneType())
          }}
          {{ range }} {{ $t("legend.minute") }}<br />
        </template>
      </div>
      <population-legend
        v-show="
          layerStore.shelterLayers.populationLayer.visible ||
          layerStore.healthSiteLayers.healthSitePopulationLayer.visible
        "
      ></population-legend>
    </div>
  </l-control>
</template>
<style scoped>
.legend {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  line-height: 18px;
  color: #555;
}
.legend i {
  margin-top: 2.7px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}
.legend .point {
  border-radius: 50%;
  width: 12px;
  height: 12px;
}
.legend .polyline {
  width: 12px;
  height: 2.5px;
  margin-left: 0;
  margin-top: 0.5em;
}
.legend .polygon {
  width: 12px;
  height: 12px;
}
.population-grid {
  width: 160px;
}
</style>
