import { DashboardData } from '../types';

export const mockDashboardData: DashboardData = {
  profile: {
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=alice',
  },
  balance: {
    total: 24560.50,
    available: 24000.00,
    currency: 'USD',
  },
  transactions: [
    {
      id: 'tx-1',
      date: '2023-10-25T10:00:00Z',
      description: 'Grocery Store',
      amount: 150.75,
      type: 'debit',
      category: 'Food',
    },
    {
      id: 'tx-2',
      date: '2023-10-24T14:30:00Z',
      description: 'Salary Deposit',
      amount: 4500.00,
      type: 'credit',
      category: 'Income',
    },
    {
      id: 'tx-3',
      date: '2023-10-22T09:15:00Z',
      description: 'Electric Bill',
      amount: 85.20,
      type: 'debit',
      category: 'Utilities',
    },
    {
      id: 'tx-4',
      date: '2023-10-20T18:45:00Z',
      description: 'Restaurant Dinner',
      amount: 65.00,
      type: 'debit',
      category: 'Dining',
    },
    {
      id: 'tx-5',
      date: '2023-10-18T11:20:00Z',
      description: 'Online Subscription',
      amount: 14.99,
      type: 'debit',
      category: 'Entertainment',
    },
    {
      id: 'tx-6',
      date: '2023-10-15T08:00:00Z',
      description: 'Gym Membership',
      amount: 50.00,
      type: 'debit',
      category: 'Health',
    },
  ],
  chartData: [
    { month: 'Jan', income: 4000, expenses: 2400 },
    { month: 'Feb', income: 4200, expenses: 2600 },
    { month: 'Mar', income: 4500, expenses: 2100 },
    { month: 'Apr', income: 4100, expenses: 2800 },
    { month: 'May', income: 4800, expenses: 2300 },
    { month: 'Jun', income: 5000, expenses: 2500 },
  ],
};
