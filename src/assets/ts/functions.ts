import { CityName } from "./constants";
import { populationAccessibleColor, populationInaccessibleColor } from "./constants";

export function getIsochroneColor(minute: number) {
  switch (minute) {
    case 1:
      return "#005a32";
    case 2:
      return "#238b45";
    case 3:
      return "#41ab5d";
    case 4:
      return "#74c476";
    case 5:
      return "#82E0AA";
    default:
      alert("This Isochrone map has invalid range! The range should be within the interval [1,5].");
  }
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

const accessiblePopulation = [134682, 55789, 114450, 80288, 34905];
const inaccessiblePopulation = [785457, 197988, 119261, 527271, 116081];
const city = [
  CityName.DNIPRO,
  CityName.SUMY,
  CityName.ZHYTOMYR,
  CityName.KHRYVYIRIH,
  CityName.NIKOPOL,
];
export function getTotalPopulation(currentCity: string): number[] {
  for (let i = 0; i < 5; i++) {
    if (currentCity === city[i]) return [accessiblePopulation[i], inaccessiblePopulation[i]];
  }
  return [0, 0];
}
