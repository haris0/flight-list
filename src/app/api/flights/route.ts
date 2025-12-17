import { NextRequest, NextResponse } from 'next/server';
import { getFlights, SORT_TYPE } from '@/services/getFlights';
import { FlightsData } from '@/types/flights-data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const airlineCode = searchParams.get('airline');
  const minPrice = parseInt(searchParams.get('minPrice') || '');
  const maxPrice = parseInt(searchParams.get('maxPrice') || '');
  const minDuration = parseInt(searchParams.get('minDuration') || '');
  const maxDuration = parseInt(searchParams.get('maxDuration') || '');
  const sort = searchParams.get('sort');

  const { flights, filterAttributes, sortOptions } = await getFlights();

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

  return NextResponse.json<{ data: FlightsData}>({
    data: {
      flights: processedFlights,
      filterAttributes,
      sortOptions,
    }
  });
}
