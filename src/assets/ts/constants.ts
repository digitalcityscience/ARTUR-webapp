import type { CityData } from "./types";

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

export enum InjectionKeyEnum {
  MAP = "Map",
  CITY = "City",
  SHELTER_GEOJSON = "ShelterGeoJSON",
  BOUNDARY_GEOJSON = "BoundaryGeoJSON",
  ISOCHRONE_GEOJSON = "IsochroneGeoJSON",
  POPULATION_GEOJSON = "PopulationGeoJSON",
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
  "#9ed4f9",
  "#84c9f7",
  "#5cb8f3",
  "#3999d2",
  "#266c95",
];
export const populationInaccessibleColor: string[] = [
  "#ffede9",
  "#ffb5a7",
  "#ff7765",
  "#ff0000",
  "#9e0000",
];
