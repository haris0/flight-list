import { FlightsData } from '@/types/flights-data';
import { AIRLINE_LOGO_BASE_URL } from '@/constants';
import { formatToIDRCurrency } from '@/utils/currency-format';
import DualRangeSlider from '../dual-range-slider/DualRangeSlider';
import { minutesToHoursAndMinutes } from '@/utils/time-format';

interface FilterViewProps {
  filterAttributes: FlightsData['filterAttributes'];
  airlines: string[];
  priceRange: {
    min: number;
    max: number;
  };
  durationRange: {
    min: number;
    max: number;
  };
  setMinPrice: (min: number) => void;
  setMaxPrice: (max: number) => void;
  setMinDuration: (min: number) => void;
  setMaxDuration: (max: number) => void;
  onResetFilters: () => void;
  onSelectAllAirlines: () => void;
  onCheckAirline: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterView = ({
  filterAttributes,
  airlines,
  priceRange,
  durationRange,
  setMinPrice,
  setMaxPrice,
  setMinDuration,
  setMaxDuration,
  onResetFilters,
  onSelectAllAirlines,
  onCheckAirline,
}: FilterViewProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className='flex justify-between items-center'>
        <span className="font-semibold">Filter</span>
        <button
          className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
          onClick={onResetFilters}
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
            onClick={onSelectAllAirlines}
          >
            {airlines.length === filterAttributes?.airlines.length ? 'Unselect All' : 'Select All'}
          </button>
        </div>
        {filterAttributes?.airlines.map((airline) => (
          <div key={airline.code} className="flex items-center gap-2 mt-2 justify-between">
            <div className='flex items-center gap-2'>
              <img 
                src={`${AIRLINE_LOGO_BASE_URL}${airline.code}.png`} 
                alt={airline.name} 
                className='w-6'
              />
              <label className="cursor-pointer">
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
              onChange={onCheckAirline}
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
            min={filterAttributes?.priceRange.min}
            max={filterAttributes?.priceRange.max}
            minValue={priceRange.min}
            maxValue={priceRange.max}
            setMinValue={setMinPrice}
            setMaxValue={setMaxPrice}
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
            min={filterAttributes?.durationRange.min}
            max={filterAttributes?.durationRange.max}
            minValue={durationRange.min}
            maxValue={durationRange.max}
            setMinValue={setMinDuration}
            setMaxValue={setMaxDuration}
            formatter={minutesToHoursAndMinutes}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterView;
