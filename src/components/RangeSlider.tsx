/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, memo } from 'react';
import { StoreDataPoint } from '../constants';

interface RangeSliderProps {
  range: [number, number];
  max: number;
  onRangeChange: (range: [number, number]) => void;
  series: StoreDataPoint[];
  t: Record<string, string>;
}

export default memo(function RangeSlider({ range, max, onRangeChange, series, t }: RangeSliderProps) {
  const [localRange, setLocalRange] = useState<[number, number]>(range);

  // Sync local range with external range (when changed by AI or other means)
  useEffect(() => {
    setLocalRange(range);
  }, [range]);

  // Debounced update to parent
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localRange[0] !== range[0] || localRange[1] !== range[1]) {
        onRangeChange(localRange);
      }
    }, 16); // ~1 frame delay for smoother interaction
    return () => clearTimeout(handler);
  }, [localRange, onRangeChange, range]);

  const handleChange = (index: 0 | 1, val: number) => {
    const nextRange: [number, number] = [...localRange];
    nextRange[index] = val;
    
    // Maintain min gap
    const GAP = 0;
    if (index === 0 && nextRange[0] > nextRange[1] - GAP) nextRange[0] = Math.max(0, nextRange[1] - GAP);
    if (index === 1 && nextRange[1] < nextRange[0] + GAP) nextRange[1] = Math.min(max, nextRange[0] + GAP);
    
    setLocalRange(nextRange);
  };

  const formatDate = (idx: number) => {
    if (!series[idx]) return 'N/A';
    const t = series[idx].t;
    return t.slice(5, 16);
  };

  const pLo = (localRange[0] / max) * 100;
  const pHi = (localRange[1] / max) * 100;

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6">
      <div className="flex flex-col gap-1 min-w-[120px]">
        <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">{t['from']}</span>
        <span className="text-sm font-bold font-mono text-rappi-orange">{formatDate(localRange[0])}</span>
      </div>

      <div className="relative flex-1 h-8 flex items-center group w-full">
        {/* Track */}
        <div className="absolute left-0 right-0 h-1 bg-[var(--surface2)] rounded-full" />
        {/* Selection Fill */}
        <div 
          className="absolute h-1 bg-rappi-orange rounded-full" 
          style={{ left: `${pLo}%`, width: `${pHi - pLo}%` }}
        />
        
        <input 
          type="range"
          min={0}
          max={max}
          value={localRange[0]}
          onChange={(e) => handleChange(0, parseInt(e.target.value))}
          className="absolute w-full appearance-none bg-transparent pointer-events-none z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-rappi-orange [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto h-1"
        />
        <input 
          type="range"
          min={0}
          max={max}
          value={localRange[1]}
          onChange={(e) => handleChange(1, parseInt(e.target.value))}
          className="absolute w-full appearance-none bg-transparent pointer-events-none z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-rappi-orange [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto h-1"
        />
      </div>

      <div className="flex flex-col gap-1 min-w-[120px] text-right">
        <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">{t['to']}</span>
        <span className="text-sm font-bold font-mono text-rappi-orange">{formatDate(localRange[1])}</span>
      </div>
    </div>
  );
});
