import React from 'react';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';
import { StatCard } from '../components/StatCard';
import { RecentTransactionsTable } from '../components/RecentTransactionsTable';
import { accounts, transactions } from '../data/mockData';
import { Wallet, TrendingUp, TrendingDown, Clock, User } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';

export const Dashboard = () => {
  const { isLoading } = useProfile();
  
  // Calculate stats from mock data
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalIncome = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);

  const recentTransactions = transactions.slice(0, 5);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-xl text-gray-600 flex items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            Loading dashboard...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
          
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
            <Link 
              to="/profile" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <User className="h-4 w-4 mr-2" />
              View Profile
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">