import { AccentColor } from '../types/prediction';

export interface AccentStyles {
  name: string;
  bg: string;
  bgGradient: string;
  text: string;
  border: string;
  ring: string;
  shadow: string;
  lightBg: string;
  badgeBg: string;
}

export const ACCENT_MAP: Record<AccentColor, AccentStyles> = {
  'crimson-red': {
    name: 'CRIMSON RED',
    bg: 'bg-rose-600',
    bgGradient: 'from-rose-600 to-pink-600',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-500',
    ring: 'ring-rose-500',
    shadow: 'shadow-rose-500/30',
    lightBg: 'bg-rose-50/70 dark:bg-rose-950/30',
    badgeBg: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
  },
  'royal-blue': {
    name: 'ROYAL BLUE',
    bg: 'bg-blue-600',
    bgGradient: 'from-blue-600 to-indigo-600',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500',
    ring: 'ring-blue-500',
    shadow: 'shadow-blue-500/30',
    lightBg: 'bg-blue-50/70 dark:bg-blue-950/30',
    badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
  },
  'emerald-jade': {
    name: 'EMERALD JADE',
    bg: 'bg-emerald-600',
    bgGradient: 'from-emerald-600 to-teal-600',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500',
    ring: 'ring-emerald-500',
    shadow: 'shadow-emerald-500/30',
    lightBg: 'bg-emerald-50/70 dark:bg-emerald-950/30',
    badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
  },
  'royal-violet': {
    name: 'ROYAL VIOLET',
    bg: 'bg-purple-600',
    bgGradient: 'from-purple-600 to-indigo-600',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500',
    ring: 'ring-purple-500',
    shadow: 'shadow-purple-500/30',
    lightBg: 'bg-purple-50/70 dark:bg-purple-950/30',
    badgeBg: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
  },
  'amber-gold': {
    name: 'AMBER GOLD',
    bg: 'bg-amber-500',
    bgGradient: 'from-amber-500 to-orange-500',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500',
    ring: 'ring-amber-500',
    shadow: 'shadow-amber-500/30',
    lightBg: 'bg-amber-50/70 dark:bg-amber-950/30',
    badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
  },
  'teal-ocean': {
    name: 'TEAL OCEAN',
    bg: 'bg-teal-600',
    bgGradient: 'from-teal-600 to-cyan-600',
    text: 'text-teal-600 dark:text-teal-400',
    border: 'border-teal-500',
    ring: 'ring-teal-500',
    shadow: 'shadow-teal-500/30',
    lightBg: 'bg-teal-50/70 dark:bg-teal-950/30',
    badgeBg: 'bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300',
  },
  'sky-blue': {
    name: 'SKY BLUE',
    bg: 'bg-sky-500',
    bgGradient: 'from-sky-500 to-blue-500',
    text: 'text-sky-500 dark:text-sky-400',
    border: 'border-sky-500',
    ring: 'ring-sky-500',
    shadow: 'shadow-sky-500/30',
    lightBg: 'bg-sky-50/70 dark:bg-sky-950/30',
    badgeBg: 'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300',
  },
};
