import { useState, useRef, useEffect } from 'react';

interface DualRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  minValue: number;
  maxValue: number;
  setMaxValue?: (value: number) => void;
  setMinValue?: (value: number) => void;
  formatter?: (value: number) => string;
}

const DualRangeSlider = ({
  min = 0,
  max = 100,
  step = 1,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  formatter,
}: DualRangeSliderProps) => {
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateRange();
  }, [minValue, maxValue]);

  const updateRange = () => {
    if (rangeRef.current) {
      const percent1 = ((minValue - min) / (max - min)) * 100;
      const percent2 = ((maxValue - min) / (max - min)) * 100;
      rangeRef.current.style.left = `${percent1}%`;
      rangeRef.current.style.width = `${percent2 - percent1}%`;
    }
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue?.(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue?.(value);
  };

  return (
    <>
      <div className="relative">
        <div className="absolute w-full h-1.5 bg-gray-300 rounded-full" />
        
        <div
          ref={rangeRef}
          className="absolute h-1.5 bg-orange-500 rounded-full"
        />
        
        <input
          ref={minRef}
          type="range"
          min={min}
          max={max}
          value={minValue}
          step={step}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none"
          style={{
            WebkitAppearance: 'none',
            zIndex: minValue > max - 10 ? 5 : 3,
          }}
        />
        
        <input
          ref={maxRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none"
          style={{
            WebkitAppearance: 'none',
            zIndex: 4,
          }}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-sm">
        <div className="mt-4">
          <span className="text-xs">{formatter ? formatter(min) : min}</span>
        </div>
        <div className="mt-4">
          <span className="text-xs">{formatter ? formatter(max) : max}</span>
        </div>
      </div>
      
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          position: relative;
          top: -6px;
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          background: #f97316;
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          position: relative;
          top: -6px;
          width: 18px;
          height: 18px;
          background: #f97316;
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          background: #ea580c;
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </>
  );
}

export default DualRangeSlider;
