import apiClient from './apiClient';

export interface Transaction {
  _id: string;
  user: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description?: string;
  date: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionData {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description?: string;
  date?: string;
  icon?: string;
}

export interface UpdateTransactionData {
  type?: 'income' | 'expense';
  amount?: number;
  category?: string;
  description?: string;
  date?: string;
  icon?: string;
}

class TransactionService {
  // Tüm işlemleri getir
  async getTransactions(token: string): Promise<Transaction[]> {
    try {
      return await apiClient.get('/transactions', token);
    } catch (error) {
      console.error('Get transactions failed:', error);
      throw error;
    }
  }

  // Yeni işlem ekle
  async createTransaction(data: CreateTransactionData, token: string): Promise<Transaction> {
    try {
      return await apiClient.post('/transactions', data, token);
    } catch (error) {
      console.error('Create transaction failed:', error);
      throw error;
    }
  }

  // İşlem güncelle
  async updateTransaction(id: string, data: UpdateTransactionData, token: string): Promise<Transaction> {
    try {
      return await apiClient.put(`/transactions/${id}`, data, token);
    } catch (error) {
      console.error('Update transaction failed:', error);
      throw error;
    }
  }

  // İşlem sil
  async deleteTransaction(id: string, token: string): Promise<{ message: string }> {
    try {
      return await apiClient.delete(`/transactions/${id}`, token);
    } catch (error) {
      console.error('Delete transaction failed:', error);
      throw error;
    }
  }

  // Gelir toplamını hesapla
  calculateTotalIncome(transactions: Transaction[]): number {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + t.amount, 0);
  }

  // Gider toplamını hesapla
  calculateTotalExpense(transactions: Transaction[]): number {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((total, t) => total + t.amount, 0);
  }

  // Bakiye hesapla
  calculateBalance(transactions: Transaction[]): number {
    const income = this.calculateTotalIncome(transactions);
    const expense = this.calculateTotalExpense(transactions);
    return income - expense;
  }

  // Kategori bazlı harcamaları getir
  getExpensesByCategory(transactions: Transaction[]): Record<string, number> {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals: Record<string, number> = {};

    expenses.forEach(transaction => {
      const category = transaction.category;
      categoryTotals[category] = (categoryTotals[category] || 0) + transaction.amount;
    });

    return categoryTotals;
  }

  // Tarih bazlı filtreleme
  filterByDateRange(transactions: Transaction[], startDate: Date, endDate: Date): Transaction[] {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }

  // Kategori bazlı filtreleme
  filterByCategory(transactions: Transaction[], category: string): Transaction[] {
    return transactions.filter(transaction => transaction.category === category);
  }

  // Tip bazlı filtreleme
  filterByType(transactions: Transaction[], type: 'income' | 'expense'): Transaction[] {
    return transactions.filter(transaction => transaction.type === type);
  }
}

export const transactionService = new TransactionService();
export default transactionService; 