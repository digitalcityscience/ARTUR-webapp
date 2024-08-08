import type { City } from "./types";

export enum CityName {
  ZHYTOMYR = "Zhytomyr",
  DNIPRO = "Dnipro",
  SUMY = "Sumy",
}
export const cities: Array<City> = [
  { name: CityName.ZHYTOMYR, latLng: [50.26453, 28.67374] },
  { name: CityName.DNIPRO, latLng: [48.467953, 35.041797] },
  { name: CityName.SUMY, latLng: [50.911913, 34.80279] },
];

export enum GraphTypes {
  SANKEY = "Sankey",
  SUNBURST = "Sunburst",
}

export enum ImageFormat {
  PNG = "png",
  JPEG = "jpeg",
  SVG = "svg",
}
