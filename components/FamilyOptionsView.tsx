import React, { useState, useContext } from 'react';
import { SystemContext } from './WindowsSecurity';
import { FamilyIcon } from './Icons';

const FamilyOptionsView = () => {
    const context = useContext(SystemContext);
    if (!context) return null;

    const { state, dispatch } = context;
    
    // Local state to manage UI changes before saving
    const [screenTime, setScreenTime] = useState(state.familyOptions.screenTimeLimit);
    const [filterLevel, setFilterLevel] = useState(state.familyOptions.contentFilterLevel);

    const handleSaveChanges = () => {
        dispatch({ 
            type: 'SET_FAMILY_OPTIONS', 
            payload: { screenTimeLimit: screenTime, contentFilterLevel: filterLevel }
        });
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                title: 'Family Settings Updated',
                message: 'Your new settings have been saved.',
                type: 'success',
                icon: <FamilyIcon />,
            }
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold flex items-center mb-2">
                <FamilyIcon className="w-8 h-8 mr-3"/>
                Family options
            </h2>
            <p className="text-gray-400 mb-6">Manage digital wellbeing for your family, set screen time limits, and filter content.</p>

            <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-4">Screen Time Limits</h3>
                <p className="text-sm text-gray-400 mb-4">Set a daily time limit for device usage.</p>
                <div className="flex items-center space-x-4">
                    <span>1 hour</span>
                    <input
                        type="range"
                        min="1"
                        max="8"
                        step="1"
                        value={screenTime}
                        onChange={(e) => setScreenTime(Number(e.target.value))}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <span>8 hours</span>
                </div>
                <div className="text-center font-bold text-lg mt-2">{screenTime} hour(s) per day</div>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-4">Content Filtering</h3>
                <p className="text-sm text-gray-400 mb-4">Restrict access to inappropriate apps, games, and websites.</p>
                <div className="flex justify-around">
                    <RadioOption id="none" label="None" level="none" currentLevel={filterLevel} setLevel={setFilterLevel} />
                    <RadioOption id="low" label="Low" description="Block inappropriate websites." level="low" currentLevel={filterLevel} setLevel={setFilterLevel}/>
                    <RadioOption id="high" label="High" description="Only allow approved websites." level="high" currentLevel={filterLevel} setLevel={setFilterLevel}/>
                </div>
            </div>
            
            <div className="flex justify-end">
                <button 
                    onClick={handleSaveChanges}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition-colors"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

const RadioOption = ({ id, label, description, level, currentLevel, setLevel }: { id: string, label: string, description?: string, level: 'none' | 'low' | 'high', currentLevel: string, setLevel: (level: 'none' | 'low' | 'high') => void }) => (
    <div 
        onClick={() => setLevel(level)}
        className={`p-4 border-2 rounded-lg cursor-pointer w-48 text-center ${currentLevel === level ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'}`}
    >
        <input type="radio" id={id} name="filterLevel" value={level} checked={currentLevel === level} className="hidden" readOnly/>
        <label htmlFor={id} className="font-semibold cursor-pointer">{label}</label>
        {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
    </div>
);

export default FamilyOptionsView;
