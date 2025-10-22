import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserAddress, Election, Language } from '../types';

interface AppContextType {
  selectedElection: Election | null;
  setSelectedElection: (election: Election | null) => void;
  userAddress: UserAddress | null;
  setUserAddress: (address: UserAddress | null) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  return (
    <AppContext.Provider
      value={{
        selectedElection,
        setSelectedElection,
        userAddress,
        setUserAddress,
        language,
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
