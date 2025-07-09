import React, { useContext } from 'react';
import { SystemContext } from './WindowsSecurity';
import { ProtectionStatus, SecurityView } from '../types';
import { ShieldErrorIcon, ShieldIcon } from './Icons';

// Reusable ToggleSwitch component
const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => {
    return (
        <button onClick={onChange} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${checked ? 'bg-blue-600' : 'bg-gray-400'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    );
};

const FirewallProtectionView = ({ setView }: { setView: (view: SecurityView) => void }) => {
    const context = useContext(SystemContext);
    if (!context) return null;
    
    const { state, dispatch } = context;
    const firewallStatus = state.firewall.status;

    return (
        <div>
            <h2 className="text-2xl font-semibold flex items-center mb-2">
                 {firewallStatus === ProtectionStatus.ACTIVE ? <ShieldIcon className="w-8 h-8 mr-3"/> : <ShieldErrorIcon className="w-8 h-8 mr-3"/>}
                Firewall & network protection
            </h2>
            <p className="text-gray-400 mb-6">Manage firewall settings and monitor what's happening on your networks.</p>

            <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                    <div>
                        <h4 className="font-semibold">Domain network (workplace network)</h4>
                        <p className={`text-sm ${firewallStatus === ProtectionStatus.ACTIVE ? 'text-green-400' : 'text-red-400'}`}>
                            Firewall is {firewallStatus === ProtectionStatus.ACTIVE ? 'on' : 'off'}
                        </p>
                    </div>
                     <ToggleSwitch checked={firewallStatus === ProtectionStatus.ACTIVE} onChange={() => dispatch({type: 'TOGGLE_FIREWALL'})} />
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                    <div>
                        <h4 className="font-semibold">Private network (discoverable)</h4>
                        <p className={`text-sm ${firewallStatus === ProtectionStatus.ACTIVE ? 'text-green-400' : 'text-red-400'}`}>
                            Firewall is {firewallStatus === ProtectionStatus.ACTIVE ? 'on' : 'off'}
                        </p>
                    </div>
                     <ToggleSwitch checked={firewallStatus === ProtectionStatus.ACTIVE} onChange={() => dispatch({type: 'TOGGLE_FIREWALL'})} />
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                    <div>
                        <h4 className="font-semibold">Public network (non-discoverable)</h4>
                         <p className={`text-sm ${firewallStatus === ProtectionStatus.ACTIVE ? 'text-green-400' : 'text-red-400'}`}>
                            Firewall is {firewallStatus === ProtectionStatus.ACTIVE ? 'on' : 'off'}
                        </p>
                    </div>
                     <ToggleSwitch checked={firewallStatus === ProtectionStatus.ACTIVE} onChange={() => dispatch({type: 'TOGGLE_FIREWALL'})} />
                </div>
            </div>

            <div className="mt-6">
                <button 
                    onClick={() => setView(SecurityView.ADVANCED_FIREWALL)} 
                    className="text-blue-400 hover:underline"
                >
                    Advanced settings
                </button>
            </div>
        </div>
    );
};

export default FirewallProtectionView;
