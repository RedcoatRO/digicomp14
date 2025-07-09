import React, { useState, useContext } from 'react';
import { OneDriveIcon, CheckCircleIcon } from './Icons';
import { SystemContext } from './WindowsSecurity';

const OneDriveSetup = () => {
    const [step, setStep] = useState(1);
    const [selectedFolders, setSelectedFolders] = useState<string[]>(['Documents', 'Pictures']);
    const { dispatch } = useContext(SystemContext)!;

    const handleFolderToggle = (folder: string) => {
        setSelectedFolders(prev =>
            prev.includes(folder) ? prev.filter(f => f !== folder) : [...prev, folder]
        );
    };

    const handleFinish = () => {
        // Marcăm protecția ca fiind configurată în starea globală
        dispatch({ type: 'SET_RANSOMWARE_PROTECTION', payload: 'configured' });
        // Trimitem o notificare de succes
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                title: 'Ransomware Protection is Active',
                message: 'Your files in OneDrive are now protected.',
                type: 'success',
                icon: <CheckCircleIcon />,
            }
        });
        // Închidem fereastra curentă
        dispatch({ type: 'CLOSE_WINDOW', payload: 'onedrive-setup' });
    };

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] text-white p-8">
            <div className="flex items-center mb-6">
                <OneDriveIcon className="w-10 h-10 mr-4" />
                <div>
                    <h2 className="text-2xl font-semibold">Set up Ransomware Protection</h2>
                    <p className="text-gray-400">Protect your files with OneDrive</p>
                </div>
            </div>

            {/* Pasul 1: Autentificare simulată */}
            {step === 1 && (
                <div className="flex-grow flex flex-col justify-center items-center">
                    <p className="text-lg mb-2">Sign in to your Microsoft account</p>
                    <p className="text-sm text-gray-400 mb-4">We'll use this account to back up your files.</p>
                    <input type="email" placeholder="someone@example.com" className="w-full max-w-sm bg-gray-700 p-2 rounded border border-gray-600 mb-4" disabled />
                    <button onClick={() => setStep(2)} className="w-full max-w-sm px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold">
                        Next
                    </button>
                </div>
            )}
            
            {/* Pasul 2: Selectarea folderelor */}
            {step === 2 && (
                 <div className="flex-grow flex flex-col">
                    <p className="text-lg mb-2">Choose folders to protect</p>
                    <p className="text-sm text-gray-400 mb-4">These folders will be backed up to OneDrive.</p>
                    <div className="space-y-2 flex-grow">
                        {['Documents', 'Pictures', 'Desktop', 'Music', 'Videos'].map(folder => (
                             <div key={folder} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-md">
                                <label htmlFor={folder}>{folder}</label>
                                 <input
                                    id={folder}
                                    type="checkbox"
                                    checked={selectedFolders.includes(folder)}
                                    onChange={() => handleFolderToggle(folder)}
                                    className="form-checkbox h-5 w-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                                />
                            </div>
                        ))}
                    </div>
                     <button onClick={() => setStep(3)} className="mt-4 w-full px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold">
                        Start protection
                    </button>
                </div>
            )}

             {/* Pasul 3: Confirmare */}
            {step === 3 && (
                 <div className="flex-grow flex flex-col justify-center items-center text-center">
                    <CheckCircleIcon className="w-16 h-16 text-green-400 mb-4" />
                    <p className="text-xl font-semibold mb-2">You're all set!</p>
                    <p className="text-gray-400 mb-6">Your selected folders are now protected against ransomware attacks.</p>
                     <button onClick={handleFinish} className="w-full max-w-sm px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold">
                        Done
                    </button>
                </div>
            )}
        </div>
    );
};

export default OneDriveSetup;
