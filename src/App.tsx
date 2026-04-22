/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { RAPPI_DATA, TRANSLATIONS, weightedAvailabilityPct } from './constants';
import Header from './components/Header';
import KpiCards from './components/KpiCards';
import Charts from './components/Charts';
import DailyTable from './components/DailyTable';
import ChatAnalyst from './components/ChatAnalyst';
import RangeSlider from './components/RangeSlider';
import Footer from './components/Footer';

export default function App() {
  const [range, setRange] = useState<[number, number]>([0, RAPPI_DATA.series.length - 1]);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
  });
  const [lang, setLang] = useState<string>(() => {
    return localStorage.getItem('lang') || 'es';
  });
  const [selectedKpi, setSelectedKpi] = useState<string>('avg');

  const t = useMemo(() => TRANSLATIONS[lang] || TRANSLATIONS.es, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const filteredSeries = useMemo(() => {
    return RAPPI_DATA.series.slice(range[0], range[1] + 1);
  }, [range]);

  const stats = useMemo(() => {
    if (filteredSeries.length === 0) return RAPPI_DATA.stats;
    
    let sum = 0;
    let max = -Infinity;
    let min = Infinity;
    const values = [];

    // Faster single-pass calculation
    for (let i = 0; i < filteredSeries.length; i++) {
      const v = filteredSeries[i].v;
      sum += v;
      if (v > max) max = v;
      if (v < min) min = v;
      values.push(v);
    }
    
    const avg = sum / filteredSeries.length;
    
    // Median is the only slow part, but only for stats not UI rendering
    const sorted = [...values].sort((a, b) => a - b);
    const median = values.length % 2 === 0
      ? (sorted[values.length / 2 - 1] + sorted[values.length / 2]) / 2
      : sorted[Math.floor(values.length / 2)];
    
    const uptime = weightedAvailabilityPct(filteredSeries);
      
    return {
      ...RAPPI_DATA.stats,
      avg_stores: avg,
      max_stores: max,
      min_stores: min,
      median_stores: median,
      uptime_pct: uptime
    };
  }, [filteredSeries]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const handleRangeChange = useCallback((newRange: [number, number]) => {
    setRange(newRange);
  }, []);

  const handleLangChange = useCallback((newLang: string) => {
    setLang(newLang);
  }, []);

  const handleSelectionChange = useCallback((newKpi: string) => {
    setSelectedKpi(newKpi);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col selection:bg-rappi-orange/30 h-screen overflow-hidden`}>
      <Header theme={theme} onToggleTheme={toggleTheme} lang={lang} onLangChange={handleLangChange} t={t} />
      
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_380px] overflow-hidden">
        {/* Left Scrollable Area */}
        <div className="overflow-y-auto custom-scrollbar p-6 lg:p-8 space-y-8 bg-transparent">
          <KpiCards stats={stats} selectedKpi={selectedKpi} onSelect={handleSelectionChange} t={t} />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">{t['data-control']}</h2>
            </div>
            <RangeSlider 
              range={range} 
              max={RAPPI_DATA.series.length - 1} 
              onRangeChange={handleRangeChange} 
              series={RAPPI_DATA.series}
              t={t}
            />
          </div>

          <Charts 
            series={filteredSeries} 
            daily={RAPPI_DATA.daily} 
            stats={stats}
            range={range}
            t={t}
            lang={lang}
          />

          <DailyTable daily={RAPPI_DATA.daily} t={t} />
          
          <Footer t={t} />
        </div>

        {/* Right Chat Panel */}
        <ChatAnalyst t={t} lang={lang} />
      </main>
    </div>
  );
}

