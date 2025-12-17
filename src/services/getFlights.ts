import { Flight } from '@/types/flight';
import { promises as fs } from 'fs';
import path from 'path';

export const getFlights = async (): Promise<Flight[]> => {
  const filePath = path.join(process.cwd(), 'public', 'flights.json');
  const flights = JSON.parse(await fs.readFile(filePath, 'utf8'));

  return flights;
}
