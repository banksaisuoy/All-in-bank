'use client';

import { Transaction } from '@/lib/mockData';
import { ArrowDownRight, ArrowUpRight, ArrowRightLeft, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  const getIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'income': return <ArrowUpRight className="text-emerald-500" size={20} />;
      case 'expense': return <ArrowDownRight className="text-red-500" size={20} />;
      case 'transfer': return <ArrowRightLeft className="text-blue-500" size={20} />;
    }
  };

  const getBgColor = (type: Transaction['type']) => {
    switch (type) {
      case 'income': return 'bg-emerald-50';
      case 'expense': return 'bg-red-50';
      case 'transfer': return 'bg-blue-50';
    }
  };

  const getAmountColor = (type: Transaction['type']) => {
    switch (type) {
      case 'income': return 'text-emerald-600';
      case 'expense': return 'text-gray-900';
      case 'transfer': return 'text-gray-900';
    }
  };

  const formatAmount = (type: Transaction['type'], amount: number) => {
    const formatted = amount.toLocaleString('en-US', { minimumFractionDigits: 2 });
    return type === 'income' ? `+ $${formatted}` : `- $${formatted}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
      </div>

      <div className="divide-y divide-gray-100">
        {transactions.map((tx) => (
          <div key={tx.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getBgColor(tx.type)}`}>
                {getIcon(tx.type)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{tx.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{tx.date}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-xs text-gray-500">{tx.category}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`font-semibold ${getAmountColor(tx.type)}`}>
                {formatAmount(tx.type, tx.amount)}
              </span>
              <button className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-gray-700 transition-all">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
