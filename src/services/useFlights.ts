import { FlightsData } from '@/types/flights-data';
import { useState, useEffect } from 'react';

const END_POINT_FLIGHTS = '/api/flights';

interface UseFlightsOptions {
  initialData?: FlightsData;
  apiUrl?: string;
  params?: string;
}

export function useFlights({ params = '', initialData }: UseFlightsOptions = {}) {
  const [flightsData, setFlightsData] = useState<FlightsData | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const url = `${END_POINT_FLIGHTS}${params}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch flights');
        const json: { data:  FlightsData } = await res.json();
        setFlightsData(json.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })()
  }, [initialData, params]);

  return { flightsData, loading, error };
}
