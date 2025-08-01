import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  // Register
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/auth/register', data);
      
      // Token'ı sakla
      await this.saveToken(response.token);
      await this.saveUser(response.user);
      
      return response;
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  }

  // Login
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/auth/login', data);
      
      // Token'ı sakla
      await this.saveToken(response.token);
      await this.saveUser(response.user);
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.TOKEN_KEY);
      await AsyncStorage.removeItem(this.USER_KEY);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  // Token'ı al
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Get token failed:', error);
      return null;
    }
  }

  // User'ı al
  async getUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Get user failed:', error);
      return null;
    }
  }

  // Token'ı sakla
  private async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Save token failed:', error);
      throw error;
    }
  }

  // User'ı sakla
  private async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Save user failed:', error);
      throw error;
    }
  }

  // Kullanıcı giriş yapmış mı kontrol et
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getToken();
      return !!token;
    } catch (error) {
      console.error('Check authentication failed:', error);
      return false;
    }
  }
}

export const authService = new AuthService();
export default authService; 