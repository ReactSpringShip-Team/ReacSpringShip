import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { XCircle, CheckCircle, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {/* Container for notifications - Top Right */}
      <div className="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`
              pointer-events-auto flex items-center gap-3 p-4 rounded-lg shadow-lg border-2 
              min-w-[300px] animate-in slide-in-from-right duration-300
              ${notification.type === 'error' ? 'bg-red-900/90 border-red-500 text-white' : 'bg-cyan-900/90 border-cyan-500 text-white'}
              backdrop-blur-md
            `}
          >
            {notification.type === 'error' ? (
              <XCircle className="text-red-400 shrink-0" size={20} />
            ) : (
              <CheckCircle className="text-cyan-400 shrink-0" size={20} />
            )}
            <span className="flex-1 font-medium">{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="hover:bg-white/10 p-1 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
