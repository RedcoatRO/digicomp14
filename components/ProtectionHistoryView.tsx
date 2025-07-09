import React, { useState, useContext } from 'react';
import { SystemContext } from './WindowsSecurity';
import { HistoryCategory } from '../types';
import { HistoryIcon, ShieldIcon, WindowsDefenderIcon, SyncIcon, InfoIcon } from './Icons';

const categoryIcons: Record<HistoryCategory, React.ReactNode> = {
    antivirus: <WindowsDefenderIcon className="w-5 h-5 text-red-400" />,
    firewall: <ShieldIcon className="w-5 h-5 text-blue-400" />,
    updates: <SyncIcon className="w-5 h-5 text-green-400" />,
    general: <InfoIcon className="w-5 h-5 text-gray-400" />,
};

const ProtectionHistoryView = () => {
    const context = useContext(SystemContext);
    const [filter, setFilter] = useState<HistoryCategory | 'all'>('all');

    if (!context) return null;
    const { state } = context;

    const filteredHistory = state.history.filter(entry => 
        filter === 'all' || entry.category === filter
    );

    const FilterButton = ({ category, label }: { category: HistoryCategory | 'all', label: string }) => (
        <button
            onClick={() => setFilter(category)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                filter === category 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div>
            <h2 className="text-2xl font-semibold flex items-center mb-2">
                <HistoryIcon className="w-8 h-8 mr-3"/>
                Protection history
            </h2>
            <p className="text-gray-400 mb-6">See a log of protection actions and security recommendations.</p>

            <div className="bg-gray-700/50 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-gray-600">
                    <p className="font-semibold mr-2">Filters:</p>
                    <FilterButton category="all" label="All" />
                    <FilterButton category="antivirus" label="Antivirus" />
                    <FilterButton category="firewall" label="Firewall" />
                    <FilterButton category="updates" label="Updates" />
                    <FilterButton category="general" label="General" />
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {filteredHistory.length > 0 ? (
                        filteredHistory.map(entry => (
                            <div key={entry.id} className="flex items-start bg-gray-800/50 p-3 rounded-md">
                                <div className="mr-3 mt-1">{categoryIcons[entry.category]}</div>
                                <div className="flex-grow">
                                    <p className="font-medium">{entry.message}</p>
                                    <p className="text-xs text-gray-400">{entry.timestamp}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <p>No history entries for this filter.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProtectionHistoryView;
