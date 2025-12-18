import { SORT_TYPE } from '@/constants';
import { Flight } from '@/types/flight';
import { FlightsData } from '@/types/flights-data';
import { promises as fs } from 'fs';
import path from 'path';

interface GetFlightsParams {
  airlineCodes?: string[],
  minPrice?: number,
  maxPrice?: number,
  minDuration?: number,
  maxDuration?: number,
  sortBy?: string,
}

export const getFlights = async ({
  airlineCodes = [],
  minPrice = 0,
  maxPrice = 0,
  minDuration = 0,
  maxDuration = 0,
  sortBy,
}: GetFlightsParams): Promise<FlightsData> => {
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

  const processedFlights = flights.filter((flight) => {
    if (airlineCodes.length > 0 && !airlineCodes.includes(flight.airline.code)) return false;
    if (!isNaN(minPrice) && flight.price.amount <= minPrice) return false;
    if (!isNaN(maxPrice) && flight.price.amount >= maxPrice) return false;
    if (!isNaN(minDuration) && flight.duration <= minDuration) return false;
    if (!isNaN(maxDuration) && flight.duration >= maxDuration) return false;
    return true;
  });

  if (sortBy === SORT_TYPE.PRICE) {
    processedFlights.sort((a, b) => a.price.amount - b.price.amount);
  } else if (sortBy === SORT_TYPE.DURATION) {
    processedFlights.sort((a, b) => a.duration - b.duration);
  } else {
    // default sort: prioritize price, then duration
    processedFlights.sort((a, b) => {
      if (a.price.amount !== b.price.amount) {
        return a.price.amount - b.price.amount;
      }
      return a.duration - b.duration; 
    });
  }


  return {
    flights: processedFlights,
    filterAttributes: {
      airlines,
      priceRange,
      durationRange,
    },
    sortOptions
  };
}
