/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  GameServer,
  ThemeMode,
  AccentColor,
  DrawItem,
  PredictionRecord,
  PredictionNode,
  PredictorStats,
  ActiveTab,
} from './types/prediction';
import {
  evaluateHistoryAuditWithRegistry,
  generateCouncilNodes,
  generateNextPrediction,
  getNextIssueNumber,
} from './utils/engine';
import {
  playTickSound,
  playWinSound,
  speakAnnouncement,
} from './utils/audio';
import { Header } from './components/Header';
import { TargetPredictionCard } from './components/TargetPredictionCard';
import { AiCouncilSection } from './components/AiCouncilSection';
import { HistoryAuditSection } from './components/HistoryAuditSection';
import { MarginCalculatorSection } from './components/MarginCalculatorSection';
import { SettingsAppearanceSection } from './components/SettingsAppearanceSection';
import { HeroWelcomeModal } from './components/HeroWelcomeModal';
import { TelegramModal } from './components/TelegramModal';
import { LoginPage } from './components/LoginPage';

export default function App() {
  // Authentication / Verification state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('fox_auth') === 'true';
  });

  // App Appearance & Preferences
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('fox_theme') as ThemeMode) || 'light';
  });
  const [accent, setAccent] = useState<AccentColor>(() => {
    return (localStorage.getItem('fox_accent') as AccentColor) || 'crimson-red';
  });
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(() => {
    return localStorage.getItem('fox_voice') !== 'false';
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('fox_sound') !== 'false';
  });
  const [confettiEnabled, setConfettiEnabled] = useState<boolean>(() => {
    return localStorage.getItem('fox_confetti') !== 'false';
  });

  // State
  const [server, setServer] = useState<GameServer>('30S');
  const [activeTab, setActiveTab] = useState<ActiveTab>('prediction');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [telegramModal, setTelegramModal] = useState<{ isOpen: boolean; mode: 'channel' | 'admin' }>({
    isOpen: false,
    mode: 'channel',
  });

  // Persistent Immutable Prediction Registry
  const [predictionsRegistry, setPredictionsRegistry] = useState<Record<string, PredictionRecord>>(() => {
    try {
      const saved = localStorage.getItem('fox_prediction_registry');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Live Lottery Draw Data
  const [draws, setDraws] = useState<DrawItem[]>([]);
  const [targetPrediction, setTargetPrediction] = useState<PredictionRecord | null>(null);
  const [auditRecords, setAuditRecords] = useState<PredictionRecord[]>([]);
  const [councilNodes, setCouncilNodes] = useState<PredictionNode[]>([]);
  const [stats, setStats] = useState<PredictorStats>({
    wins: 33,
    losses: 22,
    winRate: 60,
    currentStreak: 0,
    totalAudited: 55,
  });

  // Timer
  const [remainingSeconds, setRemainingSeconds] = useState<number>(30);

  // STABLE REFS to avoid re-render cascades or interval resets
  const predictionsRegistryRef = useRef<Record<string, PredictionRecord>>(predictionsRegistry);
  predictionsRegistryRef.current = predictionsRegistry;

  const lastEvaluatedIssueRef = useRef<string>('');
  const lastTickedSecondRef = useRef<number>(-1);
  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;
  const voiceEnabledRef = useRef(voiceEnabled);
  voiceEnabledRef.current = voiceEnabled;
  const confettiEnabledRef = useRef(confettiEnabled);
  confettiEnabledRef.current = confettiEnabled;
  const isAuthenticatedRef = useRef(isAuthenticated);
  isAuthenticatedRef.current = isAuthenticated;

  // Sync theme to document class
  useEffect(() => {
    localStorage.setItem('fox_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('fox_accent', accent);
  }, [accent]);

  useEffect(() => {
    localStorage.setItem('fox_voice', String(voiceEnabled));
  }, [voiceEnabled]);

  useEffect(() => {
    localStorage.setItem('fox_sound', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('fox_confetti', String(confettiEnabled));
  }, [confettiEnabled]);

  const handleVerifiedSuccess = () => {
    sessionStorage.setItem('fox_auth', 'true');
    setIsAuthenticated(true);
    if (confettiEnabledRef.current) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#38bdf8', '#10b981', '#f43f5e', '#a3e635'],
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('fox_auth');
    setIsAuthenticated(false);
  };

  // Fresh Reset Data handler
  const handleFreshReset = () => {
    localStorage.removeItem('fox_prediction_registry');
    predictionsRegistryRef.current = {};
    setPredictionsRegistry({});
    lastEvaluatedIssueRef.current = '';
    fetchHistory(true);
  };

  // Fetch Draw History from Server with STABLE dependencies
  const fetchHistory = useCallback(
    async (showLoading = false) => {
      if (showLoading) setIsRefreshing(true);
      try {
        const resp = await fetch(`/api/history?type=${server}`);
        if (!resp.ok) throw new Error('Network error');
        const json = await resp.json();
        const list: DrawItem[] = json?.data?.list || [];

        if (list.length > 0) {
          setDraws(list);

          const latestDraw = list[0];
          const latestIssue = latestDraw.issueNumber;

          // Process using stable predictions registry
          const currentRegistry = predictionsRegistryRef.current;
          const {
            records,
            updatedRegistry,
            stats: computedStats,
            currentLevelForNext,
          } = evaluateHistoryAuditWithRegistry(list, currentRegistry);

          setAuditRecords(records);
          setStats(computedStats);

          // Compute upcoming target issue
          const nextIssue = getNextIssueNumber(latestIssue);

          let nextPred = updatedRegistry[nextIssue];
          if (!nextPred) {
            nextPred = generateNextPrediction(nextIssue, list, currentLevelForNext);
            updatedRegistry[nextIssue] = nextPred;
          }

          setTargetPrediction(nextPred);
          setCouncilNodes(generateCouncilNodes(nextPred));

          // Save updated registry
          predictionsRegistryRef.current = updatedRegistry;
          setPredictionsRegistry(updatedRegistry);
          try {
            localStorage.setItem('fox_prediction_registry', JSON.stringify(updatedRegistry));
          } catch {
            // Storage quota safety
          }

          // Check if this is a newly settled draw that just resolved
          if (latestIssue !== lastEvaluatedIssueRef.current) {
            lastEvaluatedIssueRef.current = latestIssue;

            const resolvedLast = updatedRegistry[latestIssue];
            if (resolvedLast) {
              if (resolvedLast.isWin) {
                if (confettiEnabledRef.current) {
                  confetti({
                    particleCount: 85,
                    spread: 70,
                    origin: { y: 0.5 },
                    colors: ['#10b981', '#38bdf8', '#fbbf24', '#f43f5e'],
                  });
                }
                if (soundEnabledRef.current) {
                  playWinSound();
                }
                if (voiceEnabledRef.current) {
                  speakAnnouncement(
                    `Target ${resolvedLast.targetShort}. Win confirmed. ${
                      resolvedLast.level === 'LV2 FIX' ? 'Level two fix win' : 'Level one win'
                    }.`
                  );
                }
              } else {
                if (voiceEnabledRef.current) {
                  speakAnnouncement(
                    `Target ${resolvedLast.targetShort} lost. Level two recovery active with two X margin.`
                  );
                }
              }
            }
          }
        }
      } catch (err) {
        console.warn('Fetch draw error:', err);
      } finally {
        if (showLoading) {
          setTimeout(() => setIsRefreshing(false), 300);
        }
      }
    },
    [server]
  );

  // Initial fetch on mount & when server switches
  useEffect(() => {
    lastEvaluatedIssueRef.current = '';
    fetchHistory(true);
  }, [server, fetchHistory]);

  // Synchronized Smooth Countdown Timer Loop (runs once per second)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentSeconds = now.getSeconds();
      const cycleLength = server === '30S' ? 30 : 60;
      const rem = cycleLength - (currentSeconds % cycleLength);

      setRemainingSeconds(rem);

      // Sound alerts in last 5 seconds
      if (rem <= 5 && rem >= 1 && lastTickedSecondRef.current !== rem) {
        lastTickedSecondRef.current = rem;
        if (soundEnabledRef.current && isAuthenticatedRef.current) {
          playTickSound();
        }
      }

      // Re-fetch at cycle end
      if (rem === 1 || rem === cycleLength) {
        fetchHistory(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [server, fetchHistory]);

  // If user is not yet verified, render Login / Verification page matching Screenshot 1
  if (!isAuthenticated) {
    return (
      <LoginPage
        onVerified={handleVerifiedSuccess}
        theme={theme}
        setTheme={setTheme}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />
    );
  }

  // Main Verified Prediction Dashboard
  // Strictly fit to mobile screen with zero overflow
  return (
    <div className="min-h-screen bg-slate-950 flex justify-center selection:bg-pink-500 selection:text-white">
      <div className="w-full max-w-[440px] min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors cyber-grid relative shadow-2xl overflow-x-hidden flex flex-col border-x border-slate-200/50 dark:border-slate-800/80">
        {/* Top Header with Brand, Controls, Server Switcher, and Top Navigation Buttons */}
        <Header
          theme={theme}
          setTheme={setTheme}
          accent={accent}
          server={server}
          setServer={setServer}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          remainingSeconds={remainingSeconds}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLv2Active={targetPrediction?.level === 'LV2 FIX'}
          onOpenHero={() => setShowHeroModal(true)}
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main className="w-full px-3 pt-2.5 space-y-3.5 flex-1">
          {/* Prediction tab shows ONLY TargetPredictionCard (AI Council is accessed via COUNCIL button) */}
          {activeTab === 'prediction' && (
            targetPrediction ? (
              <TargetPredictionCard
                prediction={targetPrediction}
                server={server}
                recentDraws={draws}
                onRefresh={() => fetchHistory(true)}
                isRefreshing={isRefreshing}
              />
            ) : (
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center animate-pulse">
                <span className="font-zaoliya text-sm font-bold text-slate-500">
                  CONNECTING TO {server} 2-LEVEL DRAW SERVER...
                </span>
              </div>
            )
          )}

        {/* 2-LEVEL HISTORY TAB */}
        {activeTab === 'audit' && (
          <HistoryAuditSection records={auditRecords} />
        )}

        {activeTab === 'council' && councilNodes.length > 0 && (
          <AiCouncilSection
            nodes={councilNodes}
            stats={stats}
            onOpenTelegram={() => setTelegramModal({ isOpen: true, mode: 'channel' })}
          />
        )}

        {activeTab === 'calculator' && (
          <MarginCalculatorSection
            onOpenTelegram={() => setTelegramModal({ isOpen: true, mode: 'channel' })}
            onContactAdmin={() => setTelegramModal({ isOpen: true, mode: 'admin' })}
            accent={accent}
          />
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <SettingsAppearanceSection
              theme={theme}
              setTheme={setTheme}
              accent={accent}
              setAccent={setAccent}
              voiceEnabled={voiceEnabled}
              setVoiceEnabled={setVoiceEnabled}
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
              confettiEnabled={confettiEnabled}
              setConfettiEnabled={setConfettiEnabled}
            />

            {/* Fresh Data & Cache Reset Button */}
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="font-zaoliya text-xs font-bold block text-slate-900 dark:text-white">
                  FRESH RESET DATA
                </span>
                <span className="text-[10px] text-slate-400 block font-zaoliya">
                  Clear cached draws and force fresh live re-sync
                </span>
              </div>
              <button
                onClick={handleFreshReset}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 font-zaoliya text-xs font-bold transition"
              >
                FRESH RESET
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Hero / Activation Welcome Modal */}
      <HeroWelcomeModal
        isOpen={showHeroModal}
        onClose={() => setShowHeroModal(false)}
      />

      {/* Telegram VIP Modal */}
      <TelegramModal
        isOpen={telegramModal.isOpen}
        onClose={() => setTelegramModal({ isOpen: false, mode: 'channel' })}
        mode={telegramModal.mode}
      />
      </div>
    </div>
  );
}
