import React, { useState } from 'react';
import { Send, Check, Copy, ExternalLink, X, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { TELEGRAM_VIP_LINK } from '../utils/constants';

interface TelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'channel' | 'admin';
}

export const TelegramModal: React.FC<TelegramModalProps> = ({ isOpen, onClose, mode = 'channel' }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const channelHandle = mode === 'admin' ? '@FoxAI_AdminDirect' : 'https://t.me/+ac6ZAZQH0uI3NDI1';
  const telegramUrl = mode === 'admin' ? 'https://t.me/FoxAI_AdminDirect' : TELEGRAM_VIP_LINK;

  const handleCopy = () => {
    navigator.clipboard.writeText(telegramUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpen = () => {
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-2xl space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/30 flex-shrink-0">
            {mode === 'admin' ? (
              <MessageSquare className="w-6 h-6" />
            ) : (
              <Send className="w-6 h-6 -rotate-12 translate-x-0.5" />
            )}
          </div>
          <div>
            <h3 className="font-zaoliya text-base font-black text-slate-900 dark:text-white tracking-wide">
              {mode === 'admin' ? 'CONTACT VIP ADMIN DIRECT' : 'OFFICIAL VIP TELEGRAM'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-zaoliya">
              {mode === 'admin' ? 'Online support & account verification' : 'Instant 2-Level WinGo Signals & Forecasts'}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
          <span className="text-[10px] font-zaoliya font-bold uppercase text-slate-400 tracking-wider block">
            OFFICIAL TELEGRAM INVITE
          </span>
          <div className="flex items-center justify-between gap-2">
            <span className="font-zaoliya text-xs font-bold text-blue-600 dark:text-sky-400 truncate">
              {channelHandle}
            </span>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-zaoliya text-[11px] font-bold hover:bg-slate-100 transition flex items-center gap-1 flex-shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="font-zaoliya text-[11px]">Guaranteed 2-Level Recovery Signals (99% Hit Rate)</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span className="font-zaoliya text-[11px]">Daily Schedule: 10:00 AM, 02:00 PM, 06:00 PM, 09:00 PM</span>
          </div>
        </div>

        <div className="pt-2 flex gap-2">
          <button
            onClick={handleOpen}
            className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-zaoliya text-xs sm:text-sm font-black tracking-wider uppercase shadow-md transition flex items-center justify-center gap-2 active:scale-95"
          >
            <span>JOIN TELEGRAM CHANNEL</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
