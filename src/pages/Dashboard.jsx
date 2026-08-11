import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { StatCard } from '../components/StatCard';
import { RecentTransactionsTable } from '../components/RecentTransactionsTable';
import { Wallet, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { useSpendingData } from '../hooks/useSpendingData';

export const Dashboard = () => {
  const { metrics, data } = useSpendingData('30days');
  const totalBalance = metrics?.balance || 0;
  const totalIncome = metrics?.income || 0;
  const recentTransactions = data?.recent || [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
            <Link 
              to="/transfer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              New Transfer
            </Link>
          </div>

      </main>
    </div>
  );
};