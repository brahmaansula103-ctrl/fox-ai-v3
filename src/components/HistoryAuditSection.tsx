import React, { useState } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { PredictionRecord } from '../types/prediction';

interface HistoryAuditSectionProps {
  records: PredictionRecord[];
}

export const HistoryAuditSection: React.FC<HistoryAuditSectionProps> = ({ records }) => {
  const [filter, setFilter] = useState<'ALL' | 'LV1' | 'LV2'>('ALL');

  const filtered = records.filter((r) => {
    if (filter === 'LV1') return r.level === 'LV1';
    if (filter === 'LV2') return r.level === 'LV2 FIX';
    return true;
  });

  return (
    <div className="space-y-3">
      {/* Header and Filter */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <h2 className="font-zaoliya text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wider">
            2-LEVEL LOGIC AUDIT LOG
          </h2>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-[10px] font-zaoliya font-bold">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-2 py-0.5 rounded-lg transition ${
              filter === 'ALL'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setFilter('LV1')}
            className={`px-2 py-0.5 rounded-lg transition ${
              filter === 'LV1'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            LV1
          </button>
          <button
            onClick={() => setFilter('LV2')}
            className={`px-2 py-0.5 rounded-lg transition ${
              filter === 'LV2'
                ? 'bg-cyan-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            LV2 FIX
          </button>
        </div>
      </div>

      {/* Rows Container matching Screenshot 4 */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs font-zaoliya">
            NO AUDIT RECORDS FOR SELECTED FILTER
          </div>
        ) : (
          filtered.map((item, idx) => {
            const isBig = item.parity === 'BIG';
            const isLv2 = item.level === 'LV2 FIX';
            const isWin = item.isWin ?? true;

            return (
              <div
                key={item.issueNumber || idx}
                className={`relative flex items-center justify-between gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border transition-all ${
                  isLv2
                    ? 'border-cyan-400/80 dark:border-cyan-500/60 shadow-sm'
                    : 'border-emerald-300/60 dark:border-emerald-900/40 shadow-xs'
                }`}
              >
                {/* Left side: Period, Pattern, Level */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-zaoliya text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-wider">
                      {item.targetShort}
                    </span>

                    <span className="text-[9px] font-zaoliya font-semibold tracking-wider text-slate-400 uppercase truncate max-w-[130px] sm:max-w-[180px]">
                      {item.patternName}
                    </span>

                    {/* Level Badge matching Screenshot 4: [LV1] or [LV2 FIX] */}
                    <span
                      className={`text-[9px] font-zaoliya font-bold px-1.5 py-0.2 rounded-md ${
                        isLv2
                          ? 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800'
                          : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      }`}
                    >
                      {item.level}
                    </span>
                  </div>

                  {/* Predictions Details row */}
                  <div className="mt-1.5 flex items-center gap-1.5 flex-wrap text-xs">
                    {/* Parity Badge */}
                    <span
                      className={`text-[10px] font-zaoliya font-black px-2 py-0.5 rounded-md text-white ${
                        isBig ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}
                    >
                      {item.parity}
                    </span>

                    {/* Color Badge */}
                    <span
                      className={`text-[10px] font-zaoliya font-bold px-1.5 py-0.5 rounded border ${
                        item.color === 'GREEN'
                          ? 'text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30'
                          : 'text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30'
                      }`}
                    >
                      {item.color}
                    </span>

                    {/* Seeds */}
                    <span className="text-[10px] font-zaoliya text-slate-500 dark:text-slate-400 font-semibold">
                      [{item.luckySeeds.join(', ')}]
                    </span>

                    {/* Draw Outcome */}
                    {item.drawResult && (
                      <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 ml-0.5">
                        Draw:{' '}
                        <strong className="text-slate-900 dark:text-white font-zaoliya font-bold">
                          {item.drawResult.number}
                        </strong>{' '}
                        ({item.drawResult.parity})
                      </span>
                    )}
                  </div>
                </div>

                {/* Right side: WIN button pill matching Screenshot 4 */}
                <div className="flex-shrink-0">
                  {isWin ? (
                    <div className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-zaoliya text-xs sm:text-sm font-black tracking-wider shadow-sm">
                      <span>WIN</span>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-500 text-white font-zaoliya text-xs font-bold tracking-wider">
                      <span>LOSS</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
