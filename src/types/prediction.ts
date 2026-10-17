export type GameServer = '30S' | '1M';

export type ActiveTab = 'prediction' | 'audit' | 'council' | 'calculator' | 'settings';

export interface DrawItem {
  issueNumber: string;
  number: string;
  color: string;
  premium?: string;
  sum?: number;
}

export interface PredictionNode {
  name: string;
  type: string;
  vote: 'BIG' | 'SMALL';
  confidence: number;
  icon: 'brain' | 'chip' | 'orion' | 'shield' | 'vector' | 'phantom';
}

export interface PredictionRecord {
  issueNumber: string;
  targetShort: string;
  level: 'LV1' | 'LV2 FIX';
  parity: 'BIG' | 'SMALL';
  color: 'GREEN' | 'RED';
  luckySeeds: [number, number];
  patternName: string;
  confidence: number;
  drawResult?: {
    number: number;
    parity: 'BIG' | 'SMALL';
    color: string;
  };
  isWin?: boolean;
  status: 'PENDING' | 'RESOLVED';
  timestamp: number;
}

export interface CouncilState {
  nodes: PredictionNode[];
  activeCount: number;
  totalNodes: number;
}

export interface PredictorStats {
  wins: number;
  losses: number;
  winRate: number;
  currentStreak: number;
  totalAudited: number;
}

export type ThemeMode = 'light' | 'dark';
export type AccentColor =
  | 'royal-blue'
  | 'emerald-jade'
  | 'royal-violet'
  | 'crimson-red'
  | 'amber-gold'
  | 'teal-ocean'
  | 'sky-blue';
