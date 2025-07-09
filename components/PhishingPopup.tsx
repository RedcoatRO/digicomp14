
import React, { useContext } from 'react';
import { SystemContext } from './WindowsSecurity';
import { WarningIcon } from './Icons';

const PhishingPopup = () => {
    const { dispatch } = useContext(SystemContext)!;

    const handleClaim = () => {
        dispatch({ type: 'CLOSE_PHISHING_POPUP', payload: { isClaimed: true } });
    };

    const handleClose = () => {
        dispatch({ type: 'CLOSE_PHISHING_POPUP', payload: { isClaimed: false } });
    };

    return (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[9999]">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-lg shadow-2xl w-96 text-white animate-pulse">
                <div className="bg-[#1e1e1e] p-8 rounded-md">
                     <div className="text-center">
                        <h2 className="text-2xl font-bold text-yellow-300 mb-2 animate-bounce">Congratulations!</h2>
                        <p className="text-lg mb-6">You've won a special prize! Click below to claim it now!</p>

                        <div className="flex flex-col space-y-3">
                            <button 
                                onClick={handleClaim} 
                                className="w-full px-6 py-3 bg-green-500 hover:bg-green-400 rounded-md font-bold text-lg transition-transform transform hover:scale-105"
                            >
                                Claim Your Prize!
                            </button>
                            <button 
                                onClick={handleClose} 
                                className="text-xs text-gray-400 hover:underline"
                            >
                                No thanks
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhishingPopup;
