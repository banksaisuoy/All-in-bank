import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { StatCard } from '../components/StatCard';
import { RecentTransactionsTable } from '../components/RecentTransactionsTable';
import { Wallet, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { mockTransactions } from '../lib/mockData';

export const Dashboard = () => {
  const totalBalance = 12450.80;
  const totalIncome = 4500.00;
  const recentTransactions = mockTransactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
            <Link to="/transfer" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Transfer Funds
            </Link>
          </div>

      </main>
    </div>
  );
};