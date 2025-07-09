import React, { useContext, useReducer, useCallback, useRef, useState, useEffect, ReactElement } from 'react';
import Draggable from 'react-draggable';
import { SystemState, SystemAction, ProtectionStatus, WindowInstance, Toast, UpdateItem, Threat, AchievementID, Achievement, FirewallRule, HistoryCategory } from './types';
import WindowsSecurity, { SystemContext } from './components/WindowsSecurity';
import { CalculatorIcon, CloseIcon, MaximizeIcon, MinimizeIcon, NotepadIcon, SearchIcon, WindowsDefenderIcon, SettingsIcon, WindowsLogoIcon, WifiIcon, VolumeIcon, CheckCircleIcon, ShieldErrorIcon, OneDriveIcon, TrophyIcon, ShieldIcon, WarningIcon } from './components/Icons';
import ToastContainer from './components/ToastContainer';
import OneDriveSetup from './components/OneDriveSetup';
import PhishingPopup from './components/PhishingPopup';
import SecurityReport from './components/SecurityReport';


const useAudio = (url: string) => {
    // useRef to hold the audio object. It persists across re-renders.
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // useEffect to create the Audio object once when the component mounts
    // or if the URL changes.
    useEffect(() => {
        if (url) {
            audioRef.current = new Audio(url);
        }
        // Cleanup function to stop audio and release resources if component unmounts
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [url]);

    // useCallback to return a stable function to play the audio.
    return useCallback(() => {
        if (audioRef.current) {
            // Rewind to the start before playing
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(error => {
                // Handle potential autoplay errors gracefully.
                console.error(`Audio playback error for ${url}:`, error);
            });
        }
    }, [url]);
};

// --- Achievements Definition ---
export const achievementsList = new Map<AchievementID, Achievement>([
    [AchievementID.THREAT_HUNTER, { id: AchievementID.THREAT_HUNTER, name: 'Threat Hunter', description: 'Quarantine or remove your first threat.', icon: <ShieldErrorIcon /> }],
    [AchievementID.SHIELDS_UP, { id: AchievementID.SHIELDS_UP, name: 'Shields Up!', description: 'Activate the firewall.', icon: <ShieldIcon /> }],
    [AchievementID.LATEST_AND_GREATEST, { id: AchievementID.LATEST_AND_GREATEST, name: 'Latest & Greatest', description: 'Install all available system updates.', icon: <CheckCircleIcon /> }],
    [AchievementID.LOCKED_DOWN, { id: AchievementID.LOCKED_DOWN, name: 'Locked Down', description: 'Configure ransomware protection.', icon: <OneDriveIcon /> }],
    [AchievementID.PERFECT_SCORE, { id: AchievementID.PERFECT_SCORE, name: 'Perfect Score', description: 'Achieve a 100% security score.', icon: <TrophyIcon /> }],
    [AchievementID.PHISH_AVOIDER, { id: AchievementID.PHISH_AVOIDER, name: 'Phish Avoider', description: 'Successfully avoid a phishing attempt.', icon: <WarningIcon /> }],
]);

// --- Security Score Calculation Logic ---
export const calculateSecurityScore = (state: SystemState): number => {
    let score = 0;
    if (state.antivirus === ProtectionStatus.ACTIVE) score += 25;
    if (state.firewall.status === ProtectionStatus.ACTIVE) score += 25;
    if (state.ransomwareProtection === 'configured') score += 15;
    if (state.scan.threatsFound.every(t => t.status !== 'active')) score += 15;
    if (state.updates.items.every(u => u.status === 'installed')) score += 20;
    return score;
};


// --- Mock Applications ---
const Notepad = () => (
    <div className="w-full h-full bg-white text-black font-mono">
        <textarea className="w-full h-full p-2 resize-none bg-inherit outline-none" defaultValue="This is a simple Notepad simulation."></textarea>
    </div>
);

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [prevValue, setPrevValue] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const calculate = (firstOperand: number, secondOperand: number, op: string): number => {
        switch (op) {
            case '+': return firstOperand + secondOperand;
            case '-': return firstOperand - secondOperand;
            case '*': return firstOperand * secondOperand;
            case '/': return secondOperand === 0 ? NaN : firstOperand / secondOperand;
            default: return secondOperand;
        }
    };
    
    const handleButtonClick = (btn: string) => {
        if (btn >= '0' && btn <= '9') {
            if (waitingForOperand) {
                setDisplay(btn);
                setWaitingForOperand(false);
            } else {
                setDisplay(display === '0' ? btn : display + btn);
            }
        } else if (btn === '.') {
            if (waitingForOperand) {
                setDisplay('0.');
                setWaitingForOperand(false);
            } else if (!display.includes('.')) {
                setDisplay(display + '.');
            }
        } else if (btn === 'AC') {
            setDisplay('0');
            setPrevValue(null);
            setOperator(null);
            setWaitingForOperand(false);
        } else if (btn === 'C') {
            setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
        } else if (btn === '%') {
             const currentValueFloat = parseFloat(display);
             setDisplay(String(currentValueFloat / 100));
             setWaitingForOperand(true);
        } else if (btn === '=') {
            if (operator && prevValue !== null && !waitingForOperand) {
                const currentValue = parseFloat(display);
                const result = calculate(prevValue, currentValue, operator);
                setDisplay(String(isNaN(result) ? "Error" : result));
                setPrevValue(result); // Store result for chained operations
                setOperator(null);
                setWaitingForOperand(true);
            }
        } else { // Operator buttons
            const inputValue = parseFloat(display);
            if (operator && !waitingForOperand) {
                 if (prevValue !== null) {
                    const result = calculate(prevValue, inputValue, operator);
                    setDisplay(String(isNaN(result) ? "Error" : result));
                    setPrevValue(result);
                 }
            } else {
                setPrevValue(inputValue);
            }
            setWaitingForOperand(true);
            setOperator(btn);
        }
    };

    const buttons = ['AC', 'C', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
    const isOperator = (btn: string) => ['/', '*', '-', '+', '='].includes(btn);

    return (
        <div className="w-full h-full bg-gray-800 p-2 flex flex-col">
            <div className="bg-gray-900 text-white text-right text-4xl p-4 rounded mb-2 overflow-x-auto break-all">{display}</div>
            <div className="grid grid-cols-4 gap-2 flex-grow">
                {buttons.map(btn => (
                    <button 
                        key={btn} 
                        onClick={() => handleButtonClick(btn)}
                        className={`
                            rounded text-2xl font-semibold transition-colors duration-150
                            ${isOperator(btn) ? 'bg-orange-500 hover:bg-orange-400' : 'bg-gray-600 hover:bg-gray-500'}
                            ${btn === '0' ? 'col-span-2' : ''}
                            ${btn === 'AC' || btn === 'C' || btn === '%' ? 'bg-gray-500 hover:bg-gray-400' : ''}
                        `}
                    >
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    );
};
const Settings = () => (
    <div className="p-8 h-full w-full bg-[#1e1e1e]">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-gray-400 mt-4">Dark/Light mode toggle and other settings would go here.</p>
    </div>
);


// --- Lista de fișiere pentru simularea scanării ---
const criticalFilePaths = [
    'C:\\Windows\\System32\\ntoskrnl.exe', 'C:\\Windows\\System32\\hal.dll', 'C:\\Windows\\System32\\win32k.sys',
    'C:\\Windows\\System32\\user32.dll', 'C:\\Windows\\System32\\gdi32.dll', 'C:\\Windows\\System32\\kernel32.dll',
    'C:\\Windows\\System32\\advapi32.dll','C:\\Windows\\SysWOW64\\kernel32.dll', 'C:\\Program Files\\Common Files\\System\\ado\\msado15.dll',
    'C:\\Windows\\System32\\drivers\\tcpip.sys', 'C:\\Windows\\System32\\svchost.exe', 'C:\\Windows\\explorer.exe',
];


// --- Starea Inițială și Reducer ---
const initialState: SystemState = {
    antivirus: ProtectionStatus.INACTIVE,
    firewall: {
        status: ProtectionStatus.INACTIVE,
        rules: [],
    },
    updates: {
        items: [
            { id: 'KB5037771', name: 'Actualizare cumulativă pentru Windows 11 (KB5037771)', description: 'Include îmbunătățiri de securitate și calitate.', status: 'pending' },
            { id: 'KB5031234', name: 'Actualizare de securitate pentru Microsoft Defender Antivirus - KB5031234', description: 'Cele mai recente definiții de securitate.', status: 'pending' },
            { id: 'KB5034441', name: '.NET Framework 4.8.1 Update (KB5034441)', description: 'Rezolvă o problemă de securitate.', status: 'pending' },
        ],
        installing: false,
        checking: false
    },
    scan: { 
        scanning: false, 
        progress: 0, 
        threatsFound: [], 
        lastScan: null, 
        filesScanned: 0, 
        currentlyScanningFile: null, 
        scanType: null,
        exclusions: [],
    },
    isStartMenuOpen: false,
    isVulnerablePopupOpen: false,
    windows: [],
    activeWindowId: null,
    notifications: [],
    ransomwareProtection: 'not_configured',
    achievements: new Set(),
    isPhishingPopupOpen: false,
    isSecurityReportOpen: false,
    securityReportData: null,
    // New initial state for advanced features
    familyOptions: {
        screenTimeLimit: 4,
        contentFilterLevel: 'none',
    },
    history: [],
};

function systemReducer(state: SystemState, action: SystemAction): SystemState {
    const bringToFront = (windows: WindowInstance[], id: string) => {
        const targetWindow = windows.find(w => w.id === id);
        if (!targetWindow || targetWindow.zIndex === windows.length) return windows;

        return windows
            .map(w => {
                if (w.id === id) return { ...w, zIndex: windows.length };
                if (w.zIndex > targetWindow.zIndex) return { ...w, zIndex: w.zIndex - 1 };
                return w;
            })
            .sort((a, b) => a.zIndex - b.zIndex);
    };
    
    // Helper to add history entries
    const addHistoryEntry = (currentState: SystemState, message: string, category: HistoryCategory): SystemState => {
        const newEntry = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            message,
            category,
        };
        return {
            ...currentState,
            history: [newEntry, ...currentState.history],
        };
    };

    switch (action.type) {
        case 'TOGGLE_ANTIVIRUS': {
            const newAntivirusStatusText = state.antivirus === ProtectionStatus.ACTIVE ? "off" : "on";
            const antiVirusState = addHistoryEntry(state, `Real-time protection was turned ${newAntivirusStatusText}.`, 'antivirus');
            return { ...antiVirusState, antivirus: state.antivirus === ProtectionStatus.ACTIVE ? ProtectionStatus.INACTIVE : ProtectionStatus.ACTIVE };
        }
        
        case 'TOGGLE_FIREWALL': {
            const newStatus = state.firewall.status === ProtectionStatus.ACTIVE ? ProtectionStatus.INACTIVE : ProtectionStatus.ACTIVE;
            const achievements = new Set(state.achievements);
            if (newStatus === ProtectionStatus.ACTIVE) {
                achievements.add(AchievementID.SHIELDS_UP);
            }
            const firewallState = addHistoryEntry(state, `Firewall was turned ${newStatus === ProtectionStatus.ACTIVE ? "on" : "off"}.`, 'firewall');
            return { ...firewallState, firewall: { ...state.firewall, status: newStatus }, achievements };
        }
        
        case 'START_SCAN': {
            const startScanState = addHistoryEntry(state, `A ${action.payload.scanType} was started.`, 'antivirus');
            return { ...startScanState, scan: { ...state.scan, scanning: true, progress: 0, filesScanned: 0, threatsFound: [], scanType: action.payload.scanType } };
        }
        
        case 'UPDATE_SCAN_PROGRESS':
            return { ...state, scan: { ...state.scan, progress: action.payload.progress, filesScanned: action.payload.filesScanned, currentlyScanningFile: action.payload.currentFile } };
        
        case 'FINISH_SCAN': {
            const newStatus = action.payload.threats.length > 0 ? ProtectionStatus.WARNING : state.antivirus;
            const message = action.payload.threats.length > 0
                ? `Scan complete. Found ${action.payload.threats.length} threat(s).`
                : 'Scan complete. No threats found.';
            const finishScanState = addHistoryEntry(state, message, 'antivirus');
            return { ...finishScanState, antivirus: newStatus, scan: { ...state.scan, scanning: false, progress: 100, threatsFound: action.payload.threats, lastScan: action.payload.scanTime } };
        }
        
        case 'MANAGE_THREAT': {
             const updatedThreats = state.scan.threatsFound.map(threat => 
                threat.id === action.payload.threatId ? {...threat, status: action.payload.action} : threat
            );
            const areActiveThreatsLeft = updatedThreats.some(t => t.status === 'active');
            const newAntivirusStatus = areActiveThreatsLeft ? ProtectionStatus.WARNING : ProtectionStatus.ACTIVE;

            const achievements = new Set(state.achievements);
            if (action.payload.action === 'quarantined' || action.payload.action === 'removed') {
                achievements.add(AchievementID.THREAT_HUNTER);
            }
            const threatName = state.scan.threatsFound.find(t => t.id === action.payload.threatId)?.name || 'a threat';
            const manageThreatState = addHistoryEntry(state, `Action taken: "${threatName}" was ${action.payload.action}.`, 'antivirus');
            return {...manageThreatState, antivirus: newAntivirusStatus, scan: {...state.scan, threatsFound: updatedThreats}, achievements};
        }

        case 'CHECK_FOR_UPDATES':
             return {...state, updates: {...state.updates, checking: true}};
        
        case 'START_UPDATE_INSTALL':
             return {...state, updates: {...state.updates, installing: true, checking: false}};
        
        case 'UPDATE_INSTALL_PROGRESS':
             return {...state, updates: {...state.updates, items: state.updates.items.map(u => u.id === action.payload.updateId ? {...u, status: action.payload.status} : u)}}
        
        case 'FINISH_UPDATE': {
            const allInstalled = state.updates.items.every(u => u.status === 'installed');
            const achievements = new Set(state.achievements);
            if(allInstalled) {
                achievements.add(AchievementID.LATEST_AND_GREATEST);
            }
            const finishUpdateState = addHistoryEntry(state, 'System updates successfully installed.', 'updates');
            return { ...finishUpdateState, achievements, updates: { ...state.updates, installing: false } };
        }
        
        case 'RESTART':
            return {...initialState, notifications: [], history: [
                { id: Date.now(), timestamp: new Date().toLocaleString(), message: 'System restarted successfully.', category: 'general' },
                ...state.history
            ]}; // Full reset but keep history

        // Window Management & UI
        case 'TOGGLE_START_MENU':
            return { ...state, isStartMenuOpen: !state.isStartMenuOpen };
        
        case 'CLOSE_START_MENU':
            return { ...state, isStartMenuOpen: false };
        
        case 'OPEN_WINDOW': {
            const existingWindow = state.windows.find(w => w.id === action.payload.id);
            if (existingWindow) {
                const updatedWindows = bringToFront(state.windows, action.payload.id);
                const restoredWindows = updatedWindows.map(w => w.id === action.payload.id ? {...w, isMinimized: false} : w);
                return { ...state, activeWindowId: existingWindow.id, windows: restoredWindows, isStartMenuOpen: false };
            }
            const newWindow: WindowInstance = {
                id: action.payload.id,
                title: action.payload.title,
                icon: action.payload.icon,
                component: action.payload.component,
                zIndex: state.windows.length + 1,
                isMaximized: false,
                isMinimized: false,
                position: { x: 150 + state.windows.length * 20, y: 100 + state.windows.length * 20 },
                size: { width: action.payload.id === 'onedrive-setup' ? 600 : 900, height: action.payload.id === 'onedrive-setup' ? 450 : 600 },
            };
            return { ...state, windows: [...state.windows, newWindow], activeWindowId: newWindow.id, isStartMenuOpen: false };
        }
        
        case 'CLOSE_WINDOW': {
            const windowToClose = state.windows.find(w => w.id === action.payload);

            if (!windowToClose || windowToClose.id !== 'security-center' || action.force) {
                return { ...state, windows: state.windows.filter(w => w.id !== action.payload) };
            }

            const score = calculateSecurityScore(state);
            const isSecure = score >= 90;

            if (isSecure) {
                return { ...state, isVulnerablePopupOpen: false };
            } else {
                return { ...state, isVulnerablePopupOpen: true };
            }
        }
        
        case 'FOCUS_WINDOW': {
            const targetWindow = state.windows.find(w => w.id === action.payload);
            if (!targetWindow) return state;

            const newWindows = bringToFront(state.windows, action.payload);
            return { ...state, windows: newWindows, activeWindowId: action.payload };
        }
        
        case 'TOGGLE_MAXIMIZE_WINDOW':
            return { ...state, windows: state.windows.map(w => w.id === action.payload ? { ...w, isMaximized: !w.isMaximized } : w) };
        
        case 'MOVE_WINDOW':
            return { ...state, windows: state.windows.map(w => w.id === action.payload.id ? { ...w, position: action.payload.position } : w) };
        
        case 'MINIMIZE_WINDOW':
            return { ...state, activeWindowId: null, windows: state.windows.map(w => w.id === action.payload ? { ...w, isMinimized: true } : w) };
        
        case 'RESTORE_WINDOW': {
             const restoredWindows = bringToFront(state.windows, action.payload);
             const unminimizedWindows = restoredWindows.map(w => w.id === action.payload ? { ...w, isMinimized: false } : w);
             return { ...state, windows: unminimizedWindows, activeWindowId: action.payload };
        }
        
        case 'SHOW_VULNERABLE_POPUP':
            return { ...state, isVulnerablePopupOpen: true };
        
        case 'CLOSE_VULNERABLE_POPUP':
            return { ...state, isVulnerablePopupOpen: false };
        
        case 'ADD_NOTIFICATION': {
            const newToast: Toast = { ...action.payload, id: Date.now() };
            return { ...state, notifications: [...state.notifications, newToast] };
        }
        
        case 'REMOVE_NOTIFICATION':
            return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
        
        // Gamification & Advanced Features
        case 'SET_RANSOMWARE_PROTECTION': {
            const achievements = new Set(state.achievements);
            if(action.payload === 'configured') {
                achievements.add(AchievementID.LOCKED_DOWN);
            }
            const ransomwareState = addHistoryEntry(state, 'Ransomware protection was configured.', 'general');
            return { ...ransomwareState, ransomwareProtection: action.payload, achievements };
        }
        
        case 'UNLOCK_ACHIEVEMENT': {
            const achievements = new Set(state.achievements);
            achievements.add(action.payload.id);
            return { ...state, achievements };
        }
        
        case 'SHOW_PHISHING_POPUP':
            return { ...state, isPhishingPopupOpen: true };
        
        case 'CLOSE_PHISHING_POPUP': {
            let partialState: Partial<SystemState> = { isPhishingPopupOpen: false };
            if (action.payload.isClaimed) {
                const newThreat: Threat = { id: `phish-${Date.now()}`, name: 'Adware:Win32/FakePrize', status: 'active' };
                partialState.scan = { ...state.scan, threatsFound: [...state.scan.threatsFound, newThreat] };
                partialState.antivirus = ProtectionStatus.WARNING;
                const phishingState = addHistoryEntry(state, 'Phishing attempt was successful. A threat was added.', 'antivirus');
                return { ...phishingState, ...partialState };

            } else {
                 const achievements = new Set(state.achievements);
                 achievements.add(AchievementID.PHISH_AVOIDER);
                 partialState.achievements = achievements;
                 const phishingState = addHistoryEntry(state, 'Phishing attempt was successfully avoided.', 'general');
                 return { ...phishingState, ...partialState };
            }
        }
        
         case 'SHOW_SECURITY_REPORT':
            return { ...state, securityReportData: action.payload, isSecurityReportOpen: true };
        
        case 'CLOSE_SECURITY_REPORT':
            return { 
                ...state, 
                isSecurityReportOpen: false, 
                securityReportData: null,
                windows: state.windows.filter(w => w.id !== 'security-center'),
            };

        // --- New Reducers for Advanced Features ---
        case 'SET_FAMILY_OPTIONS': {
            const familyState = addHistoryEntry(state, 'Family options were updated.', 'general');
            return { ...familyState, familyOptions: action.payload };
        }
        
        case 'ADD_FIREWALL_RULE': {
            const newRule: FirewallRule = { ...action.payload, id: `rule-${Date.now()}` };
            const firewallRuleState = addHistoryEntry(state, `Firewall rule "${newRule.name}" was added.`, 'firewall');
            return { ...firewallRuleState, firewall: { ...state.firewall, rules: [...state.firewall.rules, newRule] } };
        }
        
        case 'REMOVE_FIREWALL_RULE': {
            const ruleName = state.firewall.rules.find(r => r.id === action.payload)?.name || 'a rule';
            const removeFirewallRuleState = addHistoryEntry(state, `Firewall rule "${ruleName}" was removed.`, 'firewall');
            return { ...removeFirewallRuleState, firewall: { ...state.firewall, rules: state.firewall.rules.filter(rule => rule.id !== action.payload) } };
        }
        
        case 'ADD_SCAN_EXCLUSION': {
            if (state.scan.exclusions.includes(action.payload)) return state; // Prevent duplicates
            const exclusionState = addHistoryEntry(state, `Scan exclusion added for: ${action.payload}`, 'antivirus');
            return { ...exclusionState, scan: { ...state.scan, exclusions: [...state.scan.exclusions, action.payload] } };
        }
        
        case 'REMOVE_SCAN_EXCLUSION': {
             const removeExclusionState = addHistoryEntry(state, `Scan exclusion removed for: ${action.payload}`, 'antivirus');
            return { ...removeExclusionState, scan: { ...state.scan, exclusions: state.scan.exclusions.filter(ex => ex !== action.payload) } };
        }
        
        case 'ADD_HISTORY_ENTRY':
            return addHistoryEntry(state, action.payload.message, action.payload.category);

        default:
            return state;
    }
}

// --- Application Components ---

const Window = ({ instance }: { instance: WindowInstance }) => {
    const { state, dispatch } = useContext(SystemContext)!;
    const { id, title, icon, component: Component, zIndex, isMaximized, isMinimized, position, size } = instance;
    const nodeRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleClose = () => {
        const score = calculateSecurityScore(state);
        const isSecure = score >= 90;
        if(id === 'security-center' && isSecure) {
            const threatsManaged = state.scan.threatsFound.filter(t => t.status !== 'active').length;
            const updatesInstalled = state.updates.items.filter(u => u.status === 'installed').length;
            dispatch({ type: 'SHOW_SECURITY_REPORT', payload: { threatsManaged, updatesInstalled, finalScore: score }});
        } else {
            dispatch({ type: 'CLOSE_WINDOW', payload: id });
        }
    };

    if (isMinimized) {
        return null;
    }

    const isActive = state.activeWindowId === id;

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".title-bar"
            position={isMaximized ? {x: 0, y: 0} : position}
            onStop={(e, data) => dispatch({ type: 'MOVE_WINDOW', payload: { id, position: { x: data.x, y: data.y } } })}
            disabled={isMaximized}
        >
            <div
                ref={nodeRef}
                onMouseDown={() => dispatch({ type: 'FOCUS_WINDOW', payload: id })}
                style={{
                    zIndex,
                    width: isMaximized ? '100vw' : `${size.width}px`,
                    height: isMaximized ? 'calc(100vh - 48px)' : `${size.height}px`,
                }}
                className={`absolute flex flex-col bg-[#2b2b2b] text-white rounded-lg shadow-2xl shadow-black/50 overflow-hidden 
                transition-all duration-200 ease-in-out ${isMaximized ? 'rounded-none top-0 left-0' : ''} 
                ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                ${isActive ? 'border border-blue-500/70' : 'border border-gray-500/30'}`}
            >
                <div className="title-bar flex items-center h-8 bg-gray-800/80 flex-shrink-0 cursor-move">
                    <div className="flex items-center pl-2 flex-grow">
                        <div className="w-4 h-4 mr-2">{React.cloneElement(icon, { className: 'w-4 h-4' })}</div>
                        <span className="text-xs">{title}</span>
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => dispatch({type: 'MINIMIZE_WINDOW', payload: id})} className="h-8 w-12 hover:bg-white/10 flex items-center justify-center"><MinimizeIcon className="w-4 h-4" /></button>
                        <button onClick={() => dispatch({type: 'TOGGLE_MAXIMIZE_WINDOW', payload: id})} className="h-8 w-12 hover:bg-white/10 flex items-center justify-center"><MaximizeIcon className="w-3 h-3" /></button>
                        <button onClick={handleClose} className="h-8 w-12 hover:bg-red-500 flex items-center justify-center"><CloseIcon className="w-4 h-4" /></button>
                    </div>
                </div>
                <div className="flex-grow overflow-hidden">
                    <Component />
                </div>
            </div>
        </Draggable>
    );
};

const StartMenu = () => {
    const { state, dispatch } = useContext(SystemContext)!;
    const [searchTerm, setSearchTerm] = useState('');

    const startMenuClass = state.isStartMenuOpen
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-4 pointer-events-none';

    if (!state.isStartMenuOpen && !document.querySelector('.start-menu-transition')) return null;

    const apps = [
        { id: 'security-center', name: 'Security Center', icon: <WindowsDefenderIcon/>, component: WindowsSecurity },
        { id: 'notepad', name: 'Notepad', icon: <NotepadIcon/>, component: Notepad },
        { id: 'calculator', name: 'Calculator', icon: <CalculatorIcon/>, component: Calculator },
        { id: 'settings', name: 'Settings', icon: <SettingsIcon/>, component: Settings },
        { id: 'onedrive-setup', name: 'OneDrive Setup', icon: <OneDriveIcon/>, component: OneDriveSetup }
    ];

    const filteredApps = apps.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const openApp = (app: typeof apps[0]) => {
         dispatch({type: 'OPEN_WINDOW', payload: {id: app.id, title: app.name, icon: app.icon, component: app.component}})
    }
    
    const PinnedAppIcon = ({ icon, name, onClick }: { icon: React.ReactNode, name: string, onClick: () => void }) => (
        <button onClick={onClick} className="flex flex-col items-center justify-center text-center w-24 h-24 rounded-md hover:bg-white/10 p-2">
            <div className="w-8 h-8 mb-1">{icon}</div>
            <span className="text-xs">{name}</span>
        </button>
    );
    
    const SearchResultIcon = ({ icon, name, onClick }: { icon: ReactElement, name: string, onClick: () => void }) => (
        <button onClick={onClick} className="flex items-center text-left w-full h-12 rounded-md hover:bg-white/10 p-2 space-x-3">
            <div className="w-6 h-6">{React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6' })}</div>
            <span className="text-sm">{name}</span>
        </button>
    );

    return (
        <div className={`start-menu-transition absolute bottom-14 left-1/2 -translate-x-1/2 w-[550px] h-[600px] bg-gray-800/80 backdrop-blur-xl rounded-lg shadow-lg p-6 flex flex-col z-40 transition-all duration-300 ease-out ${startMenuClass}`}>
            <div className="relative mb-4">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Type here to search" 
                    className="w-full bg-gray-700/80 rounded-md py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {searchTerm ? (
                <div className="flex-grow overflow-y-auto space-y-1">
                     <p className="font-semibold text-sm mb-2">Search results</p>
                     {filteredApps.length > 0 ? (
                        filteredApps.map(app => <SearchResultIcon key={app.id} icon={app.icon} name={app.name} onClick={() => openApp(app)} />)
                     ) : (
                         <p className="text-center text-gray-400 mt-8">No results found.</p>
                     )}
                </div>
            ) : (
                <>
                    <p className="font-semibold text-sm mb-2">Pinned</p>
                    <div className="grid grid-cols-6 gap-2">
                        {apps.slice(0, 6).map(app => (
                             <PinnedAppIcon key={app.id} icon={app.icon} name={app.name} onClick={() => openApp(app)} />
                        ))}
                    </div>
                    
                    <p className="font-semibold text-sm mt-6 mb-2">Recommended</p>
                     <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-700/50 rounded-md p-3 hover:bg-gray-700/80 cursor-pointer">
                            <p className="font-semibold text-sm">Presentation.pptx</p>
                            <p className="text-xs text-gray-400">Recently added</p>
                        </div>
                         <div className="bg-gray-700/50 rounded-md p-3 hover:bg-gray-700/80 cursor-pointer">
                            <p className="font-semibold text-sm">Quarterly_Report.docx</p>
                            <p className="text-xs text-gray-400">1d ago</p>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
};

const Taskbar = () => {
    const { state, dispatch } = useContext(SystemContext)!;
    const clickSound = useAudio('https://cdn.freesound.org/previews/273/273176_5121236-lq.mp3');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const handleStartClick = () => {
        dispatch({ type: 'TOGGLE_START_MENU' });
        clickSound();
    };

    const handleTaskbarIconClick = (window: WindowInstance) => {
        clickSound();
        if(window.isMinimized) {
            dispatch({ type: 'RESTORE_WINDOW', payload: window.id });
        } else {
            if (state.activeWindowId === window.id) {
                dispatch({ type: 'MINIMIZE_WINDOW', payload: window.id });
            } else {
                dispatch({ type: 'FOCUS_WINDOW', payload: window.id });
            }
        }
    };
    
    return (
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-800/80 backdrop-blur-xl flex justify-center z-50">
            <div className="flex items-center space-x-2">
                <button onClick={handleStartClick} className="p-3 rounded-md hover:bg-white/10"><WindowsLogoIcon /></button>
                <button onClick={handleStartClick} className="p-3 rounded-md hover:bg-white/10"><SearchIcon /></button>
                 {state.windows.map(w => (
                     <button key={w.id} onClick={() => handleTaskbarIconClick(w)} className="p-3 rounded-md hover:bg-white/10 relative">
                        {React.cloneElement(w.icon, {className: 'w-6 h-6'})}
                        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-400 rounded-t-sm transition-opacity duration-200 ${state.activeWindowId === w.id && !w.isMinimized ? 'opacity-100' : 'opacity-0'}`}></div>
                    </button>
                ))}
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-4 text-white">
                <WifiIcon className="w-5 h-5" />
                <VolumeIcon className="w-5 h-5" />
                <div className="text-xs text-center">
                    <div>{currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
                    <div>{currentTime.toLocaleDateString()}</div>
                </div>
            </div>
        </div>
    );
};

const VulnerablePopup = () => {
    const { dispatch } = useContext(SystemContext)!;
    
    return (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[9999]">
            <div className="bg-[#2b2b2b] p-8 rounded-lg shadow-2xl w-96 text-center">
                <h2 className="text-xl font-bold text-amber-400 mb-4">Your device is vulnerable!</h2>
                <p className="mb-6">You have not enabled all security protections. Are you sure you want to close the security center?</p>

                <div className="flex justify-center space-x-4">
                    <button onClick={() => dispatch({type: 'CLOSE_VULNERABLE_POPUP'})} className="px-6 py-2 bg-gray-500 hover:bg-gray-400 rounded-md">Stay protected</button>
                    <button onClick={() => {
                        dispatch({type: 'CLOSE_VULNERABLE_POPUP'});
                        dispatch({type: 'CLOSE_WINDOW', payload: 'security-center', force: true});
                    }} className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-md">Close anyway</button>
                </div>
            </div>
        </div>
    );
}

// --- Main Application Component ---
export default function App() {
    const [state, dispatch] = useReducer(systemReducer, initialState);
    const scanIntervalRef = useRef<number | null>(null);
    const notificationSound = useAudio('https://cdn.freesound.org/previews/403/403006_5121236-lq.mp3');
    const achievementSound = useAudio('https://cdn.freesound.org/previews/391/391539_5121236-lq.mp3');

    const [scanParams, setScanParams] = useState({ duration: 100, fileCount: 45000, threatChance: 0.3 });

    // Effect for scan logic
    useEffect(() => {
        if (state.scan.scanning) {
            const currentScanAction = (window as any).lastScanAction; 
            if (currentScanAction) {
                setScanParams(currentScanAction.payload);
            }

            let scannedFiles = 0;
            const totalFiles = scanParams.fileCount;
            const progressIncrement = 100 / scanParams.duration; 
            
            scanIntervalRef.current = window.setInterval(() => {
                const newProgress = Math.min(100, state.scan.progress + progressIncrement);
                scannedFiles += Math.floor(totalFiles / scanParams.duration) + Math.floor(Math.random() * 500);
                
                 const currentFile = criticalFilePaths[Math.floor(Math.random() * criticalFilePaths.length)];

                // Skip scanning if the file is in the exclusion list
                if (state.scan.exclusions.includes(currentFile)) {
                    return; 
                }

                dispatch({
                    type: 'UPDATE_SCAN_PROGRESS',
                    payload: {
                        progress: newProgress,
                        filesScanned: Math.min(totalFiles, scannedFiles),
                        currentFile: currentFile,
                    }
                });
            }, 100);

        } else if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current);
            scanIntervalRef.current = null;
        }

        if (state.scan.progress >= 100 && state.scan.scanning) {
            const threats: Threat[] = Math.random() < scanParams.threatChance 
                ? [{ id: `threat-${Date.now()}`, name: 'Trojan:Win32/Wacatac.B!ml', status: 'active' }] 
                : [];

            dispatch({ type: 'FINISH_SCAN', payload: { threats, scanTime: new Date().toLocaleString() } });
            
            if (threats.length > 0) {
                notificationSound();
                dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: { title: 'Threat found!', message: `Security found a threat: ${threats[0].name}.`, type: 'error', icon: <ShieldErrorIcon /> }
                });
            } else {
                 dispatch({
                    type: 'ADD_NOTIFICATION',
                    payload: { title: 'Scan complete', message: 'No new threats were found.', type: 'success', icon: <CheckCircleIcon /> }
                });
            }
        }
        
        return () => {
            if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
        };
    }, [state.scan.scanning, state.scan.progress, state.scan.exclusions, notificationSound, scanParams]);
    
    const enhancedDispatch = (action: SystemAction) => {
        if (action.type === 'START_SCAN') {
            (window as any).lastScanAction = action; 
        }
        dispatch(action);
    };

    // Effect for update logic
    useEffect(() => {
        if(state.updates.checking) {
            setTimeout(() => {
                dispatch({type: 'START_UPDATE_INSTALL'});
            }, 2000);
        }
        if(state.updates.installing) {
            const pendingUpdates = state.updates.items.filter(u => u.status === 'pending');
            if (pendingUpdates.length > 0) {
                 const updateToInstall = pendingUpdates[0];
                 dispatch({type: 'UPDATE_INSTALL_PROGRESS', payload: {updateId: updateToInstall.id, status: 'installing'}});
                 setTimeout(() => {
                     dispatch({type: 'UPDATE_INSTALL_PROGRESS', payload: {updateId: updateToInstall.id, status: 'installed'}});
                 }, 2000); 
            } else {
                 const allInstalled = state.updates.items.every(u => u.status === 'installed');
                 if(allInstalled) {
                     dispatch({type: 'FINISH_UPDATE'});
                     dispatch({
                        type: 'ADD_NOTIFICATION',
                        payload: { title: 'System updated', message: 'Your device is now up to date.', type: 'success', icon: <CheckCircleIcon /> }
                    });
                 }
            }
        }
    }, [state.updates.checking, state.updates.installing, state.updates.items]);

    // Effect for Phishing Popup
    useEffect(() => {
        const timer = setTimeout(() => {
            if(state.windows.some(w => w.id === 'security-center') && !state.isPhishingPopupOpen && !state.isVulnerablePopupOpen && !state.isSecurityReportOpen) {
                 dispatch({ type: 'SHOW_PHISHING_POPUP' });
            }
        }, 30000); // 30 seconds
        return () => clearTimeout(timer);
    }, [state.windows, state.isPhishingPopupOpen, state.isVulnerablePopupOpen, state.isSecurityReportOpen]);

    // Effect for checking achievements
    const previousAchievements = useRef(state.achievements);
    useEffect(() => {
        const currentAchievements = state.achievements;
        if (currentAchievements.size > previousAchievements.current.size) {
            const newAchievementId = [...currentAchievements].find(id => !previousAchievements.current.has(id));
            if (newAchievementId) {
                const achievement = achievementsList.get(newAchievementId);
                if (achievement) {
                    achievementSound();
                    dispatch({
                        type: 'ADD_NOTIFICATION',
                        payload: {
                            title: 'Achievement Unlocked!',
                            message: achievement.name,
                            type: 'achievement',
                            icon: <TrophyIcon />,
                        }
                    });
                }
            }
        }
        
        const score = calculateSecurityScore(state);
        if (score === 100 && !currentAchievements.has(AchievementID.PERFECT_SCORE)) {
            dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: { id: AchievementID.PERFECT_SCORE } });
        }

        previousAchievements.current = currentAchievements;
    }, [state.achievements, state, achievementSound]);

    return (
        <SystemContext.Provider value={{ state, dispatch: enhancedDispatch, achievements: achievementsList, securityScore: calculateSecurityScore(state) }}>
            <div
                className="relative h-screen w-screen"
                onClick={(e) => {
                    // Close start menu if the click is on the background div itself, not a child element.
                    if (e.target === e.currentTarget) {
                        dispatch({ type: 'CLOSE_START_MENU' });
                    }
                }}
            >
                {state.windows.map(w => <Window key={w.id} instance={w} />)}
                {state.isVulnerablePopupOpen && <VulnerablePopup />}
                {state.isPhishingPopupOpen && <PhishingPopup />}
                {state.isSecurityReportOpen && <SecurityReport />}
                <ToastContainer />
                <StartMenu />
                <Taskbar />
            </div>
        </SystemContext.Provider>
    );
}