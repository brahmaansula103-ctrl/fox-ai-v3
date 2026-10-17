import React from 'react';
import { RotateCw, Zap, TrendingUp, Activity, History, ShieldCheck } from 'lucide-react';
import { DrawItem, GameServer, PredictionRecord } from '../types/prediction';
import { FOX_MASCOT_IMAGE } from '../assets/mascot';
import { formatShortIssue, getNumberParity } from '../utils/engine';

interface TargetPredictionCardProps {
  prediction: PredictionRecord;
  server: GameServer;
  recentDraws: DrawItem[];
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const TargetPredictionCard: React.FC<TargetPredictionCardProps> = ({
  prediction,
  server,
  recentDraws,
  onRefresh,
  isRefreshing,
}) => {
  const isBig = prediction.parity === 'BIG';
  const last5 = recentDraws.slice(0, 5);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl transition-all">
      {/* Top rainbow glowing cyber accent bar matching Screenshot 5 */}
      <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400"></div>

      <div className="p-4 sm:p-5">
        {/* Header line matching Screenshot 5 */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-950 p-0.5 border border-cyan-400/40">
              <img
                src={FOX_MASCOT_IMAGE}
                alt="Target Mascot"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-zaoliya text-base font-black text-slate-900 dark:text-white tracking-wider">
                  TARGET {prediction.targetShort}
                </span>
                <span className="text-[9px] font-zaoliya font-bold px-1.5 py-0.5 rounded bg-lime-400/20 text-lime-600 dark:text-lime-400 border border-lime-500/30">
                  FOX V1.0
                </span>
              </div>
              <p className="text-[9px] font-zaoliya font-semibold tracking-wider text-slate-400 uppercase">
                LIVE PREDICTION CYCLE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-zaoliya font-bold text-slate-500 dark:text-slate-400 tracking-wider">
              {server} SERVER
            </span>
            <button
              onClick={onRefresh}
              className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition ${
                isRefreshing ? 'animate-spin text-cyan-500' : ''
              }`}
              title="Resync with Live Draw Server"
              aria-label="Refresh draw data"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-Level Logic Recovery Banner if LV2 FIX */}
        {prediction.level === 'LV2 FIX' && (
          <div className="mt-3 py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs animate-pulse">
            <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="font-zaoliya text-[11px]">2-LEVEL LOGIC: LV2 FIX (2X MARGIN RECOVERY)</span>
            </div>
            <span className="bg-amber-500 text-white font-zaoliya text-[9px] px-2 py-0.5 rounded-full font-bold">
              HIGH CONFIDENCE
            </span>
          </div>
        )}

        {/* Giant Main Prediction Display (BIG / SMALL) with ZAOLIYA square font */}
        <div className="py-6 sm:py-7 text-center">
          <div className="inline-block transition-transform hover:scale-105 duration-200">
            <h1
              className={`font-zaoliya text-6xl sm:text-7xl font-black tracking-tight select-none uppercase ${
                isBig
                  ? 'text-emerald-500 dark:text-emerald-400 drop-shadow-[0_2px_14px_rgba(16,185,129,0.35)]'
                  : 'text-rose-600 dark:text-rose-500 drop-shadow-[0_2px_14px_rgba(244,63,94,0.35)]'
              }`}
            >
              {prediction.parity}
            </h1>
          </div>

          {/* Subtitle Pill matching screenshot */}
          <div className="mt-2 flex justify-center">
            <span
              className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-zaoliya font-bold tracking-wider border ${
                isBig
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/80'
              }`}
            >
              {isBig ? 'HIGH PARITY OUTCOME (5-9)' : 'LOW PARITY OUTCOME (0-4)'}
            </span>
          </div>

          {/* Dual badges: Streak & Confidence */}
          <div className="mt-4 flex items-center justify-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-xs font-zaoliya font-bold tracking-wider">
              <Activity className="w-3.5 h-3.5 text-rose-500" />
              <span>{prediction.patternName}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-zaoliya font-bold tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
              <span>{prediction.confidence}% CONFIDENCE</span>
            </div>
          </div>
        </div>

        {/* JACKPOT LUCKY SEED NUMBERS */}
        <div className="mt-2 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-zaoliya font-bold text-slate-600 dark:text-slate-300 tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>JACKPOT LUCKY SEED NUMBERS</span>
          </div>

          {/* Seeds display boxes */}
          <div className="mt-3 flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100/80 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-inner group">
              <span className="font-zaoliya text-2xl font-black text-slate-900 dark:text-white">
                {prediction.luckySeeds[0]}
              </span>
            </div>

            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>

            <div className="w-14 h-14 rounded-2xl bg-slate-100/80 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-inner group">
              <span className="font-zaoliya text-2xl font-black text-slate-900 dark:text-white">
                {prediction.luckySeeds[1]}
              </span>
            </div>
          </div>

          <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            Direct number hit multipliers yield 9X return
          </p>
        </div>

        {/* LIVE SERVER DRAW TAPE (LAST 5 DRAWS) */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between text-xs mb-3">
            <div className="flex items-center gap-1.5 font-zaoliya font-bold text-slate-700 dark:text-slate-300 tracking-wider">
              <History className="w-3.5 h-3.5 text-rose-500" />
              <span>LIVE SERVER DRAW TAPE</span>
            </div>
            <span className="text-[10px] font-zaoliya font-semibold text-slate-400 uppercase tracking-wider">
              LAST 5 DRAWS
            </span>
          </div>

          {/* 5-Draw horizontal row */}
          <div className="grid grid-cols-5 gap-2">
            {last5.map((draw, idx) => {
              const num = parseInt(draw.number, 10);
              const drawParity = getNumberParity(num);
              const isGreen = draw.color.includes('green');
              const isViolet = draw.color.includes('violet');
              const isRed = draw.color.includes('red');

              return (
                <div
                  key={draw.issueNumber || idx}
                  className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2 border border-slate-200/60 dark:border-slate-700/60 text-center"
                >
                  <span className="text-[9px] font-zaoliya font-bold text-slate-400 truncate max-w-full">
                    {formatShortIssue(draw.issueNumber)}
                  </span>

                  {/* Draw Number Ball */}
                  <div
                    className={`my-1.5 w-8 h-8 rounded-lg flex items-center justify-center font-zaoliya font-bold text-sm text-white shadow-sm ${
                      isViolet
                        ? isGreen
                          ? 'bg-gradient-to-tr from-purple-600 to-emerald-500'
                          : 'bg-gradient-to-tr from-purple-600 to-rose-500'
                        : isGreen
                        ? 'bg-emerald-500'
                        : isRed
                        ? 'bg-rose-500'
                        : 'bg-slate-600'
                    }`}
                  >
                    {draw.number}
                  </div>

                  <span
                    className={`text-[9px] font-zaoliya font-bold uppercase ${
                      drawParity === 'BIG'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {drawParity}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Metrics Row */}
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center">
          <div>
            <span className="block text-[8px] font-zaoliya font-bold text-slate-400 uppercase tracking-wider">
              CYBER PARITY
            </span>
            <span className="font-zaoliya text-xs font-bold text-slate-800 dark:text-slate-200">
              HARMONIC
            </span>
          </div>

          <div>
            <span className="block text-[8px] font-zaoliya font-bold text-slate-400 uppercase tracking-wider">
              QUANT RSI
            </span>
            <span className="font-zaoliya text-xs font-bold text-emerald-600 dark:text-emerald-400">
              BALANCED
            </span>
          </div>

          <div>
            <span className="block text-[8px] font-zaoliya font-bold text-slate-400 uppercase tracking-wider">
              VOLATILITY
            </span>
            <span className="font-zaoliya text-xs font-bold text-sky-600 dark:text-sky-400">
              LOW RISK
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
