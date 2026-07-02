export type Transaction = {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  date: string;
  description: string;
  category: string;
};

export type ChartData = {
  name: string;
  income: number;
  expense: number;
  balance: number;
};

export type OverviewData = {
  totalBalance: number;
  income: number;
  expenses: number;
  savings: number;
};

export const getMockOverviewData = (): OverviewData => ({
  totalBalance: 12450.75,
  income: 5430.00,
  expenses: 3120.50,
  savings: 2309.50,
});

export const getMockTransactions = (): Transaction[] => [
  { id: '1', type: 'income', amount: 3200.00, date: '2023-10-01', description: 'Salary', category: 'Income' },
  { id: '2', type: 'expense', amount: 45.00, date: '2023-10-02', description: 'Coffee Shop', category: 'Food' },
  { id: '3', type: 'expense', amount: 120.50, date: '2023-10-03', description: 'Grocery Store', category: 'Food' },
  { id: '4', type: 'transfer', amount: 500.00, date: '2023-10-05', description: 'Transfer to Savings', category: 'Transfer' },
  { id: '5', type: 'expense', amount: 60.00, date: '2023-10-08', description: 'Internet Bill', category: 'Utilities' },
  { id: '6', type: 'expense', amount: 85.00, date: '2023-10-10', description: 'Restaurant', category: 'Food' },
  { id: '7', type: 'income', amount: 150.00, date: '2023-10-12', description: 'Freelance Work', category: 'Income' },
];

export const getMockChartData = (): ChartData[] => [
  { name: 'Jan', income: 4000, expense: 2400, balance: 1600 },
  { name: 'Feb', income: 3000, expense: 1398, balance: 3202 },
  { name: 'Mar', income: 2000, expense: 9800, balance: -4598 },
  { name: 'Apr', income: 2780, expense: 3908, balance: -5726 },
  { name: 'May', income: 1890, expense: 4800, balance: -8636 },
  { name: 'Jun', income: 2390, expense: 3800, balance: -10046 },
  { name: 'Jul', income: 3490, expense: 4300, balance: -10856 },
];

export const getMockBalanceHistory = (): { name: string; balance: number }[] => [
  { name: 'Oct 1', balance: 10000 },
  { name: 'Oct 5', balance: 13000 },
  { name: 'Oct 10', balance: 12500 },
  { name: 'Oct 15', balance: 12800 },
  { name: 'Oct 20', balance: 11000 },
  { name: 'Oct 25', balance: 11500 },
  { name: 'Oct 30', balance: 12450.75 },
];
