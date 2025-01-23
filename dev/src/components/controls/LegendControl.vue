<script setup lang="ts">
import { ref, computed } from "vue";
import { LControl } from "@vue-leaflet/vue-leaflet";
import PopulationLegend from "./legend/PopulationLegend.vue";
import WaterPointLegend from "./legend/WaterPointLegend.vue";
import StagnentPointLegend from "./legend/StagnentPointLegend.vue";
import StreetCriticalityLegend from "./legend/StreetCriticalityLegend.vue";
import { CityName } from "@/assets/ts/constants";
import { getIsochroneColor } from "@/assets/ts/functions";
import useMapStore from "@/stores/mapStore";

const mapStore = useMapStore();
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
      <div v-show="mapStore.shelterLayers.shelterLayer.visible">
        <i
          class="point"
          :style="{ background: mapStore.shelterLayers.shelterLayer.color }"
        ></i>
        {{ $t("layerNames." + mapStore.shelterLayers.shelterLayer.name) }}
      </div>
      <div v-show="mapStore.healthSiteLayers.healthSiteLayer.visible">
        <i
          class="point"
          :style="{ background: mapStore.healthSiteLayers.healthSiteLayer.color }"
        ></i>
        {{ $t("layerNames." + mapStore.healthSiteLayers.healthSiteLayer.name) }}
      </div>
      <div v-show="mapStore.waterSourceLayers.waterSourceLayer.visible">
        <i
          class="point"
          :style="{ background: mapStore.waterSourceLayers.waterSourceLayer.color }"
        ></i>
        {{ $t("layerNames." + mapStore.waterSourceLayers.waterSourceLayer.name) }}
      </div>
      <div v-show="mapStore.energySupplyLayers.energySupplyLayer.visible">
        <i
          class="point"
          :style="{ background: mapStore.energySupplyLayers.energySupplyLayer.color }"
        ></i>
        {{ $t("layerNames." + mapStore.energySupplyLayers.energySupplyLayer.name) }}
      </div>
      <!-- Water Network Legend for KRYVYIRIH data -->
      <water-point-legend
        v-if="mapStore.waterNetworkLayers.waterNetworkPointLayer.visible"
      ></water-point-legend>
      <div
        v-if="
          mapStore.waterNetworkLayers.waterNetworkPointLayer.visible &&
          mapStore.city === CityName.KRYVYIRIH
        "
      >
        <i
          class="polyline"
          :style="{ background: mapStore.waterNetworkLayers.waterNetworkLineLayer.color }"
        ></i>
        {{
          $t(
            `layerNames.${mapStore.city}.${mapStore.waterNetworkLayers.waterNetworkLineLayer.name}`,
          )
        }}
      </div>
      <div
        v-if="
          mapStore.waterNetworkLayers.waterNetworkPointLayer.visible &&
          mapStore.city === CityName.KRYVYIRIH
        "
      >
        <i
          class="polyline"
          :style="{
            background: mapStore.waterNetworkLayers.waterNetworkSegmentLayer.color,
          }"
        ></i>
        {{
          $t(
            `layerNames.${mapStore.city}.${mapStore.waterNetworkLayers.waterNetworkSegmentLayer.name}`,
          )
        }}
      </div>
      <!-- Sewage System Legend for NIKOPOL data -->
      <div v-if="mapStore.sewageSystemLayers.sewagePointLayer.visible">
        <i
          class="point"
          :style="{
            background: mapStore.sewageSystemLayers.sewagePointLayer.color,
          }"
        ></i>
        {{ $t(`layerNames.${mapStore.sewageSystemLayers.sewagePointLayer.name}`) }}
      </div>
      <div v-if="mapStore.sewageSystemLayers.sewageLineLayer.visible">
        <i
          class="polyline"
          :style="{ background: mapStore.sewageSystemLayers.sewageLineLayer.color }"
        ></i>
        {{ $t(`layerNames.${mapStore.sewageSystemLayers.sewageLineLayer.name}`) }}
      </div>
      <!-- Stagnent Rainfall Nikopol -->
      <stagnent-point-legend
        v-show="mapStore.stagnentRainfallLayers.floodPointLayer.visible"
      ></stagnent-point-legend>
      <street-criticality-legend
        v-show="mapStore.stagnentRainfallLayers.streetCriticalityLayer.visible"
      ></street-criticality-legend>
      <div v-show="mapStore.stagnentRainfallLayers.streetHierarchyLayer.visible">
        <template
          v-for="fclass in mapStore.stagnentRainfallLayers.streetHierarchyLayer.class"
          :key="fclass"
        >
          <i
            class="polyline"
            :style="{ background: mapStore.getStreetHierachyColor(fclass) }"
          ></i
          >{{ $t("legend.stagnentRainfall.streetHierarchy." + fclass) }} <br />
        </template>
      </div>
      <!-- OTHER -->
      <div v-show="mapStore.boundaryLayer.visible">
        <i class="polyline" :style="{ background: mapStore.boundaryLayer.color }"></i>
        {{ $t("layerNames." + mapStore.boundaryLayer.name) }}
      </div>
      <div v-show="mapStore.shelterLayers.isochroneLayer.visible">
        <template
          v-for="range in mapStore.shelterLayers.isochroneLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 5) }"></i
          >{{ $t("legend.isochrone.shelter") }} {{ range }} {{ $t("legend.minute")
          }}<br />
        </template>
      </div>
      <div v-show="mapStore.healthSiteLayers.healthSiteIsochroneLayer.visible">
        <template
          v-for="range in mapStore.healthSiteLayers.healthSiteIsochroneLayer.range"
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
      <div v-show="mapStore.waterSourceLayers.waterSourceCatchmentLayer.visible">
        <template
          v-for="range in mapStore.waterSourceLayers.waterSourceCatchmentLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 10) }"></i
          >{{ $t("legend.isochrone.water") }}{{ range }} {{ $t("legend.kilometer")
          }}<br />
        </template>
      </div>
      <div v-show="mapStore.energySupplyLayers.energySupplyCatchmentLayer.visible">
        <template
          v-for="range in mapStore.energySupplyLayers.energySupplyCatchmentLayer.range"
          :key="range"
        >
          <i class="polygon" :style="{ background: getIsochroneColor(range, 10) }"></i
          >{{ $t("legend.isochrone.energy") }}{{ range }} {{ $t("legend.kilometer")
          }}<br />
        </template>
      </div>
      <div
        v-show="
          mapStore.shelterLayers.populationLayer.visible ||
          mapStore.healthSiteLayers.healthSitePopulationLayer.visible ||
          mapStore.waterSourceLayers.waterSourcePopulationLayer.visible
        "
        class="population-grid"
      >
        <population-legend></population-legend>
        <i class="polygon" style="background: #9e0000"></i
        >{{ $t("legend.population.text") }}<br />
      </div>
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
