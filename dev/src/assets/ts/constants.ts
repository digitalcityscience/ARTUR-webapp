import type { TileLayer, CityData } from "./types";
import { ref } from "vue";

export enum populationType {
  SHELTER = "shelter",
  HEALTHSITE = "health site",
}

export const basemaps: Array<TileLayer> = [
  {
    name: "CartoCDN Voyager",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",
    visible: ref(true),
  },
  {
    name: "CartoCDN Positron",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
    visible: ref(false),
  },
  {
    name: "CartoCDN Dark Matter",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
    visible: ref(false),
  },
  {
    name: "OpenStreetMap",
    url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
    visible: ref(false),
  },
  {
    name: "Esri World Imagery",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    visible: ref(false),
  },
];

export enum LocalStorageEvent {
  DELETE = "indicatorDelete",
  UPDATE = "indicatorUpdate",
}

export enum ImageFormat {
  PNG = "png",
  JPEG = "jpeg",
  SVG = "svg",
}

export const populationAccessibleColor: string[] = [
  "#eef7fe",
  "#bae0fb",
  "#84c9f7",
  "#43b0f1",
  "#266c95",
];
export const populationInaccessibleColor: string[] = [
  "#ffede9",
  "#ffb5a7",
  "#ff7765",
  "#ff0000",
  "#9e0000",
];

export enum LayerName {
  VULNERABILITY = "vulnerability",
  SHELTER = "shelter",
  BOUNDARY = "boundary",
  SHELTERISOCHRONE = "isochrone",
  SHELTERPOPULATION = "population",
  HEALTHSITE = "healthSitePoint",
  HEALTHSITEISOCHRONE = "healthSiteIsochrone",
  HEALTHSITEPOPULATION = "healthSitePopulation",
  WATERSOURCE = "waterSource",
  WATERSOURCECATCHMENT = "waterSourceCatchment",
  WATERSOURCEPOPULATION = "waterSourcePopulation",
  ENERGYSUPPLY = "energySupply",
  ENERGYSUPPLYCATCHMENT = "energySupplyCatchment",
  SEWAGEPOINT = "sewagePoint",
  SEWAGELINE = "sewageLine",
  WATERNETWORKPOINT = "waterNetworkPoint",
  WATERNETWORKLINE = "waterNetworkLine",
  WATERNETWORKSEGMENT = "waterNetworkSegment",
  FLOODPOINT = "floodPoint",
  STREETHIERARCHY = "streetHierarchy",
  STREETCRITICALITY = "streetCriticality",
}
export enum CityName {
  KRYVYIRIH = "kryvyirih",
  NIKOPOL = "nikopol",
}
export const cities: Array<CityData> = [
  { name: CityName.KRYVYIRIH, latLng: [47.9264, 33.4253] },
  { name: CityName.NIKOPOL, latLng: [47.57608, 34.3843] },
];
export enum GraphTypes {
  SANKEY = "sankey",
  SUNBURST = "sunburst",
}
