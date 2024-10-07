import type { Ref } from "vue";
import { CityName } from "./constants";
import type {
  FeatureCollection,
  Point,
  Polygon,
  MultiPolygon,
  MultiPoint,
} from "geojson";

export type CityData = {
  name: CityName;
  latLng: number[];
};

export type VectorLayer = {
  name: string;
  visible: Ref<boolean>;
  color?: string;
  range?: number[];
};

export type TileLayer = {
  name: string;
  url: string;
  visible: Ref<boolean>;
};

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
export type HealthSitePointProperties = {
  name: string;
};
export type GeoJSONData = {
  shelters?: FeatureCollection<Point, ShelterProperties>;
  boundary?: FeatureCollection<Polygon>;
  isochrones?: FeatureCollection<MultiPolygon, IsochroneProperties>;
  population?: FeatureCollection<MultiPolygon, PopulationProperties>;
  healthSitePoint?: FeatureCollection<MultiPoint, HealthSitePointProperties>;
  healthSiteIsochrone?: FeatureCollection<MultiPolygon, IsochroneProperties>;
};
