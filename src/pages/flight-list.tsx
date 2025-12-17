'use client';

import DualRangeSlider from '@/components/dual-range-slider';
import { AIRLINE_LOGO_BASE_URL } from '@/constants';
import { FlightsData } from '@/types/flights-data';
import { formatToIDRCurrency } from '@/utils/currency-format';
import { minutesToHoursAndMinutes } from '@/utils/time-format';
import { useState } from 'react';

interface FlightListPageProps {
  initialFlights: FlightsData
}

const FlightListPage = ({ initialFlights }: FlightListPageProps) => {
  const { filterAttributes, sortOptions } = initialFlights;
  const [priceRange, setPriceRange] = useState(filterAttributes.priceRange);
  const [durationRange, setDurationRange] = useState(filterAttributes.durationRange);
  const [airlines, setAirlines] = useState<string[]>([]);
  const [showSort, setShowSort] = useState(false);
  const [selectedSortMode, setSelectedSortMode] = useState('');

  const handleSelectAllAirlines = () => {
    const allAirlineCodes = filterAttributes.airlines.map((airline) => airline.code);
    setAirlines(allAirlineCodes);
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setAirlines((prevSelected) => [...prevSelected, value]);
    } else {
      setAirlines((prevSelected) =>
        prevSelected.filter((option) => option !== value)
      );
    }
  };

  const handleResetFilters = () => {
    setPriceRange(filterAttributes.priceRange);
    setDurationRange(filterAttributes.durationRange);
    setAirlines([]);
  }

  const handeSortOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSortMode(event.target.value);
    setShowSort(false);
  }

  return (
    <div className="md:flex md:flex-1 gap-4">
      <aside className="hidden md:flex w-82 p-4 flex-col gap-6 sticky top-22 h-fit">
        <div className='flex justify-between items-center'>
          <span className="font-semibold">Filter</span>
          <button
            className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
        <div>
          <div className='flex justify-between items-center'>
            <span className='font-semibold'>
              Airlines
            </span>
            <button
              className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
              onClick={
                airlines.length === filterAttributes.airlines.length ? 
                  () => setAirlines([]) : 
                  handleSelectAllAirlines
              }
            >
              {airlines.length === filterAttributes.airlines.length ? 'Unselect All' : 'Select All'}
            </button>
          </div>
          {filterAttributes.airlines.map((airline) => (
            <div key={airline.code} className="flex items-center gap-2 mt-2 justify-between">
              <div className='flex items-center gap-2'>
                <img 
                  src={`${AIRLINE_LOGO_BASE_URL}${airline.code}.png`} 
                  alt={airline.name} 
                  className='w-6'
                />
                <label htmlFor={`airline-${airline.code}`} className="cursor-pointer">
                  {airline.name}
                </label>
              </div>
              <input
                type="checkbox"
                id={`airline-${airline.code}`}
                name="airlines"
                value={airline.code}
                checked={airlines.includes(airline.code)}
                className="w-4 h-4 accent-orange-500"
                onChange={handleCheckboxChange}
              />
            </div>
          ))}
        </div>
        <div>
          <div className='flex justify-between items-center'>
            <span className='font-semibold'>
              Price
            </span>
            <span className='text-xs'>
              {formatToIDRCurrency(priceRange.min)} - {formatToIDRCurrency(priceRange.max)}
            </span>
          </div>
          <div className="mt-4">
            <DualRangeSlider
              min={filterAttributes.priceRange.min}
              max={filterAttributes.priceRange.max}
              minValue={priceRange.min}
              maxValue={priceRange.max}
              setMinValue={(value) => setPriceRange((prev) => ({ ...prev, min: value }))}
              setMaxValue={(value) => setPriceRange((prev) => ({ ...prev, max: value }))}
              formatter={formatToIDRCurrency}
            />
          </div>
        </div>
        <div>
          <div className='flex justify-between items-center'>
            <span className='font-semibold'>
              Duration
            </span>
            <span className='text-xs'>
              {minutesToHoursAndMinutes(durationRange.min)} - {minutesToHoursAndMinutes(durationRange.max)}
            </span>
          </div>
          <div className="mt-4">
            <DualRangeSlider
              min={filterAttributes.durationRange.min}
              max={filterAttributes.durationRange.max}
              minValue={durationRange.min}
              maxValue={durationRange.max}
              setMinValue={(value) => setDurationRange((prev) => ({ ...prev, min: value }))}
              setMaxValue={(value) => setDurationRange((prev) => ({ ...prev, max: value }))}
              formatter={minutesToHoursAndMinutes}
            />
          </div>
        </div>
      </aside>
      <aside className="sticky md:hidden w-full p-4 top-18 shadow-xs -mt-10 rounded-t-2xl bg-[#f3f4f6] z-20">
        Filter Placeholder
      </aside>
      <main className="flex-1 p-4 md:mt-0">
        <div className='flex justify-between items-center'>
          <span className="font-semibold">Select Flight</span>
          <div className='hidden md:block relative'>
            <button
              className={`rounded border-b-0 cursor-pointer font-semibold flex gap-1 ${selectedSortMode && 'text-orange-500'}`}
              onClick={() => setShowSort(!showSort)}
            >
              <img src='/sort-icon.svg' alt="Filter Icon" />
              {selectedSortMode ? sortOptions[selectedSortMode] : 'Sort'}
            </button>
            {showSort && (
              <div className="absolute right-0 mt-2 p-2 w-50 bg-white rounded shadow-xs z-10">
                {Object.entries(sortOptions).map(([value, label]) => (
                  <label key={value} className="flex items-center gap-3 p-1 cursor-pointer justify-between">
                    <span>{label}</span>
                    <div className="relative">
                      <input
                        type="radio"
                        name="option"
                        value={value}
                        checked={selectedSortMode === value}
                        onChange={handeSortOptionChange}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSortMode === value ? 'border-orange-500' : 'border-gray-300'}`}>
                        {selectedSortMode === value && (
                          <div className="w-2.5 h-2.5 rounded-full bg-orange-500"/>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        <ul className='mt-4'>
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
