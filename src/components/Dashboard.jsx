import React, { useState } from 'react';
import { useSpendingData } from '../hooks/useSpendingData';
import { SpendingChart } from './SpendingChart';
import { CreditCard, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export const Dashboard = () => {
  const [filter, setFilter] = useState('30days'); // '7days', '30days', 'all'
  const { data, metrics } = useSpendingData(filter);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Overview of your personal spending</p>
          </div>

          <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
            <button
              onClick={() => setFilter('7days')}
              className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors", filter === '7days' ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50")}
            >
              7 Days
            </button>
            <button
              onClick={() => setFilter('30days')}
              className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors", filter === '30days' ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50")}
            >
              30 Days
            </button>
            <button
              onClick={() => setFilter('all')}
              className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors", filter === 'all' ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50")}
            >
              All Time
            </button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Balance"
            value={metrics.balance}
            icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
            trend={"+2.5%"}
            positive={true}
          />
          <MetricCard
            title="Total Income"
            value={metrics.income}
            icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
            trend={"+5.2%"}
            positive={true}
          />
          <MetricCard
            title="Total Expenses"
            value={Math.abs(metrics.expenses)}
            icon={<TrendingDown className="w-5 h-5 text-rose-600" />}
            trend={"-1.2%"}
            positive={false}
          />
          <MetricCard
            title="Active Cards"
            value={2}
            icon={<CreditCard className="w-5 h-5 text-slate-600" />}
            isNumber={true}
          />
        </div>

        {/* Charts & Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Monthly Spending Trend</h2>
            <div className="h-[300px] w-full">
               <SpendingChart data={data.trendData} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
             <h2 className="text-lg font-semibold mb-4 text-gray-800">Spending by Category</h2>
             <div className="flex-1 overflow-auto">
               <div className="space-y-4 mt-2">
                 {data.categoryData.map((cat, idx) => (
                   <div key={idx} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className={cn("w-3 h-3 rounded-full", cat.color)}></div>
                       <span className="text-sm font-medium text-gray-700 capitalize">{cat.name}</span>
                     </div>
                     <span className="text-sm font-semibold text-gray-900">${cat.value.toLocaleString('en-US')}</span>
                   </div>
                 ))}
                 {data.categoryData.length === 0 && (
                   <p className="text-sm text-gray-500 text-center py-4">No expense data for this period.</p>
                 )}
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, trend, positive, isNumber }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="p-2 bg-gray-50 rounded-md">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-gray-900">
          {!isNumber && '$'}{isNumber ? value : value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h3>
        {trend && (
           <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", positive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")}>
             {trend}
           </span>
        )}
      </div>
    </motion.div>
  );
};
