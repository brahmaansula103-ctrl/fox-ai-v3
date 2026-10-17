import React, { useState } from 'react';
import { Share2, Copy, Check, X, ArrowRight } from 'lucide-react';
import { FOX_MASCOT_IMAGE } from '../assets/mascot';
import { TELEGRAM_VIP_LINK, DEFAULT_ACCESS_CODE } from '../utils/constants';

interface HeroWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeroWelcomeModal: React.FC<HeroWelcomeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = DEFAULT_ACCESS_CODE;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'FOX AI Color Prediction Platform',
          text: `Join FOX AI with activation code ${referralCode}!\nTelegram: ${TELEGRAM_VIP_LINK}`,
          url: TELEGRAM_VIP_LINK,
        })
        .catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden cyber-grid text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mascot Image section matching Screenshot 1 */}
        <div className="relative w-full h-52 bg-gradient-to-b from-blue-900/20 via-sky-500/10 to-transparent flex items-center justify-center p-3 pt-6">
          <div className="relative w-44 h-44 rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-400/40 neon-glow-cyan bg-slate-950">
            <img
              src={FOX_MASCOT_IMAGE}
              alt="FOX AI 3D Mascot"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Branding matching Screenshot 1 */}
        <div className="px-5 pt-2 pb-6 space-y-4">
          <div>
            <h1 className="font-zaoliya text-4xl sm:text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-500 to-pink-500 drop-shadow-[0_2px_10px_rgba(14,165,233,0.3)]">
              FOX AI
            </h1>
            <p className="font-zaoliya text-sm sm:text-base font-black tracking-wide text-slate-900 dark:text-white uppercase mt-1 leading-snug">
              ADVANCED COLOR PREDICTION PLATFORM
            </p>
            <span className="inline-block mt-1 text-sm font-bold tracking-wider text-lime-500 font-zaoliya">
              FOX V1.0
            </span>
          </div>

          {/* Referral & Activation Code row matching Screenshot 1 */}
          <div className="flex items-center justify-center gap-2 pt-1">
            {/* Share icon button */}
            <button
              onClick={handleShare}
              className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 border-2 border-sky-300 dark:border-sky-800 text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-700 flex items-center justify-center shadow-sm transition"
              title="Share Referral Code"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 border-2 border-sky-300 dark:border-sky-800 text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-700 flex items-center justify-center shadow-sm transition"
              title="Copy Code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Active Code Box */}
            <div
              onClick={handleCopy}
              className="flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-lime-300/40 dark:bg-lime-400/20 border-2 border-lime-400 text-slate-900 dark:text-white font-zaoliya text-xs sm:text-sm font-extrabold tracking-wider cursor-pointer hover:bg-lime-300/60 transition shadow-sm"
            >
              <span>{referralCode}</span>
              <Copy className="w-3.5 h-3.5 opacity-70" />
            </div>
          </div>

          {/* Bottom Security Tags with neon-pink glow matching Screenshot 1 */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <span className="py-2 rounded-full border-2 border-pink-400 text-pink-600 dark:text-pink-400 text-[10px] font-zaoliya font-extrabold tracking-widest uppercase bg-pink-50/50 dark:bg-pink-950/20 shadow-[0_0_10px_rgba(244,63,94,0.25)] text-center">
              SECURE
            </span>

            <span className="py-2 rounded-full border-2 border-pink-400 text-pink-600 dark:text-pink-400 text-[10px] font-zaoliya font-extrabold tracking-widest uppercase bg-pink-50/50 dark:bg-pink-950/20 shadow-[0_0_10px_rgba(244,63,94,0.25)] text-center">
              PRIVATE
            </span>

            <span className="py-2 rounded-full border-2 border-pink-400 text-pink-600 dark:text-pink-400 text-[10px] font-zaoliya font-extrabold tracking-widest uppercase bg-pink-50/50 dark:bg-pink-950/20 shadow-[0_0_10px_rgba(244,63,94,0.25)] text-center">
              VERIFIED
            </span>
          </div>

          {/* Enter Button */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 text-white font-zaoliya text-xs sm:text-sm font-black tracking-wider uppercase shadow-lg shadow-sky-500/25 hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              <span>ENTER PREDICTOR DASHBOARD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
