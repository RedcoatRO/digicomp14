import React, { useContext, useState, useEffect } from 'react';
import { SystemContext, useAudio } from './WindowsSecurity';
import { WindowInstance } from '../types';
import { WindowsLogoIcon, SearchIcon, WifiIcon, VolumeIcon, InfoIcon, CheckCircleIcon } from './Icons';

const Taskbar = () => {
    const context = useContext(SystemContext);
    const clickSound = useAudio('https://cdn.freesound.org/previews/273/273176_5121236-lq.mp3');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    if (!context) return null;
    const { state, dispatch, securityScore } = context;

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
            {/* Secțiunea centrală cu iconițele aplicațiilor și butoanele de evaluare */}
            <div className="flex items-center space-x-2">
                <button onClick={handleStartClick} className="p-3 rounded-md hover:bg-white/10"><WindowsLogoIcon /></button>
                <button onClick={handleStartClick} className="p-3 rounded-md hover:bg-white/10"><SearchIcon /></button>
                
                {/* Maparea iconițelor aplicațiilor deschise */}
                {state.windows.map(w => (
                     <button key={w.id} onClick={() => handleTaskbarIconClick(w)} className="p-3 rounded-md hover:bg-white/10 relative">
                        {React.cloneElement(w.icon, {className: 'w-6 h-6'})}
                        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-400 rounded-t-sm transition-opacity duration-200 ${state.activeWindowId === w.id && !w.isMinimized ? 'opacity-100' : 'opacity-0'}`}></div>
                    </button>
                ))}

                 {/* Container pentru scor și butoanele de acțiune */}
                 <div className="flex items-center space-x-2 p-1 bg-black/20 rounded-md ml-4">
                    <span className="text-sm font-semibold px-2">Scor: {securityScore}</span>
                    <button 
                        onClick={() => dispatch({ type: 'SHOW_HINT' })} 
                        className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-500 flex items-center space-x-1.5 transition-colors"
                        title="Primește un indiciu"
                    >
                        <InfoIcon className="w-3.5 h-3.5"/>
                        <span>Indiciu</span>
                    </button>
                    <button 
                        onClick={() => dispatch({ type: 'EVALUATE' })} 
                        className="px-3 py-1 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-500 flex items-center space-x-1.5 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                        title="Finalizează exercițiul și vezi scorul"
                        disabled={state.isEvaluationComplete}
                    >
                        <CheckCircleIcon className="w-4 h-4 fill-current"/>
                        <span>Verifică-mă!</span>
                    </button>
                </div>
            </div>

            {/* Secțiunea din dreapta cu ceasul și iconițele de sistem */}
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

export default Taskbar;