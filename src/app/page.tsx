import { Suspense } from "react";
import FlightListPage from "@/pages/flight-list";
import { getFlights } from "@/services/getFlights";

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
        <header
          className="sticky top-0 md:top-3 p-4 h-28 md:h-fit shadow-md text-white md:m-3 md:rounded-lg text-sm"
          style={{ background: '#00275a' }}
        >
          <div>
            Jakarta (CGK) ⇒ Bali (DPS)
          </div>
          <div className="text-white text-xs">
            22 Oktober 2025
          </div>
        </header>
        <Suspense fallback={<div className="p-4">Loading flights...</div>}>
          <FlightList />
        </Suspense>
      </div>
    </div>
  );
}
