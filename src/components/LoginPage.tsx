import React, { useState } from 'react';
import { Share2, Copy, Check, Send, Sun, Moon, Volume2, VolumeX, Shield, Lock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { FOX_MASCOT_IMAGE } from '../assets/mascot';
import { TELEGRAM_VIP_LINK, DEFAULT_ACCESS_CODE } from '../utils/constants';
import { ThemeMode } from '../types/prediction';
import { playWinSound, speakAnnouncement } from '../utils/audio';

interface LoginPageProps {
  onVerified: () => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onVerified,
  theme,
  setTheme,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [accessCode, setAccessCode] = useState(DEFAULT_ACCESS_CODE);
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accessCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'FOX AI Prediction Platform',
          text: `Join FOX AI 2-Level Color Predictor with Activation Code: ${accessCode}\nVIP Channel: ${TELEGRAM_VIP_LINK}`,
          url: TELEGRAM_VIP_LINK,
        })
        .catch(() => {});
    } else {
      handleCopy();
    }
  };

  const handleVerifyClick = () => {
    if (isVerifying) return;
    setIsVerifying(true);

    if (soundEnabled) {
      playWinSound();
    }
    speakAnnouncement('Verifying VIP credentials. Access granted.');

    setTimeout(() => {
      setVerifiedSuccess(true);
      setTimeout(() => {
        onVerified();
      }, 500);
    }, 800);
  };

  const handleOpenTelegram = () => {
    window.open(TELEGRAM_VIP_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center selection:bg-pink-500 selection:text-white">
      <div className="w-full max-w-[440px] min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 cyber-grid flex flex-col justify-between p-4 sm:p-5 transition-colors border-x border-slate-200/50 dark:border-slate-800/80 shadow-2xl overflow-x-hidden">
        {/* Top Bar with Controls */}
        <header className="w-full flex items-center justify-between pt-1 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl overflow-hidden bg-slate-950 p-0.5 border border-cyan-400/50 shadow-sm">
            <img src={FOX_MASCOT_IMAGE} alt="Mascot Icon" className="w-full h-full object-cover rounded-lg" />
          </div>
          <span className="font-zaoliya text-sm font-bold tracking-wider text-slate-900 dark:text-white">
            FOX AI
          </span>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Telegram Channel Button */}
          <button
            onClick={handleOpenTelegram}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-zaoliya text-[11px] font-bold shadow-md shadow-sky-500/25 transition active:scale-95"
            title="Open Telegram Channel"
          >
            <Send className="w-3.5 h-3.5 -rotate-12 translate-x-0.5" />
            <span>VIP CHANNEL</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs hover:scale-105 transition"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs hover:scale-105 transition"
            aria-label="Toggle Audio"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
          </button>
        </div>
      </header>

      {/* Main Center Hero Card matching Screenshot 1 1-to-1 */}
      <main className="max-w-md mx-auto w-full flex-1 flex flex-col items-center justify-center py-4">
        {/* 3D Mascot Image with cybernetic glow */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-pink-500/20 to-lime-500/20 rounded-3xl blur-2xl transform scale-95"></div>
          <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-cyan-400/60 shadow-2xl neon-glow-cyan bg-slate-950">
            <img
              src={FOX_MASCOT_IMAGE}
              alt="FOX AI 3D Mascot"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* FOX AI Title & Subtitle with ZAOLIYA / Orbitron Typography */}
        <div className="text-center space-y-1.5 px-2">
          <h1 className="font-zaoliya text-5xl sm:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-pink-500 drop-shadow-[0_4px_16px_rgba(14,165,233,0.35)] uppercase">
            FOX AI
          </h1>

          <h2 className="font-zaoliya text-sm sm:text-base font-extrabold tracking-wider text-slate-900 dark:text-white uppercase leading-snug">
            ADVANCED COLOR PREDICTION PLATFORM
          </h2>

          <div className="pt-0.5">
            <span className="inline-block font-zaoliya text-sm font-extrabold tracking-wider text-lime-600 dark:text-lime-400 drop-shadow-[0_0_8px_rgba(132,204,22,0.4)]">
              FOX V1.0
            </span>
          </div>
        </div>

        {/* Telegram VIP Channel Banner */}
        <div className="w-full mt-4">
          <button
            onClick={handleOpenTelegram}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-sky-500/20 hover:opacity-95 transition group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">
                <Send className="w-4 h-4 text-white -rotate-12 translate-x-0.5 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <span className="font-zaoliya text-xs font-bold block tracking-wider">
                  JOIN VIP TELEGRAM CHANNEL
                </span>
                <span className="text-[10px] text-sky-100 font-mono-code block">
                  https://t.me/+ac6ZAZQH0uI3NDI1
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-white text-blue-600 font-zaoliya text-[10px] font-black uppercase shadow-xs">
              JOIN
            </span>
          </button>
        </div>

        {/* Code Activation Box matching Screenshot 1 */}
        <div className="w-full mt-3.5 flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border-2 border-sky-300 dark:border-sky-800 text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-800 flex items-center justify-center shadow-sm transition active:scale-95 flex-shrink-0"
            title="Share Referral Code"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border-2 border-sky-300 dark:border-sky-800 text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-800 flex items-center justify-center shadow-sm transition active:scale-95 flex-shrink-0"
            title="Copy Code"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
          </button>

          {/* Activation Code Input Container (matching lime pill in Screenshot 1) */}
          <div className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-lime-300/40 dark:bg-lime-400/20 border-2 border-lime-400 text-slate-900 dark:text-white font-zaoliya text-sm font-extrabold tracking-wider shadow-sm transition">
            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="bg-transparent font-zaoliya text-sm font-black tracking-wider text-slate-900 dark:text-white outline-none w-full uppercase"
              placeholder="ENTER VIP CODE"
            />
            <button
              onClick={handleCopy}
              className="ml-2 text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white"
              title="Copy"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Verification Status Feedback */}
        {isVerifying && (
          <div className="mt-3 text-center">
            <span className="font-zaoliya text-xs font-bold text-pink-600 dark:text-pink-400 animate-pulse tracking-wider">
              {verifiedSuccess ? '✓ ACCESS GRANTED! OPENING PREDICTION...' : 'CONNECTING TO 2-LEVEL VIP SERVER...'}
            </span>
          </div>
        )}
      </main>

      {/* Bottom Pills with Neon Glow matching Screenshot 1 */}
      {/* User Instruction: "or nise VERIFY pe click open Prediction page" */}
      <footer className="max-w-md mx-auto w-full pt-2 pb-2">
        <div className="grid grid-cols-3 gap-2.5">
          {/* SECURE Pill */}
          <div className="py-2.5 px-2 rounded-full border-2 border-pink-400 text-pink-600 dark:text-pink-400 text-center font-zaoliya text-xs font-black tracking-widest uppercase bg-pink-50/50 dark:bg-pink-950/20 shadow-[0_0_12px_rgba(244,63,94,0.3)] select-none">
            SECURE
          </div>

          {/* PRIVATE Pill */}
          <div className="py-2.5 px-2 rounded-full border-2 border-pink-400 text-pink-600 dark:text-pink-400 text-center font-zaoliya text-xs font-black tracking-widest uppercase bg-pink-50/50 dark:bg-pink-950/20 shadow-[0_0_12px_rgba(244,63,94,0.3)] select-none">
            PRIVATE
          </div>

          {/* VERIFY / VERIFIED Button - ClICK TO OPEN PREDICTION PAGE */}
          <button
            onClick={handleVerifyClick}
            disabled={isVerifying}
            className={`py-2.5 px-2 rounded-full border-2 border-pink-500 text-center font-zaoliya text-xs font-black tracking-widest uppercase transition-all transform active:scale-95 shadow-[0_0_16px_rgba(244,63,94,0.5)] ${
              verifiedSuccess
                ? 'bg-emerald-500 text-white border-emerald-400'
                : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:brightness-110 animate-pulse cursor-pointer'
            }`}
            title="Click to Verify and open Prediction Page"
          >
            {isVerifying ? (verifiedSuccess ? 'VERIFIED ✓' : 'CHECKING...') : 'VERIFY'}
          </button>
        </div>

        {/* Small subtitle notice */}
        <p className="text-center text-[10px] font-zaoliya text-slate-400 dark:text-slate-500 mt-2 tracking-wider">
          CLICK <strong className="text-pink-500 font-bold">VERIFY</strong> TO LAUNCH 2-LEVEL WIN GO PREDICTOR
        </p>
      </footer>
      </div>
    </div>
  );
};
