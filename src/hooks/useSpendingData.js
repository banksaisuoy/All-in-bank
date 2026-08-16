import { transactions as mockTransactions } from '../data/mockData';

export const useSpendingData = (filter) => {
  const { data, metrics } = useMemo(() => {
    let filteredTransactions = [...mockTransactions];
    const now = new Date('2023-10-30'); // Mock "current" date relative to mock data

    if (filter === '7days') {
       const weekAgo = new Date(now);
       weekAgo.setDate(now.getDate() - 7);
       filteredTransactions = mockTransactions.filter(t => new Date(t.date) >= weekAgo);
    } else if (filter === '30days') {
       const monthAgo = new Date(now);
       monthAgo.setDate(now.getDate() - 30);
       filteredTransactions = mockTransactions.filter(t => new Date(t.date) >= monthAgo);
    }

    let income = 0;
    let expenses = 0;

    filteredTransactions.forEach(t => {
      if (t.type === 'credit') {
        income += t.amount;
      } else {
        expenses += Math.abs(t.amount);
      }
    });

    const calculatedMetrics = {
      balance: income - expenses,
      income,
      expenses
    };

    const trendMap = new Map();
    filteredTransactions.filter(t => t.type === 'debit').forEach(t => {
        const dateObj = new Date(t.date);
        if (isNaN(dateObj.getTime())) return;
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const currentAmount = trendMap.get(formattedDate) || 0;
        trendMap.set(formattedDate, currentAmount + Math.abs(t.amount));
    });

    const trendData = Array.from(trendMap, ([date, value]) => ({ date, value })).sort((a,b) => new Date(a.date) - new Date(b.date));

    const categoryColors = {
      Food: 'bg-orange-500',
      Transport: 'bg-blue-500',
      Entertainment: 'bg-purple-500',
      Shopping: 'bg-pink-500',
      Utilities: 'bg-yellow-500',
      Health: 'bg-green-500',
      Other: 'bg-gray-500'
    };

    const catMap = new Map();
    filteredTransactions.filter(t => t.type === 'debit').forEach(t => {
      const current = catMap.get(t.category) || 0;
      catMap.set(t.category, current + Math.abs(t.amount));
    });

    const categoryData = Array.from(catMap, ([name, value]) => ({
      name,
      value,
      color: categoryColors[name] || categoryColors.Other
    })).sort((a, b) => b.value - a.value);

    return {
      data: { trendData, categoryData },
      metrics: calculatedMetrics
    };
  }, [filter]);

  return { data, metrics };
};
