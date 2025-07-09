import React, { useState, useContext } from 'react';
import { SystemContext } from './WindowsSecurity';
import { FirewallRule } from '../types';
import { ShieldIcon, CloseIcon } from './Icons';

const AdvancedFirewallView = () => {
    const context = useContext(SystemContext);
    if (!context) return null;
    
    const { state, dispatch } = context;

    // Local state for the new rule form
    const [newRule, setNewRule] = useState<Omit<FirewallRule, 'id'>>({
        name: 'svchost.exe',
        action: 'block',
        direction: 'out',
        protocol: 'ANY',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewRule(prev => ({ ...prev, [name]: value }));
    };

    const handleAddRule = (e: React.FormEvent) => {
        e.preventDefault();
        if (newRule.name.trim()) {
            dispatch({ type: 'ADD_FIREWALL_RULE', payload: newRule });
            // Reset form for next entry
            setNewRule({ name: 'svchost.exe', action: 'block', direction: 'out', protocol: 'ANY' });
        }
    };
    
    return (
        <div>
            <h2 className="text-2xl font-semibold flex items-center mb-2">
                <ShieldIcon className="w-8 h-8 mr-3"/>
                Advanced Firewall Settings
            </h2>
            <p className="text-gray-400 mb-6">Create and manage custom rules for inbound and outbound connections.</p>
            
            {/* Form for adding a new rule */}
            <form onSubmit={handleAddRule} className="bg-gray-700/50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-4">Create New Rule</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input type="text" name="name" value={newRule.name} onChange={handleInputChange} placeholder="Program/Service (e.g., svchost.exe)" className="md:col-span-2 bg-gray-800 border border-gray-600 rounded px-2 py-1.5" />
                    <select name="action" value={newRule.action} onChange={handleInputChange} className="bg-gray-800 border border-gray-600 rounded px-2 py-1.5">
                        <option value="block">Block</option>
                        <option value="allow">Allow</option>
                    </select>
                    <select name="direction" value={newRule.direction} onChange={handleInputChange} className="bg-gray-800 border border-gray-600 rounded px-2 py-1.5">
                        <option value="in">Inbound</option>
                        <option value="out">Outbound</option>
                    </select>
                     <select name="protocol" value={newRule.protocol} onChange={handleInputChange} className="bg-gray-800 border border-gray-600 rounded px-2 py-1.5">
                        <option value="ANY">Any</option>
                        <option value="TCP">TCP</option>
                        <option value="UDP">UDP</option>
                    </select>
                    <div className="md:col-span-3"></div>
                    <button type="submit" className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition-colors">Add Rule</button>
                </div>
            </form>

            {/* List of existing rules */}
            <div className="bg-gray-700/50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Active Rules</h3>
                <div className="space-y-2">
                    {state.firewall.rules.length > 0 ? (
                        state.firewall.rules.map(rule => (
                            <div key={rule.id} className="flex items-center justify-between bg-gray-800/50 p-3 rounded-md">
                                <div>
                                    <span className={`font-bold ${rule.action === 'block' ? 'text-red-400' : 'text-green-400'}`}>
                                        {rule.action.toUpperCase()}
                                    </span>
                                    <span className="mx-2 text-gray-500">|</span>
                                    <span>{rule.name}</span>
                                    <span className="text-sm text-gray-400 ml-2">({rule.direction.toUpperCase()}, {rule.protocol})</span>
                                </div>
                                <button onClick={() => dispatch({ type: 'REMOVE_FIREWALL_RULE', payload: rule.id })} className="text-gray-400 hover:text-white">
                                    <CloseIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center py-4">No custom rules defined.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdvancedFirewallView;