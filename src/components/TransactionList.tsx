"use client";

import React, { useMemo } from "react";
import { Transaction } from "@/types";
import { motion, Variants } from "framer-motion";
import { ShoppingBag, Zap, Utensils, MonitorPlay, Dumbbell, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionListProps {
  transactions: Transaction[];
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food': return <ShoppingBag className="w-5 h-5 text-orange-500" />;
    case 'utilities': return <Zap className="w-5 h-5 text-yellow-500" />;
    case 'dining': return <Utensils className="w-5 h-5 text-red-500" />;
    case 'entertainment': return <MonitorPlay className="w-5 h-5 text-purple-500" />;
    case 'health': return <Dumbbell className="w-5 h-5 text-blue-500" />;
    case 'income': return <DollarSign className="w-5 h-5 text-green-500" />;
    default: return <DollarSign className="w-5 h-5 text-slate-500" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food': return 'bg-orange-100';
    case 'utilities': return 'bg-yellow-100';
    case 'dining': return 'bg-red-100';
    case 'entertainment': return 'bg-purple-100';
    case 'health': return 'bg-blue-100';
    case 'income': return 'bg-green-100';
    default: return 'bg-slate-100';
  }
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export const TransactionList = React.memo(function TransactionList({ transactions }: TransactionListProps) {
  const renderedTransactions = useMemo(() => {
    return transactions.map((tx) => {
      const date = new Date(tx.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const amountStr = tx.amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      return (
        <motion.div
          key={tx.id}
          variants={item}
          className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className={cn("p-3 rounded-xl", getCategoryColor(tx.category))}>
              {getCategoryIcon(tx.category)}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{tx.description}</p>
              <p className="text-sm text-slate-500">{date} • {tx.category}</p>
            </div>
          </div>
          <div className={cn(
            "font-semibold text-right",
            tx.type === 'credit' ? "text-green-600" : "text-slate-800"
          )}>
            {tx.type === 'credit' ? '+' : '-'}{amountStr}
          </div>
        </motion.div>
      );
    });
  }, [transactions]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-800">Recent Transactions</h3>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
          View All
        </button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {renderedTransactions}
      </motion.div>
    </div>
  );
});
