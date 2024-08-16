import { CityName } from "./constants";
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
        return "#eef7fe";
      case value <= 15:
        return "#bae0fb";
      case value <= 25:
        return "#84c9f7";
      case value <= 35:
        return "#43b0f1";
      case value > 35:
        return "#266c95";
      default:
        console.log("wrong value");
        return "";
    }
  else
    switch (true) {
      case value <= 5:
        return "#ffede9";
      case value <= 15:
        return "#ffb5a7";
      case value <= 25:
        return "#ff7765";
      case value <= 35:
        return "#ff0000";
      case value > 35:
        return "#9e0000";
      default:
        console.log("wrong value");
        return "";
    }
}

export function populationRangeToString(value: number): string {
  switch (value) {
    case 5:
      return "<= 5";
    case 15:
      return "<= 15";
    case 25:
      return "<= 25";
    case 35:
      return "<= 35";
    case 45:
      return "> 35";
    default:
      return "";
  }
}

// export async function loadData(
//   cityValue: string | null | undefined,
//   shelters: Ref<any>,
//   boundary: Ref<any>,
//   isochrones: Ref<any>,
//   population: Ref<any>,
// ) {
//   const [sheltersData, boundaryData, isochronesData, populationData] = await Promise.all([
//     import(`@/assets/data/${cityValue}_Shelters.geojson?raw`),
//     import(`@/assets/data/${cityValue}_Boundary.geojson?raw`),
//     import(`@/assets/data/${cityValue}_Isochrone_Geoapify.geojson?raw`),
//     import(`@/assets/data/${cityValue}_population_accessvalues_shelter_5min.geojson?raw`),
//   ]);
//   shelters.value = JSON.parse(sheltersData.default);
//   boundary.value = JSON.parse(boundaryData.default);
//   isochrones.value = JSON.parse(isochronesData.default);
//   isochrones.value.features.sort((a: any, b: any) => b.properties.range - a.properties.range);
//   population.value = JSON.parse(populationData.default);
// }

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
