import { useMemo } from 'react';
import { transactions, accounts } from '../data/mockData';

export const useSpendingData = (filter) => { 
  return useMemo(() => {
    // Determine cutoff date based on filter
    const now = new Date();
    let cutoffDate = new Date(0);
    if (filter === '7days') {
      cutoffDate = new Date(now.setDate(now.getDate() - 7));
    } else if (filter === '30days') {
      cutoffDate = new Date(now.setDate(now.getDate() - 30));
    }

    // Filter transactions
    const filteredTx = transactions.filter(tx => new Date(tx.date) >= cutoffDate);

    // Calculate metrics
    const income = filteredTx.filter(tx => tx.type === 'credit').reduce((acc, tx) => acc + tx.amount, 0);
    const expenses = filteredTx.filter(tx => tx.type === 'debit').reduce((acc, tx) => acc + Math.abs(tx.amount), 0);
    
    // Balance is sum of accounts
    const balance = accounts.reduce((acc, account) => acc + account.balance, 0);

    // Group expenses by category
    const categoryMap = {};
    const colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
    let colorIdx = 0;

    filteredTx.forEach(tx => {
      if (tx.type === 'debit') {
        if (!categoryMap[tx.category]) {
          categoryMap[tx.category] = { name: tx.category, value: 0, color: colors[colorIdx % colors.length] };
          colorIdx++;
        }
        categoryMap[tx.category].value += Math.abs(tx.amount);
      }
    });

    const categoryData = Object.values(categoryMap).sort((a, b) => b.value - a.value);

    // Group for trend chart (by day)
    const trendMap = {};
    filteredTx.forEach(tx => {
      const dateKey = new Date(tx.date).toLocaleDateString();
      if (!trendMap[dateKey]) {
        trendMap[dateKey] = { name: dateKey, income: 0, expense: 0 };
      }
      if (tx.type === 'credit') {
        trendMap[dateKey].income += tx.amount;
      } else {
        trendMap[dateKey].expense += Math.abs(tx.amount);
      }
    });
    
    const trendData = Object.values(trendMap).sort((a, b) => new Date(a.name) - new Date(b.name));

    return {
      metrics: {
        balance,
        income,
        expenses
      },
      data: {
        recent: filteredTx.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5),
        categoryData,
        trendData
      }
    };
  }, [filter]);
};