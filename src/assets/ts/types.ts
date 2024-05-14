import type { Ref } from "vue";

export interface City {
  name: string;
  latLng: number[];
}

export interface Layer {
  name: string;
  visible: Ref<boolean>;
  color: string | number[];
}
