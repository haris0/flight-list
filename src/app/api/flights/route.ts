import { NextRequest, NextResponse } from 'next/server';
import { getFlights } from '@/services/getFlights';
import { FlightsData } from '@/types/flights-data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const airlineCodes = searchParams.getAll('airlines');
  const minPrice = parseInt(searchParams.get('minPrice') || '');
  const maxPrice = parseInt(searchParams.get('maxPrice') || '');
  const minDuration = parseInt(searchParams.get('minDuration') || '');
  const maxDuration = parseInt(searchParams.get('maxDuration') || '');
  const sortBy = searchParams.get('sortBy') || undefined;

  const data = await getFlights({
    airlineCodes,
    minPrice,
    maxPrice,
    minDuration,
    maxDuration,
    sortBy,
  });

  return NextResponse.json<{ data: FlightsData}>({ data });
}
