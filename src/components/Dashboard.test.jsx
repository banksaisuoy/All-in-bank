}));



vi.mock('../hooks/useSpendingData', () => ({
  useSpendingData: (filter) => {
    const data = {
      trendData: [{ date: 'Oct 1', value: 100 }],
      categoryData: [
        { name: 'food', value: 50, color: 'bg-orange-500' },
        { name: 'transport', value: 30, color: 'bg-blue-500' }
      ]
    };
    const metrics = {
      balance: 1000,
      income: 1500,
      expenses: -500
    };
    return { data, metrics, spendingByCategory: data.categoryData, recentTransactions: [], isLoading: false };
  }
}));

describe('Dashboard Component', () => {
  it('renders correctly', () => {
    render(<Dashboard />);