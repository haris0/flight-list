import { Flight } from '@/types/flight';
import { FlightsData } from '@/types/flights-data';
import { promises as fs } from 'fs';
import path from 'path';

export const SORT_TYPE = {
  PRICE: 'price',
  DURATION: 'duration',
} as const;

type SORT_TYPE = typeof SORT_TYPE[keyof typeof SORT_TYPE];

export const getFlights = async (): Promise<FlightsData> => {
  const filePath = path.join(process.cwd(), 'public', 'flights.json');
  const flights: Flight[] = JSON.parse(await fs.readFile(filePath, 'utf8'));

  const { priceRange, durationRange } = flights.reduce(
    (acc, flight) => {
      if (flight.price.amount < acc.priceRange.min) acc.priceRange.min = flight.price.amount;
      if (flight.price.amount > acc.priceRange.max) acc.priceRange.max = flight.price.amount;
      if (flight.duration < acc.durationRange.min) acc.durationRange.min = flight.duration;
      if (flight.duration > acc.durationRange.max) acc.durationRange.max = flight.duration;
      return acc;
    },
    {
      priceRange: {
        min: flights.length > 0 ? flights[0].price.amount : 0,
        max: flights.length > 0 ? flights[0].price.amount : 0,
      },
      durationRange: {
        min: flights.length > 0 ? flights[0].duration : 0,
        max: flights.length > 0 ? flights[0].duration : 0,
      },
    }
  );

  const airlines =  Array.from(
    new Map(
      flights.map(flight => [flight.airline.code, flight.airline])
    ).values()
  )

  const sortOptions = {
    [SORT_TYPE.PRICE]: 'Lowest Price',
    [SORT_TYPE.DURATION]: 'Shortest Duration',
  };

  return {
    flights,
    filterAttributes: {
      airlines,
      priceRange,
      durationRange,
    },
    sortOptions
  };
}
