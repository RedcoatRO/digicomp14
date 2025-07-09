
import React, { useEffect, useState, ReactElement } from 'react';
import { Toast } from '../types';
import { CloseIcon as FluentCloseIcon, TrophyIcon } from './Icons';

interface ToastNotificationProps {
    toast: Toast;
    onDismiss: (id: number) => void;
}

const ToastNotification = ({ toast, onDismiss }: ToastNotificationProps) => {
    const [isExiting, setIsExiting] = useState(false);

    // Timer pentru auto-închidere
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onDismiss(toast.id), 300); // Așteaptă finalizarea animației de ieșire
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [toast.id, onDismiss]);

    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(() => onDismiss(toast.id), 300);
    };

    // Clasa pentru animații
    const animationClass = isExiting
        ? 'animate-[slide-out-right_0.3s_ease-out_forwards]'
        : 'animate-[slide-in-right_0.4s_cubic-bezier(0.25,1,0.5,1)_forwards]';

    const isAchievement = toast.type === 'achievement';
    
    const containerClasses = isAchievement
        ? 'bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 border-yellow-400'
        : 'bg-gray-800/90 border-white/10';

    return (
        <div
            className={`relative w-96 backdrop-blur-md text-white rounded-lg shadow-2xl mb-4 p-4 border overflow-hidden ${containerClasses} ${animationClass}`}
            role="alert"
            aria-live="assertive"
        >
            <div className="flex items-start">
                 <div className="flex-shrink-0 w-6 h-6 mt-1 mr-3">
                    {isAchievement ? <TrophyIcon className="w-6 h-6" /> : React.cloneElement(toast.icon, { className: 'w-6 h-6' })}
                </div>
                <div className="flex-grow">
                    <p className="font-bold text-base">{toast.title}</p>
                    <p className={`text-sm ${isAchievement ? 'text-yellow-100' : 'text-gray-300'}`}>{toast.message}</p>
                </div>
                <button
                    onClick={handleDismiss}
                    className="ml-4 flex-shrink-0 p-1 rounded-full text-gray-200 hover:bg-white/20 hover:text-white transition-colors"
                    aria-label="Close notification"
                >
                    <FluentCloseIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ToastNotification;