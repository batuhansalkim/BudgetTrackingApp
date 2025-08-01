import apiClient from './apiClient';

export interface Goal {
  _id: string;
  user: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon?: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGoalData {
  title: string;
  targetAmount: number;
  currentAmount?: number;
  deadline: string;
  icon?: string;
  description?: string;
}

export interface UpdateGoalData {
  title?: string;
  targetAmount?: number;
  currentAmount?: number;
  deadline?: string;
  icon?: string;
  description?: string;
  isCompleted?: boolean;
}

class GoalService {
  // Tüm hedefleri getir
  async getGoals(token: string): Promise<Goal[]> {
    try {
      return await apiClient.get('/goals', token);
    } catch (error) {
      console.error('Get goals failed:', error);
      throw error;
    }
  }

  // Yeni hedef ekle
  async createGoal(data: CreateGoalData, token: string): Promise<Goal> {
    try {
      return await apiClient.post('/goals', data, token);
    } catch (error) {
      console.error('Create goal failed:', error);
      throw error;
    }
  }

  // Hedef güncelle
  async updateGoal(id: string, data: UpdateGoalData, token: string): Promise<Goal> {
    try {
      return await apiClient.put(`/goals/${id}`, data, token);
    } catch (error) {
      console.error('Update goal failed:', error);
      throw error;
    }
  }

  // Hedef sil
  async deleteGoal(id: string, token: string): Promise<{ message: string }> {
    try {
      return await apiClient.delete(`/goals/${id}`, token);
    } catch (error) {
      console.error('Delete goal failed:', error);
      throw error;
    }
  }

  // İlerleme yüzdesini hesapla
  calculateProgress(goal: Goal): number {
    if (goal.targetAmount === 0) return 0;
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  }

  // Hedef tamamlandı mı kontrol et
  isGoalCompleted(goal: Goal): boolean {
    return goal.currentAmount >= goal.targetAmount;
  }

  // Kalan gün sayısını hesapla
  getDaysRemaining(goal: Goal): number {
    const deadline = new Date(goal.deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  // Aktif hedefleri getir
  getActiveGoals(goals: Goal[]): Goal[] {
    return goals.filter(goal => !goal.isCompleted);
  }

  // Tamamlanan hedefleri getir
  getCompletedGoals(goals: Goal[]): Goal[] {
    return goals.filter(goal => goal.isCompleted);
  }

  // Yaklaşan deadline'lı hedefleri getir (7 gün içinde)
  getUpcomingDeadlines(goals: Goal[]): Goal[] {
    const today = new Date();
    const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return goals.filter(goal => {
      const deadline = new Date(goal.deadline);
      return deadline <= sevenDaysFromNow && !goal.isCompleted;
    });
  }

  // Toplam hedef tutarını hesapla
  calculateTotalTargetAmount(goals: Goal[]): number {
    return goals.reduce((total, goal) => total + goal.targetAmount, 0);
  }

  // Toplam mevcut tutarı hesapla
  calculateTotalCurrentAmount(goals: Goal[]): number {
    return goals.reduce((total, goal) => total + goal.currentAmount, 0);
  }

  // Genel ilerleme yüzdesini hesapla
  calculateOverallProgress(goals: Goal[]): number {
    const totalTarget = this.calculateTotalTargetAmount(goals);
    const totalCurrent = this.calculateTotalCurrentAmount(goals);
    
    if (totalTarget === 0) return 0;
    return Math.min((totalCurrent / totalTarget) * 100, 100);
  }
}

export const goalService = new GoalService();
export default goalService; 