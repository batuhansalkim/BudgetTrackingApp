import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppContextType {
    language: string;
    currency: string;
    setLanguage: (lang: string) => Promise<void>;
    setCurrency: (curr: string) => Promise<void>;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<string>('tr');
    const [currency, setCurrencyState] = useState<string>('TRY');
    const [theme, setThemeState] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        // İlk yüklemede kayıtlı ayarları al
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const savedLanguage = await AsyncStorage.getItem('language');
            const savedCurrency = await AsyncStorage.getItem('currency');
            
            if (savedLanguage) setLanguageState(savedLanguage);
            if (savedCurrency) setCurrencyState(savedCurrency);
        } catch (error) {
            console.error('Ayarlar yüklenirken hata:', error);
        }
    };

    const setLanguage = async (lang: string) => {
        try {
            await AsyncStorage.setItem('language', lang);
            setLanguageState(lang);
        } catch (error) {
            console.error('Dil ayarı kaydedilirken hata:', error);
        }
    };

    const setCurrency = async (curr: string) => {
        try {
            await AsyncStorage.setItem('currency', curr);
            setCurrencyState(curr);
        } catch (error) {
            console.error('Para birimi ayarı kaydedilirken hata:', error);
        }
    };

    const setTheme = async (newTheme: 'light' | 'dark') => {
        setThemeState(newTheme);
    };

    return (
        <AppContext.Provider
            value={{
                language,
                currency,
                setLanguage,
                setCurrency,
                theme,
                setTheme,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
} 
