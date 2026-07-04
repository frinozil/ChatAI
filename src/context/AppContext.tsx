'use client';

import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  globalSearchText: string;
  setGlobalSearchText: (text: string) => void;
  isDocPanelOpen: boolean; // Right sidebar toggle for tablets/desktops
  setIsDocPanelOpen: (open: boolean) => void;
  isSidebarOpen: boolean; // Left sidebar toggle for desktop, tablet, and mobile
  setIsSidebarOpen: (open: boolean) => void;
  isMobileDocOpen: boolean; // Right drawer toggle for mobile
  setIsMobileDocOpen: (open: boolean) => void;
  notification: {
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
    open: boolean;
  } | null;
  showNotification: (message: string, severity?: 'success' | 'error' | 'info' | 'warning') => void;
  hideNotification: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [globalSearchText, setGlobalSearchText] = useState<string>('');
  const [isDocPanelOpen, setIsDocPanelOpen] = useState<boolean>(false); // Collapsed on load!
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // Collapsed on load!
  const [isMobileDocOpen, setIsMobileDocOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<AppContextType['notification']>(null);

  const showNotification = (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning' = 'info'
  ) => {
    setNotification({ message, severity, open: true });
  };

  const hideNotification = () => {
    setNotification((prev) => (prev ? { ...prev, open: false } : null));
  };

  return (
    <AppContext.Provider
      value={{
        activeConversationId,
        setActiveConversationId,
        globalSearchText,
        setGlobalSearchText,
        isDocPanelOpen,
        setIsDocPanelOpen,
        isSidebarOpen,
        setIsSidebarOpen,
        isMobileDocOpen,
        setIsMobileDocOpen,
        notification,
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppContextProvider');
  }
  return context;
};
