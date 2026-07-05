"use client";

import React, { useMemo } from "react";
import { Balance } from "@/types";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface BalanceCardProps {
  balance: Balance;
}

export const BalanceCard = React.memo(function BalanceCard({ balance }: BalanceCardProps) {
  const formattedTotal = useMemo(() => balance.total.toLocaleString('en-US', {
    style: 'currency',
    currency: balance.currency,
  }), [balance.total, balance.currency]);

  const formattedAvailable = useMemo(() => balance.available.toLocaleString('en-US', {
    style: 'currency',
    currency: balance.currency,
  }), [balance.available, balance.currency]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-slate-500 font-medium mb-1">Total Balance</p>
          <h2 className="text-3xl font-bold text-slate-800">{formattedTotal}</h2>
        </div>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          +2.5%
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors flex justify-center items-center gap-2 shadow-sm shadow-blue-200">
          <ArrowUpRight className="w-5 h-5" />
          Send
        </button>
        <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-medium transition-colors flex justify-center items-center gap-2">
          <ArrowDownRight className="w-5 h-5" />
          Receive
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
        <span className="text-slate-500">Available to spend</span>
        <span className="font-semibold text-slate-700">{formattedAvailable}</span>
      </div>
    </motion.div>
  );
});
