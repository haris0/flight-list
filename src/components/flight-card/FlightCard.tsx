import { AIRLINE_LOGO_BASE_URL, DUMMY_AIRPORT_DATA } from "@/constants";
import { Flight } from "@/types/flight";
import { formatToIDRCurrency } from "@/utils/currency-format";
import { formatDate, formatYear, minutesToHoursAndMinutes } from "@/utils/time-format";
import { useCallback, useState } from "react";

interface FlightCardProps extends Flight {}

const FlightCard = ({
  airline,
  flightNumber,
  baggage,
  departure,
  arrival,
  duration,
  price,
}: FlightCardProps) => {
  const [showDetail, setShowDetail] = useState(false);

  const renderDuration = useCallback(() => (
    <div className="flex gap-1.5 items-baseline">
      <div className="flex flex-col leading-5 items-start">
        <span className="font-medium">{departure.time}</span>
        <span className="text-xs text-gray-400">{departure.airport}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-400">{minutesToHoursAndMinutes(duration)}</span>
        <hr className="w-16 h-px mx-auto bg-gray-300 border-0 rounded-sm" />
      </div>
      <div className="flex flex-col leading-5 items-end">
        <span className="font-medium">{arrival.time}</span>
        <span className="text-xs text-gray-400">{arrival.airport}</span>
      </div>
    </div>
  ), [departure, arrival, duration]);

  return (
    <div className="p-3 bg-white rounded-xl border border-transparent hover:border-blue-950 shadow-xs">
      <div className="flex justify-between gap-2">
        <div className="w-fit md:w-1/4 flex items-center gap-3 min-w-0">
          <img 
            src={`${AIRLINE_LOGO_BASE_URL}${airline.code}.png`} 
            alt={airline.name} 
            className='w-6 shrink-0'
          />
          <label className="leading-4 flex-1 min-w-0">
            <span className="truncate block align-bottom" title={airline.name}>
              {airline.name}
            </span>
            <span className="text-gray-400 text-xs"> ({airline.code})</span>
            <div className='flex items-center mt-1'>
              <img 
                src={'/baggage-icon.svg'} 
                alt='baggage'
                className='w-4 mr-1'
              />
              <span className="text-xs text-gray-400">
                {baggage}
              </span>
            </div>
          </label>
        </div>
        <div className="hidden lg:block">
          {renderDuration()}
        </div>
        <div className="flex flex-col lg:flex-row h-fit">
          <div className="block lg:hidden">
            {renderDuration()}
          </div>
          <div className="flex flex-row justify-end items-end">
            <span className="font-semibold text-orange-500">{formatToIDRCurrency(price.amount)}</span>
            <span className="text-sm text-gray-400">/pax</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-2 items-end">
        <button 
          className="text-sm cursor-pointer flex items-center"
          onClick={() => setShowDetail((prev) => !prev)}
        >
          Flight Details
          <img
            src='/dropdown-icon.svg'
            alt="Toggle Flight Details"
            className={`transition-transform duration-300 ml-1 ${showDetail ? 'rotate-180' : ''}`}
          />
        </button>
        <button className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded-3xl cursor-pointer">
          Choose
        </button>
      </div>
      {showDetail && (
        <div className="mt-4 border border-gray-300 rounded-lg text-sm text-gray-600">
          <div className="bg-gray-100 p-2 rounded-t-lg flex justify-between items-center">
            <span>Flight Number: {flightNumber}</span>
            <span>Duration: {minutesToHoursAndMinutes(duration)}</span>
          </div>
          <div className="flex items-start gap-1.5 px-3 py-4">
            <div className="flex flex-col items-end gap-4">
              <div className="flex flex-col items-end h-36.5">
                <p className="text-lg font-medium text-gray-950">{departure.time}</p>
                <p className="text-sm text-gray-700">{formatDate(departure.date)}</p>
                <p className="text-xs text-gray-500">{formatYear(departure.date)}</p>
              </div>
              <div className="flex flex-col items-end justify-center">
                <p className="text-lg font-medium text-gray-950">{arrival.time}</p>
                <p className="text-sm text-gray-700">{formatDate(arrival.date)}</p>
                <p className="text-xs text-gray-500">{formatYear(arrival.date)}</p>
              </div>
            </div>

            <div className="relative w-4 h-37">
              <div className="absolute top-2 left-1/2 w-2 h-2 -translate-x-1/2 rounded-full bg-gray-400"></div>
              <div className="absolute left-1/2 w-2 h-2 -translate-x-1/2 rounded-full bg-gray-400 top-43"></div>
              <div 
                className="absolute top-2 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-gray-400 h-43"
              />
            </div>

            <div className="flex flex-1 flex-col items-start gap-7">
              <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex flex-col items-start gap-0.5 w-full">
                  <p className="text-lg font-medium text-gray-950">{DUMMY_AIRPORT_DATA[departure.airport].city} - {departure.airport}</p>
                  <p className="text-sm text-gray-600">{DUMMY_AIRPORT_DATA[departure.airport].airportName}</p>
                </div>

                <div className="flex h-auto min-h-17 items-center gap-2 w-full rounded-md bg-gray-100 p-2">
                  <div className="flex flex-1 items-center gap-2">
                    <img
                      alt="Lion Air" 
                      src={`${AIRLINE_LOGO_BASE_URL}${airline.code}.png`}
                      className='w-10 mr-1'
                    />
                    <div className="flex flex-1 flex-col items-start justify-center">
                      <p className="text-lg font-medium text-gray-950">{airline.name}</p>
                      <div className="flex items-center gap-1">
                        <p className="text-sm whitespace-nowrap text-gray-600">{airline.code}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-0.5 w-full">
                <p className="text-lg font-medium text-gray-950">{DUMMY_AIRPORT_DATA[arrival.airport].city} - {arrival.airport}</p>
                <p className="text-sm text-gray-600">{DUMMY_AIRPORT_DATA[arrival.airport].airportName}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
