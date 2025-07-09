import React, { useContext } from 'react';
import { SystemContext } from './WindowsSecurity';
import ToastNotification from './ToastNotification';

const ToastContainer = () => {
    const context = useContext(SystemContext);

    if (!context) {
        return null;
    }

    const { state, dispatch } = context;

    const handleDismiss = (id: number) => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    };

    return (
        <div className="fixed bottom-16 right-4 z-[10000] w-96">
            {state.notifications.map((toast) => (
                <ToastNotification
                    key={toast.id}
                    toast={toast}
                    onDismiss={handleDismiss}
                />
            ))}
        </div>
    );
};

export default ToastContainer;
