/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StoreDataPoint, DailySummary, DashboardStats } from '../constants';

interface ChartsProps {
  series: StoreDataPoint[];
  daily: DailySummary[];
  stats: DashboardStats;
  range: [number, number];
  t: Record<string, string>;
  lang: string;
}

import { useState, useMemo, memo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Cell, ReferenceLine, ReferenceDot
} from 'recharts';

export default memo(function Charts({ series, daily, stats, t }: ChartsProps) {
  const [showStores, setShowStores] = useState(true);
  const [showAverage, setShowAverage] = useState(true);

  // If both are hidden, we might want to handle it, but the request says 
  // "Solo se debería poner todo invisible cuando el usuario oculta ambos"
  // which is already naturally handled by the conditional rendering of components.

  const fmtExact = (n: number) => {
    return n.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  };

  const fmtCompact = (n: number) => {
    if (n >= 1000) return (n / 1000).toFixed(0) + 'k';
    return n.toFixed(0);
  };

  // Performance optimization: Sample data if there are too many points
  const displaySeries = useMemo(() => {
    if (series.length <= 600) return series;
    const step = Math.ceil(series.length / 600);
    return series.filter((_, i) => i % step === 0);
  }, [series]);

  // Points for max/min tagging
  const maxPoint = useMemo(() => {
    if (!series.length) return null;
    return series.reduce((prev, curr) => (curr.v > prev.v ? curr : prev), series[0]);
  }, [series]);

  const minPoint = useMemo(() => {
    if (!series.length) return null;
    return series.reduce((prev, curr) => (curr.v < prev.v ? curr : prev), series[0]);
  }, [series]);

  // Chart Formatting
  const formatXAxis = (tickItem: string) => {
    const parts = tickItem.split(' ');
    const datePart = parts[0].slice(5);
    const timePart = parts[1].slice(0, 5);
    return `${datePart} ${timePart}`;
  };

  const CustomTooltip = ({ active, payload, label, isMainChart = false, isDailyAvg = false }: any) => {
    if (active && payload && payload.length) {
      const nameMap: Record<string, string> = {
        stores: t['tooltip-stores'],
        avg: t['th-avg'],
        max: t['th-max'],
        min: t['th-min']
      };

      return (
        <div className="bg-[var(--surface2)] border border-[var(--border)] p-3 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-[10px] font-mono text-[var(--text-muted)] mb-1 tracking-wider">{label}</p>
          {payload.map((entry: any, index: number) => {
            // Match the bar chart logic for daily average tooltip dots
            let dotColor = entry.color || entry.fill;
            if (isDailyAvg && entry.name === 'avg') {
              dotColor = entry.value >= stats.avg_stores ? '#FF441F' : 'rgba(255, 68, 31, 0.3)';
            }

            return (
              <div key={index} className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }} />
                <p className="text-sm font-bold">
                  {nameMap[entry.name] || entry.name}: {fmtExact(entry.value)}
                </p>
              </div>
            );
          })}
          {/* Only show global average reference in the main time-series chart tooltip */}
          {isMainChart && !payload.some((p: any) => p.name === 'avg') && showAverage && (
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <p className="text-sm font-bold">
                {t['chart-series-avg']} (Global): {fmtExact(stats.avg_stores)}
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
      {/* Main Line Area Chart */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold">{t['chart-title-main']}</h3>
            <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-tight">{t['chart-meta-main']}</p>
          </div>
          
          <div className="flex items-center gap-4 text-[10px] font-mono">
             <button 
               onClick={() => setShowStores(!showStores)}
               className={`flex items-center gap-1.5 px-2 py-1 rounded transition-all ${showStores ? 'opacity-100 bg-rappi-orange/10 border border-rappi-orange/30' : 'opacity-40 grayscale'}`}
             >
               <div className="w-2.5 h-2.5 rounded-full bg-rappi-orange shadow-[0_0_8px_rgba(255,68,31,0.4)]" />
               <span className={`uppercase font-bold ${showStores ? 'text-rappi-orange' : 'text-[var(--text-muted)]'}`}>
                 {t['chart-series-main']}
               </span>
             </button>

             <button 
               onClick={() => setShowAverage(!showAverage)}
               className={`flex items-center gap-1.5 px-2 py-1 rounded transition-all ${showAverage ? 'opacity-100 bg-yellow-500/10 border border-yellow-500/30' : 'opacity-40 grayscale'}`}
             >
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(245,200,66,0.4)]" />
               <span className={`uppercase font-bold ${showAverage ? 'text-yellow-500' : 'text-[var(--text-muted)]'}`}>
                 {t['chart-series-avg']}
               </span>
             </button>
          </div>
        </div>

        <div className="h-[400px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={displaySeries} margin={{ top: 20, right: 150, left: 10, bottom: 40 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF441F" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FF441F" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="t" 
                tickFormatter={formatXAxis} 
                tick={{ fontSize: 9, fill: 'var(--text-muted)', fontFamily: 'DM Mono' }}
                axisLine={false}
                tickLine={false}
                minTickGap={20}
                angle={-45}
                textAnchor="end"
                height={60}
                dy={10}
              />
              <YAxis 
                tick={{ fontSize: 9, fill: 'var(--text-muted)', fontFamily: 'DM Mono' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={fmtCompact}
                domain={['dataMin - 100', 'dataMax + 100']}
              />
              <Tooltip content={<CustomTooltip isMainChart={true} />} />
              
              <Area 
                type="monotone" 
                dataKey="v" 
                name="stores"
                stroke="#FF441F" 
                strokeWidth={2.5}
                fillOpacity={showStores ? 1 : 0} 
                strokeOpacity={showStores ? 1 : 0}
                fill="url(#colorValue)" 
                isAnimationActive={false}
              />

              {showAverage && (
                <ReferenceLine 
                   y={stats.avg_stores} 
                   stroke="#f5c842" 
                   strokeDasharray="5 5" 
                   strokeWidth={1.5}
                   label={{ 
                     position: 'right', 
                     value: `${t['chart-series-avg']}: ${fmtExact(stats.avg_stores)}`, 
                     fill: '#f5c842', 
                     fontSize: 10, 
                     fontWeight: 'bold',
                     fontFamily: 'DM Mono',
                     offset: 10
                   }} 
                />
              )}

              {/* Max Point Label & Marker */}
              {maxPoint && showStores && (
                <ReferenceLine 
                  y={maxPoint.v} 
                  stroke="#2dce72" 
                  strokeDasharray="3 3"
                  strokeOpacity={0.3}
                  label={{
                    position: 'right',
                    value: `${t['th-max']}: ${fmtExact(maxPoint.v)}`,
                    fill: '#2dce72',
                    fontSize: 10,
                    fontWeight: 'bold',
                    fontFamily: 'DM Mono',
                    offset: 10
                  }}
                />
              )}

              {/* Min Point Label & Marker */}
              {minPoint && showStores && (
                <ReferenceLine 
                  y={minPoint.v} 
                  stroke="#ff4858" 
                  strokeDasharray="3 3"
                  strokeOpacity={0.3}
                  label={{
                    position: 'right',
                    value: `${t['th-min']}: ${fmtExact(minPoint.v)}`,
                    fill: '#ff4858',
                    fontSize: 10,
                    fontWeight: 'bold',
                    fontFamily: 'DM Mono',
                    offset: 10
                  }}
                />
              )}

              {/* Highlighting Max and Min Points with Dots */}
              {maxPoint && showStores && (
                <ReferenceDot 
                  x={maxPoint.t} 
                  y={maxPoint.v} 
                  r={6} 
                  fill="#2dce72" 
                  stroke="white" 
                  strokeWidth={2}
                />
              )}
              {minPoint && showStores && (
                <ReferenceDot 
                  x={minPoint.t} 
                  y={minPoint.v} 
                  r={6} 
                  fill="#ff4858" 
                  stroke="white" 
                  strokeWidth={2}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">{t['chart-title-bar']}</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={daily} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(v) => v.slice(5)}
                  tick={{ fontSize: 9, fill: 'var(--text-muted)', fontFamily: 'DM Mono' }}
                  axisLine={false}
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                  dy={5}
                />
                <YAxis 
                  tick={{ fontSize: 8, fill: 'var(--text-muted)', fontFamily: 'DM Mono' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={fmtCompact}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                  content={<CustomTooltip isDailyAvg={true} />}
                />
                <Bar dataKey="avg" name="avg" radius={[4, 4, 0, 0]}>
                  {daily.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.avg >= stats.avg_stores ? '#FF441F' : 'rgba(255, 68, 31, 0.3)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
           <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">{t['chart-meta-table']}</h3>
           <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={daily} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(v) => v.slice(5)}
                  tick={{ fontSize: 9, fill: 'var(--text-muted)', fontFamily: 'DM Mono' }}
                  axisLine={false}
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                  dy={5}
                />
                <YAxis 
                  tick={{ fontSize: 8, fill: 'var(--text-muted)', fontFamily: 'DM Mono' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={fmtCompact}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" name="max" dataKey="max" stroke="#2dce72" fill="rgba(45, 206, 114, 0.1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
});
