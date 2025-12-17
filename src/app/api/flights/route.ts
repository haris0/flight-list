import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Flight } from '@/types/flight';

const SORT_TYPE = {
  PRICE: 'price',
  DURATION: 'duration',
} as const;

type SORT_TYPE = typeof SORT_TYPE[keyof typeof SORT_TYPE];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const airlineCode = searchParams.get('airline');
  const minPrice = parseInt(searchParams.get('minPrice') || '');
  const maxPrice = parseInt(searchParams.get('maxPrice') || '');
  const minDuration = parseInt(searchParams.get('minDuration') || '');
  const maxDuration = parseInt(searchParams.get('maxDuration') || '');
  const sort = searchParams.get('sort') as SORT_TYPE;

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

  const processedFlights = flights.filter((flight) => {
    if (airlineCode && flight.airline.code !== airlineCode) return false;
    if (!isNaN(minPrice) && flight.price.amount <= minPrice) return false;
    if (!isNaN(maxPrice) && flight.price.amount >= maxPrice) return false;
    if (!isNaN(minDuration) && flight.duration <= minDuration) return false;
    if (!isNaN(maxDuration) && flight.duration >= maxDuration) return false;
    return true;
  });

  if (sort === SORT_TYPE.PRICE) {
    processedFlights.sort((a, b) => a.price.amount - b.price.amount);
  } else if (sort === SORT_TYPE.DURATION) {
    processedFlights.sort((a, b) => a.duration - b.duration);
  } else {
    // Default: prioritize price, then duration
    processedFlights.sort((a, b) => {
      if (a.price.amount !== b.price.amount) return a.price.amount - b.price.amount;
      return a.duration - b.duration;
    });
  }

  return NextResponse.json({
    data: {
      flights: processedFlights,
      filterAttributes: {
        airlines,
        priceRange,
        durationRange,
      },
      sortOptions: [
        {
          label: 'Lowest Price',
          value: SORT_TYPE.PRICE,
        },
        {
          label: 'Shortest Duration',
          value: SORT_TYPE.DURATION,
        }
      ],
    }
  });
}
