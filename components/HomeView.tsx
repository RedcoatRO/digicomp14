import React, { useContext } from 'react';
import { SecurityView, ProtectionStatus } from '../types';
import { SystemContext } from './WindowsSecurity';
import { CheckCircleIcon, ChevronRightIcon, ErrorIcon, ShieldErrorIcon, ShieldIcon, TrophyIcon, WarningIcon, WindowsDefenderIcon } from './Icons';
import SecurityScore from './SecurityScore';

// Helper component to display the status of a protection feature
const getStatusNode = (status: ProtectionStatus, textActive: string, textWarning: string, textInactive: string) => {
    if (status === ProtectionStatus.ACTIVE) return <p className="text-sm text-green-400 flex items-center"><CheckCircleIcon className="w-4 h-4 mr-1"/>{textActive}</p>;
    if (status === ProtectionStatus.WARNING) return <p className="text-sm text-amber-400 flex items-center"><WarningIcon className="w-4 h-4 mr-1"/>{textWarning}</p>;
    return <p className="text-sm text-red-400 flex items-center"><ErrorIcon className="w-4 h-4 mr-1"/>{textInactive}</p>;
};

// Tile component for each protection area on the home screen
const ProtectionTile = ({ title, icon, status, actionText, onAction, view, setView }: { title: string, icon: React.ReactNode, status: React.ReactNode, actionText?: string, onAction?: (e: React.MouseEvent) => void, view: SecurityView, setView: (view: SecurityView) => void }) => (
    <div onClick={() => setView(view)} className="flex items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 cursor-pointer transition-colors duration-150">
        <div className="mr-4">{icon}</div>
        <div className="flex-grow">
            <h3 className="font-semibold">{title}</h3>
            {status}
        </div>
        {actionText && onAction && (
            <button onClick={(e) => { e.stopPropagation(); onAction(e); }} className="ml-4 px-4 py-1.5 bg-gray-500 hover:bg-gray-400 text-white text-sm font-semibold rounded-md transition-colors">
                {actionText}
            </button>
        )}
        <ChevronRightIcon className="w-5 h-5 text-gray-500 ml-2" />
    </div>
);


const HomeView = ({ setView }: { setView: (view: SecurityView) => void }) => {
    const context = useContext(SystemContext);
    if (!context) return null;
    const { state, dispatch, achievements, securityScore } = context;

    const updatesAvailable = state.updates.items.some(u => u.status === 'pending');
    const unlockedAchievements = Array.from(state.achievements).map(id => achievements.get(id)!);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Security at a glance</h2>
            <p className="text-gray-400 mb-6">Review your security status, improve your score, and earn achievements.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Security Score takes 1 column span */}
                <div className="md:col-span-1">
                     <SecurityScore score={securityScore} />
                </div>

                {/* Protection Tiles take 2 column spans */}
                <div className="md:col-span-2 grid grid-cols-1 gap-4">
                     <ProtectionTile
                        title="Virus & threat protection"
                        icon={<WindowsDefenderIcon className="w-10 h-10"/>}
                        status={getStatusNode(state.antivirus, "No action needed.", "Threats found.", "Protection is off.")}
                        setView={setView}
                        view={SecurityView.VIRUS}
                    />
                    <ProtectionTile
                        title="Firewall & network protection"
                        icon={state.firewall.status === ProtectionStatus.ACTIVE ? <ShieldIcon className="w-10 h-10"/> : <ShieldErrorIcon className="w-10 h-10"/>}
                        status={getStatusNode(state.firewall.status, "No action needed.", "Firewall is off.", "Firewall is off.")}
                        setView={setView}
                        view={SecurityView.FIREWALL}
                    />
                     <ProtectionTile
                        title="Device performance & health"
                        icon={updatesAvailable ? <WarningIcon className="w-10 h-10 text-amber-400"/> : <CheckCircleIcon className="w-10 h-10 text-green-400"/>}
                        status={<p className={`text-sm ${updatesAvailable ? 'text-amber-400' : 'text-green-400'}`}>{updatesAvailable ? `Updates available.` : "System is up to date."}</p>}
                        setView={setView}
                        view={SecurityView.UPDATES}
                    />
                </div>
            </div>
             {/* Achievements Section */}
             {unlockedAchievements.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center"><TrophyIcon className="w-6 h-6 mr-2" /> Achievements Unlocked</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {unlockedAchievements.map(ach => (
                            <div key={ach.id} className="bg-gray-700/50 p-4 rounded-lg text-center" title={ach.description}>
                                <div className="flex justify-center mb-2">{React.cloneElement(ach.icon, { className: 'w-8 h-8' })}</div>
                                <p className="font-semibold text-sm">{ach.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeView;
