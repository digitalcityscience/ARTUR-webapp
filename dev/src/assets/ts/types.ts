import type { Ref } from "vue";
import { CityName } from "./constants";
import type {
  FeatureCollection,
  Point,
  Polygon,
  LineString,
  MultiPolygon,
  MultiPoint,
  MultiLineString,
} from "geojson";

export type CityData = {
  name: CityName;
  latLng: number[];
};

export type IsochroneTypeKey = "auto" | "bus" | "bicycle" | "pedestrian";

export type VectorLayer = {
  name: string;
  visible: boolean;
  color?: string;
  range?: number[];
  class?: string[];
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
type IsochroneProperties = {
  range: number;
};
type PopulationProperties = {
  value: number;
  access: number;
  name: string;
};
type HealthSitePointProperties = {
  name: string;
  amenity: string;
};
type WaterSourceProperties = {
  id: number;
  capacity: string;
  usage: string;
};
type EnergySupplyProperties = {
  id: number;
  capacity: string;
  userType: string;
};
export type GeoJSONData = {
  countryBoundary?: FeatureCollection<Polygon>;
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
  waterNetworkLine?: FeatureCollection<MultiLineString, any>;
  waterNetworkPoint?: any;
  waterNetworkSegment?: FeatureCollection<LineString>;
  sewagePoint?: any;
  sewageLine?: FeatureCollection<MultiLineString, any>;
  floodPoint?: any;
  streetHierarchy?: FeatureCollection<MultiLineString, any>;
  streetCriticality?: FeatureCollection<MultiLineString, any>;
};
export type Population = {
  accessible: number;
  inaccessible: number;
};

export type Language = "EN" | "УКР";
