import { populationAccessibleColor, populationInaccessibleColor } from "./constants";
import chroma from "chroma-js";

export function getIsochroneColor(minute: number, maxMinutes: number) {
  const startColor = "#005a32";
  const endColor = "#82E0AA";

  const colorScale = chroma.scale([startColor, endColor]).mode("lab").colors(maxMinutes);

  return colorScale[minute - 1] || colorScale[maxMinutes - 1];
}

export function getPopulationColor(value: number, accessibility: number): string {
  if (accessibility === 1)
    switch (true) {
      case value <= 5:
        return populationAccessibleColor[0];
      case value <= 15:
        return populationAccessibleColor[1];
      case value <= 25:
        return populationAccessibleColor[2];
      case value <= 35:
        return populationAccessibleColor[3];
      case value > 35:
        return populationAccessibleColor[4];
      default:
        console.log("wrong value");
        return "";
    }
  else
    switch (true) {
      case value <= 5:
        return populationInaccessibleColor[0];
      case value <= 15:
        return populationInaccessibleColor[1];
      case value <= 25:
        return populationInaccessibleColor[2];
      case value <= 35:
        return populationInaccessibleColor[3];
      case value > 35:
        return populationInaccessibleColor[4];
      default:
        console.log("wrong value");
        return "";
    }
}
