import React from 'react';
import { Sun, Moon, Send, Volume2, VolumeX, Radio, Server, LogOut, Target, History, Cpu, Calculator, Settings } from 'lucide-react';
import { GameServer, ThemeMode, ActiveTab, AccentColor } from '../types/prediction';
import { FOX_MASCOT_IMAGE } from '../assets/mascot';
import { TELEGRAM_VIP_LINK } from '../utils/constants';
import { ACCENT_MAP } from '../utils/accentTheme';

interface HeaderProps {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  accent: AccentColor;
  server: GameServer;
  setServer: (s: GameServer) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  remainingSeconds: number;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isLv2Active: boolean;
  onOpenHero: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  setTheme,
  accent,
  server,
  setServer,
  soundEnabled,
  setSoundEnabled,
  remainingSeconds,
  activeTab,
  setActiveTab,
  isLv2Active,
  onOpenHero,
  onLogout,
}) => {
  const accentStyle = ACCENT_MAP[accent] || ACCENT_MAP['crimson-red'];

  const handleOpenTelegram = () => {
    window.open(TELEGRAM_VIP_LINK, '_blank', 'noopener,noreferrer');
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Top navigation tabs with "2-LEVEL HISTORY"
  const topTabs = [
    { id: 'prediction' as ActiveTab, label: 'PREDICTION', icon: Target },
    {
      id: 'audit' as ActiveTab,
      label: '2-LEVEL HISTORY',
      icon: History,
      badge: isLv2Active ? 'LV2' : undefined,
    },
    { id: 'council' as ActiveTab, label: 'COUNCIL', icon: Cpu },
    { id: 'calculator' as ActiveTab, label: '2X MARGIN', icon: Calculator },
    { id: 'settings' as ActiveTab, label: 'SETTINGS', icon: Settings },
  ];

  return (
    <>
      {/* 
        STICKY PINNED SECTION: PROFILE AND SERVER DO NOT SCROLL ("server or Profile scroll nihi karega")
        Remains pinned at the very top of the screen at all times!
      */}
      <div className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors duration-200">
        <div className="max-w-md mx-auto px-3.5 pt-2.5 pb-2 space-y-2">
          {/* Top Profile & Controls Row */}
          <div className="flex items-center justify-between gap-1.5">
            {/* Profile Identity */}
            <button
              onClick={onOpenHero}
              className="flex items-center gap-2.5 text-left group focus:outline-none flex-shrink-0"
              title="Click to view Fox AI Info"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-slate-950 p-0.5 border border-cyan-400/50 shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                <img
                  src={FOX_MASCOT_IMAGE}
                  alt="FOX AI Mascot"
                  className="w-full h-full object-cover rounded-lg"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-zaoliya text-base sm:text-lg font-black tracking-wider text-slate-900 dark:text-white leading-none">
                    FOX AI
                  </span>
                  <span className="text-[9px] font-zaoliya font-bold px-1.5 py-0.5 rounded bg-lime-400/20 text-lime-600 dark:text-lime-400 border border-lime-500/30 leading-none">
                    FOX V1.0
                  </span>
                </div>
                <p className="text-[8px] font-zaoliya font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase mt-0.5">
                  ADVANCED COLOR PREDICTION
                </p>
              </div>
            </button>

            {/* Profile Top Controls */}
            <div className="flex items-center gap-1.5">
              {/* Telegram Channel Button */}
              <button
                onClick={handleOpenTelegram}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-sky-500 text-white hover:bg-sky-600 transition shadow-xs active:scale-95"
                title="Official VIP Telegram Channel"
                aria-label="Open Telegram"
              >
                <Send className="w-3.5 h-3.5 -rotate-12 translate-x-0.5" />
              </button>

              {/* Day / Night Theme Toggle */}
              <button
                onClick={handleToggleTheme}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition border ${
                  theme === 'dark'
                    ? 'bg-slate-800 text-amber-400 border-slate-700 shadow-xs'
                    : 'bg-amber-50 text-amber-600 border-amber-200 shadow-xs'
                }`}
                title={theme === 'dark' ? 'Switch to Day Mode (Light)' : 'Switch to Night Mode (Dark)'}
                aria-label="Toggle Night/Day Mode"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Audio Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition border ${
                  soundEnabled
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300/80 dark:border-slate-700'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-500 border-rose-200 dark:border-rose-900'
                }`}
                title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
                aria-label="Toggle Audio"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Return to Login / Lock */}
              <button
                onClick={onLogout}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition border border-slate-200 dark:border-slate-700"
                title="Lock / Return to Login Page"
                aria-label="Lock App"
              >
                <LogOut className="w-4 h-4" />
              </button>

              {/* Live Draw Timer Box matching Screenshot */}
              <div className="bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-0.5 text-center min-w-[58px]">
                <span className="block text-[7px] font-zaoliya font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight leading-tight">
                  {server} DRAW
                </span>
                <span
                  className={`font-mono-code text-xs sm:text-sm font-extrabold leading-tight tracking-tight ${
                    remainingSeconds <= 5
                      ? 'text-rose-600 dark:text-rose-400 animate-pulse'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {remainingSeconds}s
                </span>
              </div>
            </div>
          </div>

          {/* Server Switcher Bar - PINNED AT TOP (DOES NOT SCROLL) */}
          <div className="grid grid-cols-2 gap-2 bg-slate-100/90 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <button
              onClick={() => setServer('30S')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl font-zaoliya text-xs font-bold tracking-wider transition-all ${
                server === '30S'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs border border-slate-200/90 dark:border-slate-600'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${server === '30S' ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`} />
              SERVER 1 (30S)
            </button>

            <button
              onClick={() => setServer('1M')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl font-zaoliya text-xs font-bold tracking-wider transition-all ${
                server === '1M'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs border border-slate-200/90 dark:border-slate-600'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Server className={`w-3.5 h-3.5 ${server === '1M' ? 'text-sky-500' : 'text-slate-400'}`} />
              SERVER 2 (1M)
            </button>
          </div>
        </div>
      </div>

      {/* 
        SCROLLABLE NAVIGATION BUTTONS BAR:
        This section is in normal document flow, so when the user scrolls down, 
        it scrolls up naturally with the rest of the prediction content!
      */}
      <div className="max-w-md mx-auto px-3.5 pt-2 pb-0.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {topTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[76px] relative flex flex-col items-center justify-center py-2 px-1.5 rounded-2xl font-zaoliya text-[9px] sm:text-[10px] font-bold tracking-wider transition-all active:scale-95 ${
                  isActive
                    ? `bg-gradient-to-r ${accentStyle.bgGradient} text-white shadow-md ${accentStyle.shadow} border border-white/20`
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 shadow-xs'
                }`}
              >
                <div className="relative mb-0.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  {tab.badge && (
                    <span className="absolute -top-1 -right-2 px-1 rounded-full bg-cyan-400 text-slate-950 font-zaoliya text-[7px] font-black animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
