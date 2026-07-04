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

export interface Account {
  id: string;
  name: string;
  type: 'Checking' | 'Savings' | 'Investment' | 'Credit';
  balance: number;
  currency: string;
  accountNumber: string;
}

export interface Card {
  id: string;
  type: 'Credit' | 'Debit';
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  network: 'Visa' | 'Mastercard' | 'Amex';
  balance?: number;
  limit?: number;
}

export interface CategorySpending {
  category: string;
  amount: number;
  color: string;
}

export interface DashboardData {
  profile: UserProfile;
  balance: Balance;
  transactions: Transaction[];
  chartData: ChartData[];
  accounts: Account[];
  cards: Card[];
  spendingByCategory: CategorySpending[];
}
