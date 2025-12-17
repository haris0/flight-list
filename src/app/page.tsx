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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between p-5 bg-white dark:bg-black sm:items-start">
        <Suspense fallback={<div>Loading flights...</div>}>
          <FlightList />
        </Suspense>
      </main>
    </div>
  );
}
