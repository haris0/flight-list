'use client';

import { FlightsData } from '@/types/flights-data';

interface FlightListPageProps {
  initialFlights: FlightsData
}

const FlightListPage = ({ initialFlights }: FlightListPageProps) => {
  return (
    <div className="w-full">
      <ul>
        {initialFlights.flights.map((flight) => (
          <li key={flight.id}>
            {flight.airline.name} - {flight.flightNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightListPage;
