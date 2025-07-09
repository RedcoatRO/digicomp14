import React, { useState, useContext } from 'react';
import { SystemState, SecurityView, SystemAction, AchievementID, Achievement } from '../types';
import { HomeIcon, WindowsDefenderIcon, ShieldIcon, InfoIcon, SettingsIcon, FamilyIcon, HistoryIcon } from './Icons';

// Import newly created or extracted view components
import HomeView from './HomeView';
import VirusThreatProtectionView from './VirusThreatProtectionView';
import FirewallProtectionView from './FirewallProtectionView';
import DeviceHealthView from './DeviceHealthView';
import FamilyOptionsView from './FamilyOptionsView';
import ProtectionHistoryView from './ProtectionHistoryView';
import AdvancedFirewallView from './AdvancedFirewallView';


// This context will be provided by App.tsx
// It needs to be exported so that all child components can use it.
export const SystemContext = React.createContext<{ 
    state: SystemState; 
    dispatch: React.Dispatch<SystemAction>; 
    achievements: Map<AchievementID, Achievement>, 
    securityScore: number 
} | null>(null);

/**
 * Main component for the Windows Security application window.
 * It acts as a router to display different views based on the user's selection
 * from the navigation sidebar.
 */
export default function WindowsSecurity() {
    const [view, setView] = useState<SecurityView>(SecurityView.HOME);

    // Navigation item component for the sidebar
    const NavItem = ({ icon, label, currentView }: { icon: React.ReactNode, label: SecurityView, currentView: SecurityView }) => (
        <button
            onClick={() => setView(label)}
            className={`w-full flex items-center px-4 py-2.5 text-left text-sm font-medium rounded-md transition-colors duration-150 ${
                label === currentView ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}
        >
            <span className="mr-3">{icon}</span>
            {label}
        </button>
    );

    // Renders the appropriate view component based on the current state
    const renderView = () => {
        switch (view) {
            case SecurityView.HOME:
                return <HomeView setView={setView} />;
            case SecurityView.VIRUS:
                return <VirusThreatProtectionView />;
            case SecurityView.FIREWALL:
                return <FirewallProtectionView setView={setView} />;
            case SecurityView.UPDATES:
                return <DeviceHealthView />;
            case SecurityView.FAMILY_OPTIONS:
                return <FamilyOptionsView />;
            case SecurityView.PROTECTION_HISTORY:
                return <ProtectionHistoryView />;
            case SecurityView.ADVANCED_FIREWALL:
                return <AdvancedFirewallView />;
            default:
                return <HomeView setView={setView} />;
        }
    };
    
    return (
        <div className="flex h-full bg-[#1e1e1e] text-white">
            {/* Sidebar Navigation */}
            <nav className="w-64 bg-black/20 p-4 space-y-2 flex-shrink-0">
                <NavItem icon={<HomeIcon className="w-5 h-5"/>} label={SecurityView.HOME} currentView={view} />
                <NavItem icon={<WindowsDefenderIcon className="w-5 h-5"/>} label={SecurityView.VIRUS} currentView={view} />
                <NavItem icon={<ShieldIcon className="w-5 h-5"/>} label={SecurityView.FIREWALL} currentView={view} />
                <NavItem icon={<InfoIcon className="w-5 h-5"/>} label={SecurityView.UPDATES} currentView={view} />
                <NavItem icon={<FamilyIcon className="w-5 h-5"/>} label={SecurityView.FAMILY_OPTIONS} currentView={view} />
                <NavItem icon={<HistoryIcon className="w-5 h-5"/>} label={SecurityView.PROTECTION_HISTORY} currentView={view} />
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-semibold">Windows Security</h1>
                    <button className="text-gray-400 hover:text-white">
                        <SettingsIcon className="w-6 h-6" />
                    </button>
                </div>
                {renderView()}
            </main>
        </div>
    );
}
