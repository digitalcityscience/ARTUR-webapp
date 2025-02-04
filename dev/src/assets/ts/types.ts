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

export interface CityData {
  name: CityName;
  latLng: number[];
}

export type IsochroneTypeKey = "auto" | "bus" | "bicycle" | "pedestrian";

export interface VectorLayer {
  name: string;
  visible: boolean;
  color?: string;
  range?: number[];
  class?: string[];
}

export interface TileLayer {
  name: string;
  url: string;
  visible: Ref<boolean>;
}

// Type definitions for feature properties
export interface ShelterProperties {
  name: string;
  description: string;
}
interface IsochroneProperties {
  range: number;
}
type PopulationProperties = {
  value: number;
  access: number;
  name: string;
};
interface HealthSitePointProperties {
  name: string;
  amenity: string;
}
export interface GeoJSONData {
  countryBoundary?: FeatureCollection<Polygon>;
  boundary?: FeatureCollection<Polygon>;
  shelters?: FeatureCollection<Point, ShelterProperties>;
  isochrones?: FeatureCollection<MultiPolygon, IsochroneProperties>;
  population?: FeatureCollection<MultiPolygon, PopulationProperties>;
  healthSitePoint?: FeatureCollection<MultiPoint, HealthSitePointProperties>;
  healthSiteIsochrone?: FeatureCollection<MultiPolygon, IsochroneProperties>;
  healthSitePopulation?: FeatureCollection<MultiPolygon, PopulationProperties>;
  waterNetworkLine?: FeatureCollection<MultiLineString, any>;
  waterNetworkPoint?: any;
  waterNetworkSegment?: FeatureCollection<LineString>;
  sewagePoint?: any;
  sewageLine?: FeatureCollection<MultiLineString, any>;
  floodPoint?: any;
  streetHierarchy?: FeatureCollection<MultiLineString, any>;
  streetCriticality?: FeatureCollection<MultiLineString, any>;
}
export interface Population {
  accessible: number;
  inaccessible: number;
}

export type Language = "EN" | "УКР";
