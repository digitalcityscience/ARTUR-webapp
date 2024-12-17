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

export function getVulnerabilityColor(index: number): string {
  switch (true) {
    case index <= 0.2:
      return "#ffbb00"; // Yellow
    case index <= 0.4:
      return "#ffaa00"; // Orange-yellow
    case index <= 0.6:
      return "#ff7700"; // Orange
    case index <= 0.8:
      return "#ff4400"; // Red-orange
    case index <= 1.0:
      return "#ff0000"; // Red
    default:
      return "#ffffff"; // Fallback color (white) if something goes wrong
  }
}
export function getVulnerabilityRadius(population: number) {
  const minRadius = 3; // Minimum point size
  const maxRadius = 25; // Maximum point size
  const maxPopulation = 2952301; // Largest population in the dataset

  // Normalize the population to the size range
  const size = minRadius + (population / maxPopulation) * (maxRadius - minRadius);
  return Math.round(size);
}
