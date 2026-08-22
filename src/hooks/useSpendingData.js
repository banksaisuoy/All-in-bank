import { mockTransactions } from '../lib/mockData';

export const useSpendingData = (filter) => {
  const { data, metrics, spendingByCategory, recentTransactions } = useMemo(() => {
    let expenses = 0;
    let income = 0;

    let filteredTransactions = mockTransactions;
    
    if (filter === '7days') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        filteredTransactions = mockTransactions.filter(t => new Date(t.date) >= sevenDaysAgo);
    } else if (filter === '30days') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        filteredTransactions = mockTransactions.filter(t => new Date(t.date) >= thirtyDaysAgo);
    }

    filteredTransactions.forEach(t => {
      if (t.category === 'income') {
        const dateObj = new Date(t.date);
        if (isNaN(dateObj.getTime())) return;
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        trendMap.set(formattedDate, (trendMap.get(formattedDate) || 0) + Math.abs(t.amount));
    });
    
    const trendData = Array.from(trendMap, ([date, value]) => ({ date, value })).sort((a,b) => new Date(a.date) - new Date(b.date));

    const categoryColors = {
    })).sort((a, b) => b.value - a.value);

    return {
        data: { trendData, categoryData },
        metrics: calculatedMetrics,
        spendingByCategory: categoryData,
        recentTransactions: filteredTransactions.slice(0, 5)
    };
  }, [filter]);

  return { data, metrics, spendingByCategory, recentTransactions, isLoading: false };
};
