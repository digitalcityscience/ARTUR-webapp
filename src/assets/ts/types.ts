import type { Ref } from "vue";
import { CityName } from "./constants";

export interface City {
  name: CityName;
  latLng: number[];
}

export interface Layer {
  name: string;
  visible: Ref<boolean>;
  color: string | number[];
}
