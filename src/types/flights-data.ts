import { Airline, Flight } from "./flight";

export interface FlightsData {
  flights: Flight[];
  filterAttributes: {
    airlines: Airline[];
    priceRange: {
      min: number;
      max: number;
    };
    durationRange: {
      min: number;
      max: number;
    };
  };
  sortOptions: Record<string, string>;
}
