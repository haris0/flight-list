'use client';

import { FlightsData } from '@/types/flights-data';

interface FlightListPageProps {
  initialFlights: FlightsData
}

const FlightListPage = ({ initialFlights }: FlightListPageProps) => {
  return (
    <div className="md:flex md:flex-1">
      <aside className="hidden md:block w-82 p-4">
        <div className="font-semibold sticky top-24">Sidebar Placeholder</div>
      </aside>
      <aside className="sticky md:hidden w-full p-4 top-18 shadow-xs -mt-10 rounded-t-2xl" style={{ background: '#f3f4f6' }}>
        Filter Placeholder
      </aside>
      <main className="flex-1 p-4 md:mt-0">
        <ul>
          {initialFlights.flights.map((flight) => (
            <li key={flight.id}>
              {flight.airline.name} - {flight.flightNumber}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default FlightListPage;
