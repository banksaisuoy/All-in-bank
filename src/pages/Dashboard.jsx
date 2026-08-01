import React from 'react';
import { Navbar } from '../components/Navbar';
import { StatCard } from '../components/StatCard';
import { RecentTransactionsTable } from '../components/RecentTransactionsTable';
import { accounts, transactions } from '../data/mockData';
import { Wallet, TrendingUp, TrendingDown, Clock } from 'lucide-react';

export const Dashboard = () => {
  // Calculate stats from mock data
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalIncome = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const pendingAmount = 450.00; // Mock pending amount

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon={Wallet} 
              label="Total Balance" 
              value={formatCurrency(totalBalance)} 
              color="bg-indigo-600"
              delay={0.1}
            />
            <StatCard 
              icon={TrendingUp} 
              label="Total Income" 
              value={formatCurrency(totalIncome)} 
              color="bg-emerald-500"
              delay={0.2}
            />
            <StatCard 
              icon={TrendingDown} 
              label="Total Expenses" 
              value={formatCurrency(totalExpenses)} 
              color="bg-rose-500"
              delay={0.3}
            />
            <StatCard 
              icon={Clock} 
              label="Pending Transactions" 
              value={formatCurrency(pendingAmount)} 
              color="bg-amber-500"
              delay={0.4}
            />
          </div>

          <div className="mt-8">
            <RecentTransactionsTable transactions={recentTransactions} />
          </div>

        </div>
      </main>
    </div>
  );
};
