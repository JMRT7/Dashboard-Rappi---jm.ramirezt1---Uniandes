/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { memo } from 'react';
import { DashboardStats } from '../constants';
import { clsx } from 'clsx';
import { Zap } from 'lucide-react';

interface KpiCardsProps {
  stats: DashboardStats;
  selectedKpi: string;
  onSelect: (id: string) => void;
  t: Record<string, string>;
}

export default memo(function KpiCards({ stats, selectedKpi, onSelect, t }: KpiCardsProps) {
  const formatValue = (n: number) => {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return n.toFixed(0);
  };

  const cards = [
    { id: 'avg', label: t['kpi-avg-label'], value: formatValue(stats.avg_stores), sub: t['kpi-avg-sub'], accent: true, orange: true },
    { id: 'max', label: t['kpi-max-label'], value: formatValue(stats.max_stores), sub: t['kpi-max-sub'], accent: false, orange: true },
    { id: 'uptime', label: t['kpi-uptime-label'], value: stats.uptime_pct.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%', sub: t['kpi-uptime-sub'], accent: false, green: true },
    { id: 'median', label: t['kpi-median-label'], value: formatValue(stats.median_stores), sub: t['kpi-median-sub'], accent: false },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <button
          key={card.id}
          onClick={() => onSelect(card.id)}
          className={clsx(
            "relative flex flex-col p-5 rounded-2xl border text-left transition-all duration-300 group overflow-hidden",
            selectedKpi === card.id 
              ? "bg-[var(--surface2)] border-rappi-orange/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" 
              : "bg-[var(--surface)] border-[var(--border)] hover:border-rappi-orange/20"
          )}
        >
          {selectedKpi === card.id && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-rappi-orange z-10" />
          )}
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-1">
            {card.label}
          </span>
          <span className={clsx(
            "text-3xl font-extrabold tracking-tighter mb-2 transition-colors",
            (card.id === 'avg' || card.id === 'max') && "text-rappi-orange",
            card.green && "text-green-500"
          )}>
            {card.value}
          </span>
          <p className="text-[11px] text-[var(--text-muted)] font-medium">
            {card.sub}
          </p>
          
          <div className="absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity">
            <Zap size={40} className="text-white" />
          </div>
        </button>
      ))}
    </div>
  );
});
