'use client';

import { OverviewData } from '@/lib/mockData';
import { DollarSign, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OverviewCards({ data }: { data: OverviewData }) {
  const cards = [
    {
      title: 'Total Balance',
      amount: data.totalBalance,
      icon: DollarSign,
      color: 'bg-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+2.5%',
    },
    {
      title: 'Total Income',
      amount: data.income,
      icon: ArrowUpRight,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      trend: '+12.5%',
    },
    {
      title: 'Total Expenses',
      amount: data.expenses,
      icon: ArrowDownRight,
      color: 'bg-red-500',
      textColor: 'text-red-500',
      bgColor: 'bg-red-50',
      trend: '-1.2%',
    },
    {
      title: 'Total Savings',
      amount: data.savings,
      icon: Wallet,
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
      trend: '+8.4%',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {cards.map((card, index) => (
        <motion.div key={index} variants={item} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bgColor} ${card.textColor}`}>
              <card.icon size={24} strokeWidth={2.5} />
            </div>
            <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${card.trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
              {card.trend}
            </span>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{card.title}</p>
            <h3 className="text-2xl font-bold text-gray-900">
              ${card.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h3>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
