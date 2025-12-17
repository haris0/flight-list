import { Suspense } from "react";
import { getFlights } from "@/services/getFlights";
import Header from "@/components/header/Header";
import FlightListPage from "@/pages/flight-list/FlightList";

const FlightList = async () => {
  const datas = await getFlights();
  return (
    <FlightListPage initialFlights={datas} />
  );
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col flex-1">
        <Header
          departure="Jakarta (CGK)"
          arival="Bali (DPS)"
          date="22 Oktober 2025"
        />
        <Suspense fallback={<div className="p-4">Loading flights...</div>}>
          <FlightList />
        </Suspense>
      </div>
    </div>
  );
}
