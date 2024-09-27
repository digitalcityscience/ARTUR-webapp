import type { CityData, TileLayer } from "./types";
import { ref } from "vue";

export enum CityName {
  ZHYTOMYR = "Zhytomyr",
  KRYVYIRIH = "Kryvyi Rih",
  NIKOPOL = "Nikopol",
  DNIPRO = "Dnipro",
  SUMY = "Sumy",
}
export const cities: Array<CityData> = [
  { name: CityName.KRYVYIRIH, latLng: [47.9264, 33.4253] },
  { name: CityName.NIKOPOL, latLng: [47.57608, 34.3843] },
  { name: CityName.ZHYTOMYR, latLng: [50.26453, 28.67374] },
  { name: CityName.DNIPRO, latLng: [48.467953, 35.041797] },
  { name: CityName.SUMY, latLng: [50.911913, 34.80279] },
];

export enum LayerName {
  SHELTER = "Shelters",
  BOUNDARY = "Boundary",
  ISOCHRONE = "Isochrone",
  POPULATION = "Population",
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
  SIDEBARSAVED = "sidebarSaved",
  SIDEBARDELETED = "sidebarDeleted",
  CHARTSELECTED = "chartSelected",
}

export enum InjectionKeyEnum {
  SHELTER_LAYER = "ShelterLayer",
  BOUNDARY_LAYER = "BoundaryLayer",
  ISOCHRONE_LAYER = "IsochroneLayer",
  POPULATION_LAYER = "PopulationLayer",
}

export enum GraphTypes {
  SANKEY = "Sankey",
  SUNBURST = "Sunburst",
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
