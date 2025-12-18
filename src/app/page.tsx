import { Suspense } from "react";
import { getFlights } from "@/services/getFlights";
import Header from "@/components/header/Header";
import FlightListPage from "@/pages/flight-list/FlightList";
import { QUERY_PARAM } from "@/constants";

type ServerSearchParams = { [key: string]: string | string[] | undefined };

const FlightList = async ({ searchParams } : { searchParams: ServerSearchParams}) => {
  const airlineCodes = searchParams?.[QUERY_PARAM.AIRLINES];
  const minPrice = parseInt(searchParams?.[QUERY_PARAM.MIN_PRICE] as string || '');
  const maxPrice = parseInt(searchParams?.[QUERY_PARAM.MAX_PRICE] as string || '');
  const minDuration = parseInt(searchParams?.[QUERY_PARAM.MIN_DURATION] as string || '');
  const maxDuration = parseInt(searchParams?.[QUERY_PARAM.MAX_DURATION] as string || '');
  const sortBy = searchParams?.[QUERY_PARAM.SORT_BY] as string || undefined;

  const datas = await getFlights({
    airlineCodes: Array.isArray(airlineCodes) ? airlineCodes : [airlineCodes || ''],
    minPrice,
    maxPrice,
    minDuration,
    maxDuration,
    sortBy,
  });

  return (
    <FlightListPage initialFlights={datas} />
  );
};

export default async function Home({ searchParams }: {
  searchParams: Promise<ServerSearchParams>;
}) {
  const params = await searchParams; 

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col flex-1">
        <Header
          departure="Jakarta (CGK)"
          arival="Bali (DPS)"
          date="22 Oktober 2025"
        />
        <Suspense fallback={<div className="p-4">Loading flights...</div>}>
          <FlightList searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
}
