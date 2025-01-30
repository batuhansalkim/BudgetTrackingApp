import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CurrencyType = 'TRY' | 'USD' | 'EUR' | 'GBP';
type LanguageType = 'tr' | 'en';

interface SettingsContextType {
  language: LanguageType;
  currency: CurrencyType;
  setLanguage: (lang: LanguageType) => Promise<void>;
  setCurrency: (curr: CurrencyType) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>('tr');
  const [currency, setCurrencyState] = useState<CurrencyType>('TRY');

  useEffect(() => {
    // Uygulama başladığında kayıtlı ayarları yükle
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      const savedCurrency = await AsyncStorage.getItem('currency');
      
      if (savedLanguage) setLanguageState(savedLanguage as LanguageType);
      if (savedCurrency) setCurrencyState(savedCurrency as CurrencyType);
    } catch (error) {
      console.error('Ayarlar yüklenirken hata:', error);
    }
  };

  const setLanguage = async (lang: LanguageType) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Dil kaydedilirken hata:', error);
    }
  };

  const setCurrency = async (curr: CurrencyType) => {
    try {
      await AsyncStorage.setItem('currency', curr);
      setCurrencyState(curr);
    } catch (error) {
      console.error('Para birimi kaydedilirken hata:', error);
    }
  };

  return (
    <SettingsContext.Provider value={{ language, currency, setLanguage, setCurrency }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 