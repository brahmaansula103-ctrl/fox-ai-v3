import React from 'react';
import { Sun, Moon, Palette, Sliders, Check } from 'lucide-react';
import { AccentColor, ThemeMode } from '../types/prediction';
import { ACCENT_MAP } from '../utils/accentTheme';
import { playTickSound } from '../utils/audio';

interface SettingsAppearanceSectionProps {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  accent: AccentColor;
  setAccent: (a: AccentColor) => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (v: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  confettiEnabled: boolean;
  setConfettiEnabled: (v: boolean) => void;
}

export const SettingsAppearanceSection: React.FC<SettingsAppearanceSectionProps> = ({
  theme,
  setTheme,
  accent,
  setAccent,
  voiceEnabled,
  setVoiceEnabled,
  soundEnabled,
  setSoundEnabled,
  confettiEnabled,
  setConfettiEnabled,
}) => {
  const accentStyle = ACCENT_MAP[accent] || ACCENT_MAP['crimson-red'];

  const accentOptions: { id: AccentColor; label: string; colorClass: string }[] = [
    { id: 'royal-blue', label: 'ROYAL BLUE', colorClass: 'bg-blue-600' },
    { id: 'emerald-jade', label: 'EMERALD JADE', colorClass: 'bg-emerald-500' },
    { id: 'royal-violet', label: 'ROYAL VIOLET', colorClass: 'bg-purple-600' },
    { id: 'crimson-red', label: 'CRIMSON RED', colorClass: 'bg-rose-600' },
    { id: 'amber-gold', label: 'AMBER GOLD', colorClass: 'bg-amber-500' },
    { id: 'teal-ocean', label: 'TEAL OCEAN', colorClass: 'bg-teal-600' },
    { id: 'sky-blue', label: 'SKY BLUE', colorClass: 'bg-sky-500' },
  ];

  const handleSelectAccent = (newAccent: AccentColor) => {
    setAccent(newAccent);
    if (soundEnabled) {
      playTickSound();
    }
  };

  const handleSelectTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    if (soundEnabled) {
      playTickSound();
    }
  };

  return (
    <div className="space-y-4">
      {/* INTERFACE APPEARANCE (DAY / NIGHT MODE) */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-500" />
          <h2 className="font-zaoliya text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wider">
            INTERFACE APPEARANCE (DAY / NIGHT)
          </h2>
        </div>

        {/* Light & Dark Mode Choice Cards matching Screenshot 2 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Light Mode (Day) */}
          <button
            onClick={() => handleSelectTheme('light')}
            className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all ${
              theme === 'light'
                ? `bg-slate-50 dark:bg-slate-800/80 border-2 ${accentStyle.border} shadow-sm`
                : 'bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 hover:border-slate-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-2 shadow-xs">
              <Sun className="w-5 h-5 text-amber-500" />
            </div>

            <span className="font-zaoliya text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wide">
              LIGHT MODE
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5 font-zaoliya">
              Clean Day Contrast
            </span>

            {theme === 'light' && (
              <span className={`mt-2 text-[10px] font-zaoliya font-bold ${accentStyle.text} flex items-center gap-1`}>
                <Check className="w-3 h-3 stroke-[3]" /> ACTIVE
              </span>
            )}
          </button>

          {/* Dark Mode (Night) */}
          <button
            onClick={() => handleSelectTheme('dark')}
            className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all ${
              theme === 'dark'
                ? `bg-slate-50 dark:bg-slate-800/80 border-2 ${accentStyle.border} shadow-sm`
                : 'bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 hover:border-slate-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-2 shadow-xs">
              <Moon className="w-5 h-5 text-sky-400" />
            </div>

            <span className="font-zaoliya text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wide">
              DARK MODE
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5 font-zaoliya">
              Sleek Cybernetic Night
            </span>

            {theme === 'dark' && (
              <span className={`mt-2 text-[10px] font-zaoliya font-bold ${accentStyle.text} flex items-center gap-1`}>
                <Check className="w-3 h-3 stroke-[3]" /> ACTIVE
              </span>
            )}
          </button>
        </div>
      </div>

      {/* COLOR ACCENT THEMES */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-rose-500" />
          <h2 className="font-zaoliya text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wider">
            COLOR ACCENT THEMES
          </h2>
        </div>

        {/* 2-column accent options matching Screenshot 2 */}
        <div className="grid grid-cols-2 gap-2">
          {accentOptions.map((opt) => {
            const isSelected = accent === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectAccent(opt.id)}
                className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl transition border text-left active:scale-98 ${
                  isSelected
                    ? `${accentStyle.lightBg} ${accentStyle.border} border-2 shadow-xs`
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3.5 h-3.5 rounded-full ${opt.colorClass} shadow-xs`}></span>
                  <span className="font-zaoliya text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wider">
                    {opt.label}
                  </span>
                </div>

                {isSelected && <Check className={`w-4 h-4 ${accentStyle.text} stroke-[3]`} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* AUDIO & ANIMATION PREFERENCES */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-rose-500" />
          <h2 className="font-zaoliya text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-wider">
            AUDIO & ANIMATION PREFERENCES
          </h2>
        </div>

        <div className="space-y-3.5">
          {/* Voice Announcements */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="font-zaoliya text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wide block">
                Voice Announcements
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-zaoliya">
                Audio callouts for predictions & wins
              </span>
            </div>

            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                voiceEnabled ? accentStyle.bg : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  voiceEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Sound Effects & Beeps */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <span className="font-zaoliya text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wide block">
                Sound Effects & Beeps
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-zaoliya">
                Timer countdown beeps & harmonic win chimes
              </span>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                soundEnabled ? accentStyle.bg : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Confetti Celebrations */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <span className="font-zaoliya text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wide block">
                Confetti Celebrations
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-zaoliya">
                Particle explosion effects on winning outcomes
              </span>
            </div>

            <button
              onClick={() => setConfettiEnabled(!confettiEnabled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                confettiEnabled ? accentStyle.bg : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  confettiEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
