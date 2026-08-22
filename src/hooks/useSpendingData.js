import { useMemo } from 'react';
import { mockTransactions } from '../lib/mockData';

export const useSpendingData = (filter) => {
  const { data, metrics } = useMemo(() => {
    let expenses = 0;

    filteredTransactions.forEach(t => {
      if (t.category === 'income') {
        income += t.amount;
      } else {
        expenses += t.amount;
      }
    });

    const calculatedMetrics = {
      balance: income + expenses,
      income,
      expenses
    };

    const trendMap = new Map();
    filteredTransactions.filter(t => t.category !== 'income').forEach(t => {
        const dateObj = new Date(t.date);
        if (isNaN(dateObj.getTime())) return;
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const trendData = Array.from(trendMap, ([date, value]) => ({ date, value })).sort((a,b) => new Date(a.date) - new Date(b.date));

    const categoryColors = {
      food: 'bg-orange-500',
      transport: 'bg-blue-500',
      entertainment: 'bg-purple-500',
      shopping: 'bg-pink-500',
      other: 'bg-gray-500'
    };

    const catMap = new Map();
    filteredTransactions.filter(t => t.category !== 'income').forEach(t => {
      const current = catMap.get(t.category) || 0;
      catMap.set(t.category, current + Math.abs(t.amount));
    });
    const categoryData = Array.from(catMap, ([name, value]) => ({
      name,
      value,
      color: categoryColors[name] || categoryColors.other
    })).sort((a, b) => b.value - a.value);

    return {
