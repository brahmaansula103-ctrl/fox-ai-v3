import React, { useState } from 'react';
import {
  Send,
  UserCheck,
  Calculator,
  ExternalLink,
  Wallet,
  Sparkles,
} from 'lucide-react';
import { TELEGRAM_VIP_LINK } from '../utils/constants';
import { AccentColor } from '../types/prediction';
import { ACCENT_MAP } from '../utils/accentTheme';

interface MarginCalculatorSectionProps {
  onOpenTelegram: () => void;
  onContactAdmin: () => void;
  accent?: AccentColor;
}

export const MarginCalculatorSection: React.FC<MarginCalculatorSectionProps> = ({
  onContactAdmin,
  accent = 'crimson-red',
}) => {
  const [baseStake, setBaseStake] = useState<number>(10);
  const presets = [10, 50, 100, 500];

  const accentStyle = ACCENT_MAP[accent] || ACCENT_MAP['crimson-red'];

  const l1 = baseStake;
  const l2 = baseStake * 2;
  const l3 = baseStake * 4;
  const l4 = baseStake * 8;
  const totalRecommended = l1 + l2 + l3 + l4;

  const handleOpenTelegram = () => {
    window.open(TELEGRAM_VIP_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4">
      {/* FOX AI VIP ACCESS PORTAL */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h2 className="font-zaoliya text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wider">
            FOX AI · VIP ACCESS PORTAL
          </h2>
        </div>

        {/* Telegram Big Button with specific link */}
        <button
          onClick={handleOpenTelegram}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-zaoliya text-xs sm:text-sm font-black tracking-wider shadow-md hover:from-blue-700 hover:to-sky-600 transition active:scale-98"
        >
          <div className="flex items-center gap-2.5">
            <Send className="w-4 h-4 -rotate-12 translate-x-0.5" />
            <span>JOIN OFFICIAL VIP TELEGRAM</span>
          </div>
          <ExternalLink className="w-4 h-4 opacity-80" />
        </button>

        {/* Contact Admin Direct */}
        <button
          onClick={onContactAdmin}
          className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-zaoliya text-xs sm:text-sm font-bold tracking-wider hover:bg-slate-100 dark:hover:bg-slate-750 transition"
        >
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-4 h-4 text-emerald-500" />
            <span>CONTACT VIP ADMIN DIRECT</span>
          </div>
          <span className="text-[10px] font-zaoliya font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
            ONLINE
          </span>
        </button>
      </div>

      {/* 2X MARGIN CAPITAL CALCULATOR */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-lg space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-rose-500" />
            <h3 className="font-zaoliya text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wider">
              2X MARGIN CAPITAL CALCULATOR
            </h3>
          </div>

          <span className="text-[10px] font-zaoliya font-bold px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
            LOW RISK MATRIX
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          Select your base starting stake to compute optimal 4-stage 2X Margin reserves:
        </p>

        {/* Base Stake Selectors matching chosen Accent */}
        <div className="grid grid-cols-4 gap-2">
          {presets.map((stake) => (
            <button
              key={stake}
              onClick={() => setBaseStake(stake)}
              className={`py-2 px-1 rounded-xl font-zaoliya text-sm font-bold tracking-wider transition ${
                baseStake === stake
                  ? `${accentStyle.bg} text-white shadow-md ${accentStyle.shadow}`
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              ₹{stake}
            </button>
          ))}
        </div>

        {/* 4 Levels list */}
        <div className="space-y-2 pt-2">
          {/* L1 */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className={`w-7 h-7 rounded-lg ${accentStyle.badgeBg} font-zaoliya font-bold text-xs flex items-center justify-center`}>
                L1
              </span>
              <div>
                <span className="font-zaoliya text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wide block">
                  LEVEL 1 (1X BASE)
                </span>
                <span className="text-[10px] text-slate-400 block font-zaoliya">
                  First initial round stake
                </span>
              </div>
            </div>
            <span className="font-zaoliya text-sm font-bold text-slate-900 dark:text-white">
              ₹{l1.toLocaleString()}
            </span>
          </div>

          {/* L2 */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-zaoliya font-bold text-xs flex items-center justify-center">
                L2
              </span>
              <div>
                <span className="font-zaoliya text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wide block">
                  LEVEL 2 (2X MARGIN)
                </span>
                <span className="text-[10px] text-amber-600/80 dark:text-amber-400/80 block font-zaoliya">
                  Recovers L1 and locks profit
                </span>
              </div>
            </div>
            <span className="font-zaoliya text-sm font-bold text-slate-900 dark:text-white">
              ₹{l2.toLocaleString()}
            </span>
          </div>

          {/* L3 */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-zaoliya font-bold text-xs flex items-center justify-center">
                L3
              </span>
              <div>
                <span className="font-zaoliya text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wide block">
                  LEVEL 3 (4X MARGIN)
                </span>
                <span className="text-[10px] text-slate-400 block font-zaoliya">
                  Quantum hedge safety net
                </span>
              </div>
            </div>
            <span className="font-zaoliya text-sm font-bold text-slate-900 dark:text-white">
              ₹{l3.toLocaleString()}
            </span>
          </div>

          {/* L4 */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-zaoliya font-bold text-xs flex items-center justify-center">
                L4
              </span>
              <div>
                <span className="font-zaoliya text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wide block">
                  LEVEL 4 (8X SHIELD)
                </span>
                <span className="text-[10px] text-slate-400 block font-zaoliya">
                  Final shield reserve
                </span>
              </div>
            </div>
            <span className="font-zaoliya text-sm font-bold text-slate-900 dark:text-white">
              ₹{l4.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Total Wallet Required */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Wallet className={`w-4 h-4 ${accentStyle.text}`} />
            <span className="font-zaoliya text-xs sm:text-sm font-black text-slate-900 dark:text-white tracking-wider">
              RECOMMENDED 2X WALLET:
            </span>
          </div>
          <span className={`font-zaoliya text-lg sm:text-xl font-black ${accentStyle.text}`}>
            ₹{totalRecommended.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
