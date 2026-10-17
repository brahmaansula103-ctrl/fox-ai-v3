import React from 'react';
import {
  Brain,
  Cpu,
  Compass,
  Shield,
  Share2,
  Ghost,
  Trophy,
  AlertTriangle,
  Send,
  Info,
} from 'lucide-react';
import { PredictionNode, PredictorStats } from '../types/prediction';
import { TELEGRAM_VIP_LINK } from '../utils/constants';

interface AiCouncilSectionProps {
  nodes: PredictionNode[];
  stats: PredictorStats;
  onOpenTelegram: () => void;
}

export const AiCouncilSection: React.FC<AiCouncilSectionProps> = ({
  nodes,
  stats,
  onOpenTelegram,
}) => {
  const getNodeIcon = (icon: PredictionNode['icon']) => {
    switch (icon) {
      case 'brain':
        return <Brain className="w-5 h-5 text-rose-500" />;
      case 'chip':
        return <Cpu className="w-5 h-5 text-rose-500" />;
      case 'orion':
        return <Compass className="w-5 h-5 text-rose-500" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-rose-500" />;
      case 'vector':
        return <Share2 className="w-5 h-5 text-rose-500" />;
      case 'phantom':
        return <Ghost className="w-5 h-5 text-rose-500" />;
      default:
        return <Brain className="w-5 h-5 text-rose-500" />;
    }
  };

  const handleOpenTelegramLink = () => {
    window.open(TELEGRAM_VIP_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4">
      {/* AI COUNCIL CONSENSUS BOX */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600">
              <Cpu className="w-4 h-4" />
            </div>
            <h2 className="font-zaoliya text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wider">
              AI COUNCIL CONSENSUS
            </h2>
          </div>

          <span className="text-[10px] font-zaoliya font-bold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
            6/6 NODES ACTIVE
          </span>
        </div>

        {/* 6 AI Nodes Grid */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {nodes.map((node) => {
            const isBig = node.vote === 'BIG';
            return (
              <div
                key={node.name}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 text-center hover:border-slate-300 dark:hover:border-slate-700 transition"
              >
                <div className="mb-1 p-1.5 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-slate-100 dark:border-slate-700">
                  {getNodeIcon(node.icon)}
                </div>

                <span className="font-zaoliya text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider">
                  {node.name}
                </span>

                <span
                  className={`mt-1 font-zaoliya text-sm font-black tracking-wide ${
                    isBig
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {node.vote}
                </span>

                <span className="text-[10px] font-zaoliya font-bold text-slate-400 dark:text-slate-500">
                  {node.confidence}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* WINS & LOSSES STATS CARDS */}
      <div className="grid grid-cols-2 gap-3">
        {/* WINS CARD */}
        <div className="rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-zaoliya font-bold text-emerald-800 dark:text-emerald-300 tracking-wider">
            <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>WINS</span>
          </div>

          <div className="my-1.5 font-zaoliya text-4xl font-black text-emerald-600 dark:text-emerald-400">
            {stats.wins}
          </div>

          <span className="text-[11px] font-zaoliya font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">
            WIN RATE: {stats.winRate}%
          </span>
        </div>

        {/* LOSSES CARD */}
        <div className="rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/60 p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-zaoliya font-bold text-rose-800 dark:text-rose-300 tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>LOSSES</span>
          </div>

          <div className="my-1.5 font-zaoliya text-4xl font-black text-rose-600 dark:text-rose-400">
            {stats.losses}
          </div>

          <span className="text-[11px] font-zaoliya font-bold text-rose-700 dark:text-rose-400 tracking-wider">
            STREAK: {stats.currentStreak}W
          </span>
        </div>
      </div>

      {/* JOIN OFFICIAL VIP TELEGRAM BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 p-4 text-white shadow-lg shadow-sky-500/20">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-inner">
              <Send className="w-5 h-5 text-white -rotate-12 translate-x-0.5" />
            </div>
            <div>
              <h3 className="font-zaoliya text-sm sm:text-base font-black tracking-wide flex items-center gap-1.5 leading-tight">
                JOIN OFFICIAL VIP TELEGRAM ✨
              </h3>
              <p className="text-xs text-sky-100/90 font-medium mt-0.5 font-zaoliya">
                Daily Signals & Direct Support
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenTelegramLink}
            className="px-4 py-2 rounded-xl bg-white text-blue-600 font-zaoliya text-xs sm:text-sm font-black tracking-wider uppercase shadow-md hover:bg-sky-50 hover:scale-105 active:scale-95 transition-all flex-shrink-0"
          >
            OPEN
          </button>
        </div>
      </div>

      {/* 2X MARGIN MANAGEMENT NOTICE */}
      <div className="rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 p-3.5 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-zaoliya font-bold text-amber-900 dark:text-amber-300 tracking-wider block">
            USE STRICT 2X MARGIN MANAGEMENT (1X, 2X, 4X, 8X)
          </span>
          <p className="text-amber-800/80 dark:text-amber-400/80 mt-0.5 font-medium leading-relaxed">
            Follow disciplined stop-loss and profit targets for consistent results.
          </p>
        </div>
      </div>
    </div>
  );
};
