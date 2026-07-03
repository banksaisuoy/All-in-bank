export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
}

export interface Balance {
  total: number;
  available: number;
  currency: string;
}

export interface ChartData {
  month: string;
  income: number;
  expenses: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface DashboardData {
  profile: UserProfile;
  balance: Balance;
  transactions: Transaction[];
  chartData: ChartData[];
}
