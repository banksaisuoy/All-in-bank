import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Car, Coffee, Film, CircleDollarSign, HelpCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../lib/utils';

const categoryConfig = {
  food: { icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-50' },
  transport: { icon: Car, color: 'text-blue-500', bg: 'bg-blue-50' },
  entertainment: { icon: Film, color: 'text-purple-500', bg: 'bg-purple-50' },
  shopping: { icon: ShoppingBag, color: 'text-pink-500', bg: 'bg-pink-50' },
  income: { icon: CircleDollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  other: { icon: HelpCircle, color: 'text-gray-500', bg: 'bg-gray-50' },
};

export const RecentTransactions = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center text-gray-500 h-48">
        No recent transactions found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-hidden">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase text-gray-500 bg-gray-50/50">
              <th className="px-4 py-3 font-medium rounded-tl-lg">Transaction</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium text-right rounded-tr-lg">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.slice(0, 10).map((tx, idx) => {
              const config = categoryConfig[tx.category] || categoryConfig.other;
              const Icon = config.icon;
              const isIncome = tx.category === 'income';

              return (
                <motion.tr 
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg", config.bg, config.color)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {tx.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {isIncome ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={cn(
                        "font-semibold",
                        isIncome ? "text-emerald-600" : "text-gray-900"
                      )}>
                        {isIncome ? '+' : ''}{Math.abs(tx.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};