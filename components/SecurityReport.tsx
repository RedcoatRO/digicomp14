
import React, { useContext } from 'react';
import { SystemContext } from './WindowsSecurity';
import { CheckCircleIcon, ShieldIcon } from './Icons';

const SecurityReport = () => {
    const { state, dispatch } = useContext(SystemContext)!;
    const { securityReportData } = state;

    if (!securityReportData) return null;

    const handleClose = () => {
        dispatch({ type: 'CLOSE_SECURITY_REPORT' });
    };

    return (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[9999]">
            <div className="bg-[#2b2b2b] p-8 rounded-lg shadow-2xl w-[450px] text-center border border-green-500/50">
                <div className="flex justify-center mb-4">
                    <CheckCircleIcon className="w-16 h-16 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">System Secure!</h2>
                <p className="text-gray-400 mb-6">You've successfully secured the device. Here's your report:</p>

                <div className="bg-gray-700/50 rounded-lg p-4 text-left space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Final Security Score:</span>
                        <span className="font-bold text-green-400 text-lg">{securityReportData.finalScore}%</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-semibold">Threats Managed:</span>
                        <span className="font-bold text-amber-400">{securityReportData.threatsManaged}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-semibold">Updates Installed:</span>
                        <span className="font-bold text-blue-400">{securityReportData.updatesInstalled}</span>
                    </div>
                </div>

                <button 
                    onClick={handleClose} 
                    className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold"
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default SecurityReport;
