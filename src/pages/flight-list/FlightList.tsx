'use client';


import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import FilterView from '@/components/filter-view/FilterView';
import SortView from '@/components/sort-view/SortView';
import { FlightsData } from '@/types/flights-data';
import { useCallback, useState } from 'react';

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
  const [showFilterBottomSheet, setShowFilterBottomSheet] = useState(false);
  const [showSortBottomSheet, setShowSortBottomSheet] = useState(false);

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

  const renderFilterView = useCallback(
    () => (
      <FilterView
          filterAttributes={filterAttributes}
          airlines={airlines}
          priceRange={priceRange}
          durationRange={durationRange}
          setAirlines={setAirlines}
          setMinPrice={(value) => setPriceRange((prev) => ({ ...prev, min: value }))}
          setMaxPrice={(value) => setPriceRange((prev) => ({ ...prev, max: value }))}
          setMinDuration={(value) => setDurationRange((prev) => ({ ...prev, min: value }))}
          setMaxDuration={(value) => setDurationRange((prev) => ({ ...prev, max: value }))}
          onResetFilters={handleResetFilters}
          onSelectAllAirlines={handleSelectAllAirlines}
          onCheckAirline={handleCheckboxChange}
        />
    ),
    [
      filterAttributes,
      airlines,
      priceRange,
      durationRange,
      setAirlines,
      setPriceRange,
      setDurationRange,
      handleResetFilters,
      handleSelectAllAirlines,
      handleCheckboxChange
    ],
  );

  const renderSortView = useCallback(
    () => (
      <SortView
        sortOptions={sortOptions}
        selectedSortMode={selectedSortMode}
        handeSortOptionChange={handeSortOptionChange}
      />
    ),
    [sortOptions, selectedSortMode, handeSortOptionChange],
  );

  const isFilterActive = 
    airlines.length > 0 ||
    priceRange.min !== filterAttributes.priceRange.min ||
    priceRange.max !== filterAttributes.priceRange.max ||
    durationRange.min !== filterAttributes.durationRange.min ||
    durationRange.max !== filterAttributes.durationRange.max;

  return (
    <div className="md:flex md:flex-1 gap-4">
      <aside className="hidden md:block w-82 p-4 sticky top-22 h-fit">
        {renderFilterView()}
      </aside>
      <aside className="sticky md:hidden flex justify-around items-center w-full p-4 top-18 shadow-xs -mt-10 rounded-t-2xl bg-[#f3f4f6] z-20">
        <button
          className={`flex gap-1 cursor-pointer ${isFilterActive && 'text-orange-500'}`}
          onClick={() => setShowFilterBottomSheet(true)}
        >
          <img src='/filter-icon.svg' width={20} height={20} alt="Filter Icon" />
          Filter
        </button>
        <button
          className={`flex gap-1 cursor-pointer ${selectedSortMode && 'text-orange-500'}`}
          onClick={() => setShowSortBottomSheet(true)}
        >
          <img src='/sort-icon.svg' width={20} height={20} alt="Filter Icon" />
          Sort
        </button>
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
                {renderSortView()}
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
      <BottomSheet open={showFilterBottomSheet} onClose={() => setShowFilterBottomSheet(false)}>
        {renderFilterView()}
      </BottomSheet>
      <BottomSheet open={showSortBottomSheet} onClose={() => setShowSortBottomSheet(false)}>
        {renderSortView()}
      </BottomSheet>
    </div>
  );
};

export default FlightListPage;
