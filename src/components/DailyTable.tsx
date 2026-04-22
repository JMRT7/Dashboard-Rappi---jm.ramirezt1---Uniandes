/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { memo } from 'react';
import { DailySummary } from '../constants';

interface DailyTableProps {
  daily: DailySummary[];
  t: Record<string, string>;
}

export default memo(function DailyTable({ daily, t }: DailyTableProps) {
  const maxMax = Math.max(...daily.map(d => d.max));

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
        <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">{t['detailed-metrics']}</h3>
        <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--surface2)] px-2 py-0.5 rounded uppercase">N = {daily.length} {t['th-date']}s</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-mono text-[11px]">
          <thead className="bg-[var(--surface2)]/50 text-[var(--text-muted)] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 font-semibold">{t['th-date']}</th>
              <th className="px-6 py-3 font-semibold">{t['th-min']}</th>
              <th className="px-6 py-3 font-semibold">{t['th-avg']}</th>
              <th className="px-6 py-3 font-semibold text-rappi-orange">{t['th-max']}</th>
              <th className="px-6 py-3 font-semibold">{t['th-trend']}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {daily.map((row) => (
              <tr key={row.date} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-3 text-[var(--text)] font-medium">{row.date}</td>
                <td className="px-6 py-3 text-[var(--text-muted)]">{row.min.toLocaleString()}</td>
                <td className="px-6 py-3">{row.avg.toLocaleString()}</td>
                <td className="px-6 py-3 font-bold text-rappi-orange">{row.max.toLocaleString()}</td>
                <td className="px-6 py-3 w-40">
                  <div className="w-full h-1.5 bg-[var(--surface2)] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-rappi-orange opacity-70 group-hover:opacity-100 transition-all duration-500" 
                      style={{ width: `${(row.avg / maxMax) * 100}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
