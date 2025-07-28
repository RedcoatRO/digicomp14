import { ReactElement, ReactNode } from 'react';

// Enum pentru stările generale de protecție
export enum ProtectionStatus {
    INACTIVE,
    WARNING,
    ACTIVE,
}

// Enum for Security Views, expanded with new sections
export enum SecurityView {
    HOME = 'Home',
    VIRUS = 'Virus & threat protection',
    FIREWALL = 'Firewall & network protection',
    UPDATES = 'Device performance & health', // This will now point to the enhanced DeviceHealthView
    FAMILY_OPTIONS = 'Family options',
    PROTECTION_HISTORY = 'Protection history',
    ADVANCED_FIREWALL = 'Advanced firewall settings',
}

// Enum for Achievements
export enum AchievementID {
    THREAT_HUNTER = 'Threat Hunter',
    SHIELDS_UP = 'Shields Up!',
    LATEST_AND_GREATEST = 'Latest and Greatest',
    LOCKED_DOWN = 'Locked Down',
    PERFECT_SCORE = 'Perfect Score',
    PHISH_AVOIDER = 'Phish Avoider',
}

export interface Achievement {
    id: AchievementID;
    name: string;
    description: string;
    icon: ReactElement<{ className?: string }>;
}

// Interfață pentru notificările de tip Toast
export interface Toast {
    id: number;
    title: string;
    message: string;
    type: 'success' | 'warning' | 'error' | 'achievement';
    icon: ReactElement<{ className?: string }>;
}

// Interfața pentru o amenințare detectată, cu status individual
export interface Threat {
    id: string;
    name: string;
    status: 'active' | 'quarantined' | 'removed' | 'allowed';
}

// Interfața pentru un element de actualizare, cu detalii specifice
export interface UpdateItem {
    id: string;
    name: string;
    description: string;
    status: 'pending' | 'installing' | 'installed';
}

// Interfața pentru o instanță de fereastră deschisă
export interface WindowInstance {
    id: string;
    title: string;
    icon: ReactElement<{ className?: string }>;
    component: React.ComponentType;
    zIndex: number;
    isMaximized: boolean;
    isMinimized: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
}

// --- New Interfaces for Advanced Features ---

// Interface for a simulated firewall rule
export interface FirewallRule {
    id: string;
    name: string;
    action: 'allow' | 'block';
    direction: 'in' | 'out';
    protocol: 'ANY' | 'TCP' | 'UDP';
}

// Interface for a protection history log entry
export type HistoryCategory = 'antivirus' | 'firewall' | 'updates' | 'general';
export interface HistoryEntry {
    id: number;
    timestamp: string;
    message: string;
    category: HistoryCategory;
}

// --- Evaluation System Interfaces ---
export interface EvaluationDetail {
    text: string;
    achieved: boolean;
    points: number;
}

export interface EvaluationResult {
    score: number;
    maxScore: number;
    details: EvaluationDetail[];
    tasksCompleted: number;
    totalTasks: number;
}


// Starea globală a sistemului, actualizată cu noile structuri de date
export interface SystemState {
    antivirus: ProtectionStatus;
    firewall: {
        status: ProtectionStatus;
        rules: FirewallRule[];
    };
    updates: {
        items: UpdateItem[];
        installing: boolean;
        checking: boolean;
    };
    scan: {
        scanning: boolean;
        progress: number;
        threatsFound: Threat[];
        lastScan: string | null;
        filesScanned: number;
        currentlyScanningFile: string | null;
        scanType: string | null;
        exclusions: string[]; // New: Scan exclusions
    };
    isStartMenuOpen: boolean;
    isVulnerablePopupOpen: boolean;
    windows: WindowInstance[];
    activeWindowId: string | null;
    notifications: Toast[];
    ransomwareProtection: 'not_configured' | 'configuring' | 'configured';
    achievements: Set<AchievementID>;
    isPhishingPopupOpen: boolean;
    isSecurityReportOpen: boolean;
    securityReportData: {
        threatsManaged: number;
        updatesInstalled: number;
        finalScore: number;
    } | null;
    // --- New State for Advanced Features ---
    familyOptions: {
        screenTimeLimit: number; // in hours
        contentFilterLevel: 'none' | 'low' | 'high';
    };
    history: HistoryEntry[];
    // --- New State for Evaluation ---
    isEvaluationComplete: boolean;
    evaluationResult: EvaluationResult | null;
}

// Tipuri de acțiuni pentru reducer, extinse cu noile funcționalități
export type SystemAction =
  | { type: 'TOGGLE_ANTIVIRUS' }
  | { type: 'TOGGLE_FIREWALL' }
  | { type: 'START_SCAN'; payload: { scanType: string; duration: number; fileCount: number; threatChance: number } }
  | { type: 'UPDATE_SCAN_PROGRESS'; payload: { progress: number, filesScanned: number, currentFile: string } }
  | { type: 'FINISH_SCAN'; payload: { threats: Threat[]; scanTime: string } }
  | { type: 'MANAGE_THREAT'; payload: { threatId: string; action: 'quarantined' | 'removed' | 'allowed' } }
  | { type: 'CHECK_FOR_UPDATES' }
  | { type: 'START_UPDATE_INSTALL' }
  | { type: 'UPDATE_INSTALL_PROGRESS'; payload: { updateId: string; status: 'installing' | 'installed' } }
  | { type: 'FINISH_UPDATE' }
  | { type: 'RESTART' }
  | { type: 'TOGGLE_START_MENU' }
  | { type: 'CLOSE_START_MENU' }
  | { type: 'OPEN_WINDOW'; payload: { id: string; title: string; icon: ReactElement<{ className?: string; }>, component: React.ComponentType; } }
  | { type: 'CLOSE_WINDOW'; payload: string; force?: boolean }
  | { type: 'FOCUS_WINDOW'; payload: string }
  | { type: 'TOGGLE_MAXIMIZE_WINDOW'; payload: string }
  | { type: 'MOVE_WINDOW'; payload: { id: string; position: { x: number; y: number } } }
  | { type: 'MINIMIZE_WINDOW'; payload: string }
  | { type: 'RESTORE_WINDOW'; payload: string }
  | { type: 'SHOW_VULNERABLE_POPUP' }
  | { type: 'CLOSE_VULNERABLE_POPUP' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Toast, 'id'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: number }
  | { type: 'SET_RANSOMWARE_PROTECTION'; payload: 'configured' | 'not_configured' }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: { id: AchievementID } }
  | { type: 'SHOW_PHISHING_POPUP' }
  | { type: 'CLOSE_PHISHING_POPUP'; payload: { isClaimed: boolean } }
  | { type: 'SHOW_SECURITY_REPORT'; payload: { threatsManaged: number; updatesInstalled: number; finalScore: number; } }
  | { type: 'CLOSE_SECURITY_REPORT' }
  // --- New Actions for Advanced Features ---
  | { type: 'ADD_HISTORY_ENTRY'; payload: Omit<HistoryEntry, 'id' | 'timestamp'> }
  | { type: 'SET_FAMILY_OPTIONS'; payload: SystemState['familyOptions'] }
  | { type: 'ADD_FIREWALL_RULE'; payload: Omit<FirewallRule, 'id'> }
  | { type: 'REMOVE_FIREWALL_RULE'; payload: string }
  | { type: 'ADD_SCAN_EXCLUSION'; payload: string }
  | { type: 'REMOVE_SCAN_EXCLUSION'; payload: string }
  // --- New Actions for Evaluation ---
  | { type: 'EVALUATE' }
  | { type: 'SHOW_HINT' };