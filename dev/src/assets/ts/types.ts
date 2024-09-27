import type { Ref } from "vue";
import { CityName } from "./constants";

export interface CityData {
  name: CityName;
  latLng: number[];
}

export interface VectorLayer {
  name: string;
  visible: Ref<boolean>;
  color?: string;
  range?: number[];
}

export interface TileLayer {
  name: string;
  url: string;
  visible: Ref<boolean>;
}

// Type definitions for feature properties
export type ShelterProperties = {
  name: string;
  description: string;
};

export type IsochroneProperties = {
  range: number;
};

export type PopulationProperties = {
  value: number;
  access: number;
  name: string;
};
