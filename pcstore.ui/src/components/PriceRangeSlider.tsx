// src/components/PriceRangeSlider.tsx

'use client';
import * as Slider from '@radix-ui/react-slider';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PriceRangeSlider({ minBound, maxBound, currentMin, currentMax }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const safeMin = Number(minBound) || 0;
  const safeMax = Number(maxBound) || 1500000;

  // Local state for smooth dragging
  const [values, setValues] = useState([
    Number(currentMin) || safeMin,
    Number(currentMax) || safeMax
  ]);

  // Sync with URL only if the user isn't currently dragging
  useEffect(() => {
    setValues([
      Number(searchParams.get('minPrice')) || safeMin,
      Number(searchParams.get('maxPrice')) || safeMax
    ]);
  }, [searchParams, safeMin, safeMax]);

  // Update numbers on screen instantly while moving
  const handleValueChange = (newValues: number[]) => {
    setValues(newValues);
  };

  // Only update URL when user lets go (Stops the "Snap Back" bug)
  const handleValueCommit = (newValues: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('minPrice', newValues[0].toString());
    params.set('maxPrice', newValues[1].toString());
    params.set('pageNumber', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Dynamic Price Display */}
      <div className="text-[11px] font-black uppercase italic tracking-widest text-nanotek-yellow">
        {values[0].toLocaleString()} LKR - {values[1].toLocaleString()} LKR
      </div>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={values}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        min={safeMin}
        max={safeMax}
        step={500}
        minStepsBetweenThumbs={1}
      >
        {/* Track background */}
        <Slider.Track className="bg-gray-800 relative grow rounded-full h-[6px]">
          {/* Highlighted range between handles */}
          <Slider.Range className="absolute bg-nanotek-yellow rounded-full h-full shadow-[0_0_10px_rgba(255,153,0,0.3)]" />
        </Slider.Track>

        {/* Square Orange Handles (Matches Nanotek Style) */}
        <Slider.Thumb 
          className="block w-5 h-5 bg-nanotek-yellow rounded-[4px] shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform focus:outline-none" 
          aria-label="Minimum Price"
        />
        <Slider.Thumb 
          className="block w-5 h-5 bg-nanotek-yellow rounded-[4px] shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform focus:outline-none" 
          aria-label="Maximum Price"
        />
      </Slider.Root>
    </div>
  );
}