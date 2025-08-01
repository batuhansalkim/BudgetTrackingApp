import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService, { User } from '../services/authService';
import transactionService, { Transaction } from '../services/transactionService';
import goalService, { Goal } from '../services/goalService';

interface AppContextType {
    // Settings
    language: string;
    currency: string;
    setLanguage: (lang: string) => Promise<void>;
    setCurrency: (curr: string) => Promise<void>;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => Promise<void>;
    
    // Authentication
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    
    // Data
    transactions: Transaction[];
    goals: Goal[];
    loading: boolean;
    
    // Actions
    loadTransactions: () => Promise<void>;
    addTransaction: (data: any) => Promise<void>;
    updateTransaction: (id: string, data: any) => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;
    
    loadGoals: () => Promise<void>;
    addGoal: (data: any) => Promise<void>;
    updateGoal: (id: string, data: any) => Promise<void>;
    deleteGoal: (id: string) => Promise<void>;
    
    // Calculations
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    // Settings
    const [language, setLanguageState] = useState<string>('tr');
    const [currency, setCurrencyState] = useState<string>('TRY');
    const [theme, setThemeState] = useState<'light' | 'dark'>('light');
    
    // Authentication
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    
    // Data
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // İlk yüklemede kayıtlı ayarları ve authentication durumunu kontrol et
        initializeApp();
    }, []);

    const initializeApp = async () => {
        try {
            // Ayarları yükle
            await loadSettings();
            
            // Authentication durumunu kontrol et
            const savedToken = await authService.getToken();
            const savedUser = await authService.getUser();
            
            if (savedToken && savedUser) {
                setToken(savedToken);
                setUser(savedUser);
                setIsAuthenticated(true);
                
                // Verileri yükle
                await loadTransactions();
                await loadGoals();
            }
        } catch (error) {
            console.error('App initialization failed:', error);
        }
    };

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

    // Authentication functions
    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            const response = await authService.login({ email, password });
            setToken(response.token);
            setUser(response.user);
            setIsAuthenticated(true);
            
            // Verileri yükle
            await loadTransactions();
            await loadGoals();
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            setLoading(true);
            const response = await authService.register({ name, email, password });
            setToken(response.token);
            setUser(response.user);
            setIsAuthenticated(true);
            
            // Verileri yükle
            await loadTransactions();
            await loadGoals();
        } catch (error) {
            console.error('Register failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
            setTransactions([]);
            setGoals([]);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Transaction functions
    const loadTransactions = async () => {
        if (!token) return;
        
        try {
            setLoading(true);
            const data = await transactionService.getTransactions(token);
            setTransactions(data);
        } catch (error) {
            console.error('Load transactions failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTransaction = async (data: any) => {
        if (!token) return;
        
        try {
            setLoading(true);
            const newTransaction = await transactionService.createTransaction(data, token);
            setTransactions(prev => [newTransaction, ...prev]);
        } catch (error) {
            console.error('Add transaction failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateTransaction = async (id: string, data: any) => {
        if (!token) return;
        
        try {
            setLoading(true);
            const updatedTransaction = await transactionService.updateTransaction(id, data, token);
            setTransactions(prev => prev.map(t => t._id === id ? updatedTransaction : t));
        } catch (error) {
            console.error('Update transaction failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteTransaction = async (id: string) => {
        if (!token) return;
        
        try {
            setLoading(true);
            await transactionService.deleteTransaction(id, token);
            setTransactions(prev => prev.filter(t => t._id !== id));
        } catch (error) {
            console.error('Delete transaction failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Goal functions
    const loadGoals = async () => {
        if (!token) return;
        
        try {
            setLoading(true);
            const data = await goalService.getGoals(token);
            setGoals(data);
        } catch (error) {
            console.error('Load goals failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const addGoal = async (data: any) => {
        if (!token) return;
        
        try {
            setLoading(true);
            const newGoal = await goalService.createGoal(data, token);
            setGoals(prev => [newGoal, ...prev]);
        } catch (error) {
            console.error('Add goal failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateGoal = async (id: string, data: any) => {
        if (!token) return;
        
        try {
            setLoading(true);
            const updatedGoal = await goalService.updateGoal(id, data, token);
            setGoals(prev => prev.map(g => g._id === id ? updatedGoal : g));
        } catch (error) {
            console.error('Update goal failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteGoal = async (id: string) => {
        if (!token) return;
        
        try {
            setLoading(true);
            await goalService.deleteGoal(id, token);
            setGoals(prev => prev.filter(g => g._id !== id));
        } catch (error) {
            console.error('Delete goal failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Settings functions
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

    // Calculations
    const totalIncome = transactionService.calculateTotalIncome(transactions);
    const totalExpense = transactionService.calculateTotalExpense(transactions);
    const balance = transactionService.calculateBalance(transactions);

    return (
        <AppContext.Provider
            value={{
                // Settings
                language,
                currency,
                setLanguage,
                setCurrency,
                theme,
                setTheme,
                
                // Authentication
                user,
                token,
                isAuthenticated,
                login,
                register,
                logout,
                
                // Data
                transactions,
                goals,
                loading,
                
                // Actions
                loadTransactions,
                addTransaction,
                updateTransaction,
                deleteTransaction,
                
                loadGoals,
                addGoal,
                updateGoal,
                deleteGoal,
                
                // Calculations
                totalIncome,
                totalExpense,
                balance,
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
