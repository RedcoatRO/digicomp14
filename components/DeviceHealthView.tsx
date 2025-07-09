import React, { useContext } from 'react';
import { SystemContext } from './WindowsSecurity';
import { CheckCircleIcon, WarningIcon, SyncIcon } from './Icons';

const DeviceHealthView = () => {
    const context = useContext(SystemContext);
    if (!context) return null;
    
    const { state, dispatch } = context;
    const { updates } = state;

    const updatesAvailable = updates.items.some(u => u.status === 'pending');
    const updatesInstalled = updates.items.every(u => u.status === 'installed');
    
    const HealthItem = ({ name, status, icon }: { name: string, status: string, icon: React.ReactNode }) => (
        <div className="flex items-center py-4">
            <div className="mr-4">{icon}</div>
            <div>
                <h4 className="font-semibold">{name}</h4>
                <p className="text-sm text-green-400">{status}</p>
            </div>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-semibold flex items-center mb-2">
                 {!updatesAvailable && updatesInstalled ? <CheckCircleIcon className="w-8 h-8 mr-3"/> : <WarningIcon className="w-8 h-8 mr-3"/>}
                Device performance & health
            </h2>
            <p className="text-gray-400 mb-6">View health status for your device and keep it clean and up to date.</p>
            
            {/* Health Report Section */}
            <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold mb-2">Health report</h3>
                <div className="divide-y divide-gray-600/50">
                    <HealthItem name="Storage capacity" status="No issues" icon={<CheckCircleIcon className="w-8 h-8 text-green-400"/>}/>
                    <HealthItem name="Battery life" status="No issues" icon={<CheckCircleIcon className="w-8 h-8 text-green-400"/>}/>
                    <HealthItem name="Apps and software" status="No issues" icon={<CheckCircleIcon className="w-8 h-8 text-green-400"/>}/>
                </div>
            </div>

            {/* Windows Update Section */}
            <div className="bg-gray-700/50 rounded-lg p-6">
                 <h3 className="text-lg font-bold mb-4">Windows Update</h3>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        {updates.checking && <p className="text-amber-400 flex items-center"><SyncIcon className="w-5 h-5 mr-2"/>Checking for updates...</p>}
                        {updates.installing && <p className="text-amber-400">Installing updates...</p>}
                        {!updates.checking && !updates.installing && (
                             updatesAvailable ? (
                                <p className="text-amber-400">Updates available. Ready to install.</p>
                            ) : (
                                <p className="text-green-400">You're up to date.</p>
                            )
                        )}
                        <p className="text-sm text-gray-400">Last checked: Today</p>
                    </div>
                    <div>
                        {updatesInstalled ? (
                             <button onClick={() => dispatch({ type: 'RESTART' })} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition-colors">
                                Restart now
                            </button>
                        ) : updatesAvailable && !updates.installing ? (
                             <button onClick={() => dispatch({ type: 'START_UPDATE_INSTALL' })} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition-colors">
                                Install now
                            </button>
                        ) : (
                            <button onClick={() => dispatch({ type: 'CHECK_FOR_UPDATES' })} disabled={updates.checking || updates.installing} className="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white font-semibold rounded-md transition-colors disabled:bg-gray-600">
                                Check for updates
                            </button>
                        )}
                    </div>
                </div>

                {(updatesAvailable || updates.installing || updatesInstalled) && (
                    <div className="border-t border-gray-600 pt-4">
                         <h3 className="font-semibold mb-2">Available Updates</h3>
                         <div className="space-y-3">
                            {state.updates.items.map(update => (
                                <div key={update.id}>
                                    <p className="font-medium">{update.name}</p>
                                    <p className="text-sm text-gray-400">{update.description}</p>
                                    {update.status === 'installing' && <div className="w-full bg-gray-600 rounded-full h-1 mt-1"><div className="bg-blue-500 h-1 rounded-full animate-pulse"></div></div>}
                                    {update.status === 'installed' && <p className="text-sm text-green-400">Status: Installed</p>}
                                </div>
                            ))}
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeviceHealthView;
