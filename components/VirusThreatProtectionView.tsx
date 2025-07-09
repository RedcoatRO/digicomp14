import React, { useState, useContext } from 'react';
import { SystemContext } from './WindowsSecurity';
import { ProtectionStatus } from '../types';
import { WindowsDefenderIcon, ErrorIcon, CheckCircleIcon, OneDriveIcon, SettingsIcon, CloseIcon } from './Icons';
import OneDriveSetup from './OneDriveSetup';

// Reusable ToggleSwitch component
const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => {
    return (
        <button onClick={onChange} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${checked ? 'bg-blue-600' : 'bg-gray-400'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    );
};

const VirusThreatProtectionView = () => {
    const context = useContext(SystemContext);
    if (!context) return null;
    
    const { state, dispatch } = context;
    const { antivirus, scan, ransomwareProtection } = state;
    const [showScanOptions, setShowScanOptions] = useState(false);
    const [showExclusions, setShowExclusions] = useState(false);
    const [newExclusion, setNewExclusion] = useState('');

    const scanTypes = {
        quick: { scanType: 'Quick scan', duration: 100, fileCount: 45000, threatChance: 0.3 },
        full: { scanType: 'Full scan', duration: 300, fileCount: 250000, threatChance: 0.6 },
        custom: { scanType: 'Custom scan', duration: 150, fileCount: 120000, threatChance: 0.4 },
        offline: { scanType: 'Microsoft Defender Offline scan', duration: 200, fileCount: 180000, threatChance: 0.8 },
    };

    const handleScan = (scanConfig: typeof scanTypes.quick) => {
        if (!scan.scanning) {
            dispatch({ type: 'START_SCAN', payload: scanConfig });
            setShowScanOptions(false);
        }
    };
    
    const handleAddExclusion = () => {
        if(newExclusion.trim()) {
            dispatch({ type: 'ADD_SCAN_EXCLUSION', payload: newExclusion.trim() });
            setNewExclusion('');
        }
    };
    
    const activeThreats = scan.threatsFound.filter(t => t.status === 'active');
    
    return (
        <div>
            <h2 className="text-2xl font-semibold flex items-center mb-2">
                <WindowsDefenderIcon className="w-8 h-8 mr-3"/>
                Virus & threat protection
            </h2>
            <p className="text-gray-400 mb-6">Manage your device's protection against viruses and other threats.</p>

            {/* Current Threats Section */}
            <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-4">Current threats</h3>
                {scan.scanning ? (
                    <div>
                        <p className="text-amber-400 mb-2">{scan.scanType} in progress...</p>
                        <div className="w-full bg-gray-600 rounded-full h-2.5 mb-2">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${scan.progress}%` }}></div>
                        </div>
                        <p className="text-sm text-gray-400 mt-2 truncate">Scanning: {scan.currentlyScanningFile}</p>
                        <p className="text-sm text-gray-400 mt-1">{scan.filesScanned.toLocaleString()} files scanned.</p>
                    </div>
                ) : (
                     <>
                        {activeThreats.length > 0 ? (
                            <div className="text-red-400 flex items-start mb-4">
                                <ErrorIcon className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-bold">{activeThreats.length} threat(s) found. Action needed.</p>
                                    <ul className="list-disc list-inside text-sm mt-1">
                                        {activeThreats.map(threat => <li key={threat.id}>{threat.name}</li>)}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="text-green-400 flex items-center mb-2">
                                <CheckCircleIcon className="w-5 h-5 mr-2" />
                                <p>No current threats.</p>
                            </div>
                        )}
                        {scan.lastScan && <p className="text-sm text-gray-400">Last scan: {scan.lastScan} ({scan.scanType})</p>}
                        
                        <div className="mt-4">
                            <button onClick={() => handleScan(scanTypes.quick)} disabled={scan.scanning || antivirus !== ProtectionStatus.ACTIVE} className="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white font-semibold rounded-md transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                                Quick scan
                            </button>
                             <button onClick={() => setShowScanOptions(!showScanOptions)} className="ml-4 text-blue-400 hover:underline text-sm">
                                Scan options
                            </button>
                        </div>
                       
                        {showScanOptions && (
                            <div className="mt-4 border-t border-gray-600 pt-4 space-y-2">
                                <button onClick={() => handleScan(scanTypes.full)} className="block w-full text-left p-2 rounded hover:bg-white/5">Full scan</button>
                                <button onClick={() => handleScan(scanTypes.custom)} className="block w-full text-left p-2 rounded hover:bg-white/5">Custom scan</button>
                                <button onClick={() => handleScan(scanTypes.offline)} className="block w-full text-left p-2 rounded hover:bg-white/5">Microsoft Defender Offline scan</button>
                            </div>
                        )}

                        {activeThreats.length > 0 && (
                            <div className="mt-6 border-t border-gray-600 pt-4">
                                <h4 className="font-semibold mb-2">Manage Threats</h4>
                                {activeThreats.map(threat => (
                                    <div key={threat.id} className="flex items-center justify-between p-2 bg-gray-800/50 rounded mb-2">
                                        <p>{threat.name}</p>
                                        <div className="space-x-2">
                                            <button onClick={() => dispatch({type: 'MANAGE_THREAT', payload: {threatId: threat.id, action: 'quarantined'}})} className="text-xs px-2 py-1 bg-yellow-600 rounded">Quarantine</button>
                                            <button onClick={() => dispatch({type: 'MANAGE_THREAT', payload: {threatId: threat.id, action: 'removed'}})} className="text-xs px-2 py-1 bg-red-700 rounded">Remove</button>
                                            <button onClick={() => dispatch({type: 'MANAGE_THREAT', payload: {threatId: threat.id, action: 'allowed'}})} className="text-xs px-2 py-1 bg-gray-600 rounded">Allow</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Ransomware Protection Section */}
            <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center"><OneDriveIcon className="w-6 h-6 mr-2" /> Ransomware protection</h3>
                {ransomwareProtection === 'configured' ? (
                    <div className="text-green-400 flex items-center">
                        <CheckCircleIcon className="w-5 h-5 mr-2"/>
                        <p>Your files are protected by OneDrive.</p>
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-gray-400 mb-4">Set up OneDrive for file recovery options in case of a ransomware attack.</p>
                        <button onClick={() => dispatch({type: 'OPEN_WINDOW', payload: { id: 'onedrive-setup', title: 'Set up Ransomware Protection', icon: <OneDriveIcon/>, component: OneDriveSetup }})} className="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white font-semibold rounded-md transition-colors">
                            Set up OneDrive
                        </button>
                    </>
                )}
            </div>

            {/* Settings Section */}
            <div className="bg-gray-700/50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Virus & threat protection settings</h3>
                <div className="flex justify-between items-center py-2 border-b border-gray-600/50">
                    <div>
                        <p>Real-time protection</p>
                        <p className="text-sm text-gray-400">Finds and stops malware from installing or running on your device.</p>
                    </div>
                    <ToggleSwitch checked={antivirus === ProtectionStatus.ACTIVE} onChange={() => dispatch({type: 'TOGGLE_ANTIVIRUS'})} />
                </div>
                {/* Exclusions Section */}
                <div className="py-2">
                    <button onClick={() => setShowExclusions(!showExclusions)} className="text-blue-400 hover:underline">
                        Add or remove exclusions
                    </button>
                    {showExclusions && (
                        <div className="mt-4 pl-4 border-l-2 border-blue-500">
                            <p className="text-sm text-gray-400 mb-4">Exclude files, folders, file types, or processes from scans.</p>
                            <div className="space-y-2 mb-4">
                                {scan.exclusions.map(ex => (
                                    <div key={ex} className="flex items-center justify-between bg-gray-800/60 p-2 rounded">
                                        <span className="font-mono text-sm">{ex}</span>
                                        <button onClick={() => dispatch({ type: 'REMOVE_SCAN_EXCLUSION', payload: ex })} className="text-gray-400 hover:text-white">
                                            <CloseIcon className="w-4 h-4"/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex space-x-2">
                                <input 
                                    type="text" 
                                    value={newExclusion}
                                    onChange={(e) => setNewExclusion(e.target.value)}
                                    placeholder="C:\path\to\exclude"
                                    className="flex-grow bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm"
                                />
                                <button onClick={handleAddExclusion} className="px-3 py-1 bg-gray-500 hover:bg-gray-400 rounded text-sm font-semibold">Add</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VirusThreatProtectionView;