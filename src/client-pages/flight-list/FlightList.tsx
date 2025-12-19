'use client';


import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import FilterView from '@/components/filter-view/FilterView';
import SortView from '@/components/sort-view/SortView';
import { FlightsData } from '@/types/flights-data';
import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { useFlights } from '@/services/useFlights';
import { QUERY_PARAM, SORT_TYPE } from '@/constants';
import FlightCard from '@/components/flight-card/FlightCard';


interface FlightListPageProps {
  initialFlights: FlightsData
}

const RECOMMENDED_SORT = {
  [SORT_TYPE.RECOMMENDED]: 'Recommended',
}

const FlightListPage = ({ initialFlights }: FlightListPageProps) => {
  const { filterAttributes, sortOptions } = initialFlights || {};
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const { flightsData } = useFlights({
    params: searchParams?.toString() ? `?${searchParams.toString()}` : '',
    initialData: initialFlights,
  });

  const [airlines, setAirlines] = useState<string[]>(searchParams?.getAll(QUERY_PARAM.AIRLINES) || []);
  const [priceRange, setPriceRange] = useState({
    min: Number(searchParams?.get(QUERY_PARAM.MIN_PRICE)) || filterAttributes?.priceRange.min,
    max: Number(searchParams?.get(QUERY_PARAM.MAX_PRICE)) || filterAttributes?.priceRange.max,
  });
  const [durationRange, setDurationRange] = useState({
    min: Number(searchParams?.get(QUERY_PARAM.MIN_DURATION)) || filterAttributes?.durationRange.min,
    max: Number(searchParams?.get(QUERY_PARAM.MAX_DURATION)) || filterAttributes?.durationRange.max,
  });
  const [showSort, setShowSort] = useState(false);
  const [selectedSortMode, setSelectedSortMode] = useState(searchParams?.get(QUERY_PARAM.SORT_BY) || SORT_TYPE.RECOMMENDED);
  const [showBottomSheet, setShowBottomSheet] = useState({
    filter: false,
    sort: false,
  });

  const createQueryString = (key: string, value?: string | string[]) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (Array.isArray(value)) {
      params.delete(key);
      value.forEach((v) => {
        params.append(key, v);
      });
    } else if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    return params.toString();
  };

  const handleUpdateSearch = useDebounce((key: string, value?: string | string[]) => {
    router.replace(`${pathname}?${createQueryString(key, value)}`);
  });

  const handleClearFiltersQuery = useDebounce(() => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete(QUERY_PARAM.AIRLINES);
    params.delete(QUERY_PARAM.MIN_PRICE);
    params.delete(QUERY_PARAM.MAX_PRICE);
    params.delete(QUERY_PARAM.MIN_DURATION);
    params.delete(QUERY_PARAM.MAX_DURATION);
    router.replace(`${pathname}?${params.toString()}`);
  })

  const handleSelectAllAirlines = () => {
    if(airlines.length === filterAttributes?.airlines.length) {
      setAirlines([]);
      handleUpdateSearch(QUERY_PARAM.AIRLINES, []);
      return;
    }
    const allAirlineCodes = filterAttributes?.airlines.map((airline) => airline.code);
    setAirlines(allAirlineCodes);
    handleUpdateSearch(QUERY_PARAM.AIRLINES, allAirlineCodes);
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setAirlines((prevSelected) => {
        const updatedSelection = [...prevSelected, value];
        handleUpdateSearch(QUERY_PARAM.AIRLINES, updatedSelection);
        return updatedSelection;
      });
    } else {
      setAirlines((prevSelected) => {
        const updatedSelection = prevSelected.filter((option) => option !== value);
        handleUpdateSearch(QUERY_PARAM.AIRLINES, updatedSelection);
        return updatedSelection;
      });
    }
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
    setPriceRange((prev) => ({ ...prev, [type]: value }));
    handleUpdateSearch(
      type === 'max' ? QUERY_PARAM.MAX_PRICE : QUERY_PARAM.MIN_PRICE,
      String(value)
    );
  }

  const handleDurationRangeChange = (type: 'min' | 'max', value: number) => {
    setDurationRange((prev) => ({ ...prev, [type]: value }));
    handleUpdateSearch(
      type === 'max' ? QUERY_PARAM.MAX_DURATION : QUERY_PARAM.MIN_DURATION,
      String(value)
    );
  }

  const handleResetFilters = () => {
    setPriceRange(filterAttributes?.priceRange);
    setDurationRange(filterAttributes?.durationRange);
    setAirlines([]);
    handleClearFiltersQuery();
  }

  const handeSortOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedSortMode(value);
    if (value === SORT_TYPE.RECOMMENDED) {
      handleUpdateSearch(QUERY_PARAM.SORT_BY, undefined);
    } else {
      handleUpdateSearch(QUERY_PARAM.SORT_BY, value);
    }
    setShowSort(false);
  }

  const renderFilterView = useCallback(
    () => (
      <FilterView
        filterAttributes={filterAttributes}
        airlines={airlines}
        priceRange={priceRange}
        durationRange={durationRange}
        setMinPrice={(value) => handlePriceRangeChange('min', value)}
        setMaxPrice={(value) => handlePriceRangeChange('max', value)}
        setMinDuration={(value) => handleDurationRangeChange('min', value)}
        setMaxDuration={(value) => handleDurationRangeChange('max', value)}
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
        sortOptions={{
          ...RECOMMENDED_SORT,
          ...sortOptions
        }}
        selectedSortMode={selectedSortMode}
        handeSortOptionChange={handeSortOptionChange}
      />
    ),
    [sortOptions, selectedSortMode, handeSortOptionChange],
  );

  const isFilterActive = 
    airlines.length > 0 ||
    priceRange.min !== filterAttributes?.priceRange.min ||
    priceRange.max !== filterAttributes?.priceRange.max ||
    durationRange.min !== filterAttributes?.durationRange.min ||
    durationRange.max !== filterAttributes?.durationRange.max;

  return (
    <div className="md:flex md:flex-1 gap-4">
      <aside className="hidden md:block w-82 p-4 sticky top-22 h-fit">
        {renderFilterView()}
      </aside>
      <aside className="sticky md:hidden flex justify-around items-center w-full p-4 top-18 shadow-xs -mt-10 rounded-t-2xl bg-gray-100 z-20">
        <button
          className={`flex gap-1 cursor-pointer ${isFilterActive && 'text-orange-500'}`}
          onClick={() => setShowBottomSheet((prev) => ({ ...prev, filter: true }))}
        >
          <img src='/filter-icon.svg' width={20} height={20} alt="Filter Icon" />
          Filter
        </button>
        <button
          className={`flex gap-1 cursor-pointer ${selectedSortMode !== SORT_TYPE.RECOMMENDED && 'text-orange-500'}`}
          onClick={() => setShowBottomSheet((prev) => ({ ...prev, sort: true }))}
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
              className={`rounded border-b-0 cursor-pointer font-semibold flex gap-1 ${selectedSortMode !== SORT_TYPE.RECOMMENDED && 'text-orange-500'}`}
              onClick={() => setShowSort(!showSort)}
            >
              <img src='/sort-icon.svg' alt="Filter Icon" />
              {selectedSortMode !== SORT_TYPE.RECOMMENDED ? sortOptions[selectedSortMode] : 'Sort'}
            </button>
            {showSort && (
              <div className="absolute right-0 mt-2 p-2 w-50 bg-white rounded shadow-xs z-10">
                {renderSortView()}
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-3 mt-4'>
          {flightsData?.flights?.map((flight) => (
            <FlightCard key={flight.id} {...flight} />
          ))}
        </div>
      </main>
      <BottomSheet 
        open={showBottomSheet.filter} 
        onClose={() => setShowBottomSheet((prev) => ({ ...prev, filter: false }))}
      >
        {renderFilterView()}
      </BottomSheet>
      <BottomSheet 
        open={showBottomSheet.sort} 
        onClose={() => setShowBottomSheet((prev) => ({ ...prev, sort: false }))}
      >
        {renderSortView()}
      </BottomSheet>
    </div>
  );
};

export default FlightListPage;
