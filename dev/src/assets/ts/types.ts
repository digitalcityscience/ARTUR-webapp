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

export type IsochroneTypeKey = "auto" | "bus" | "bicycle" | "pedestrian";

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
  amenity: string;
};
export type WaterSourceProperties = {
  id: number;
  capacity: string;
  usage: string;
};
export type EnergySupplyProperties = {
  id: number;
  capacity: string;
  userType: string;
};
export type GeoJSONData = {
  countryBoundary?: FeatureCollection<Polygon>;
  vulnerabilityPoint?: FeatureCollection<Point, any>;
  boundary?: FeatureCollection<Polygon>;
  shelters?: FeatureCollection<Point, ShelterProperties>;
  isochrones?: FeatureCollection<MultiPolygon, IsochroneProperties>;
  population?: FeatureCollection<MultiPolygon, PopulationProperties>;
  healthSitePoint?: FeatureCollection<MultiPoint, HealthSitePointProperties>;
  healthSiteIsochrone?: FeatureCollection<MultiPolygon, IsochroneProperties>;
  healthSitePopulation?: FeatureCollection<MultiPolygon, PopulationProperties>;
  waterSourcePoint?: FeatureCollection<Point, WaterSourceProperties>;
  waterSourceCatchment?: FeatureCollection<MultiPolygon, IsochroneProperties>;
  waterSourcePopulation?: FeatureCollection<MultiPolygon, PopulationProperties>;
  energySupplyPoint?: FeatureCollection<Point, EnergySupplyProperties>;
  energySupplyCatchment?: FeatureCollection<MultiPolygon, IsochroneProperties>;
};
export type Population = {
  accessible: number;
  inaccessible: number;
};

export type Language = "EN" | "УКР";
