"use client";

import React, { useMemo } from "react";
import { mockDashboardData } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Building2, Landmark, Wallet, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const getAccountIcon = (type: string) => {
  switch (type) {
    case 'Checking': return <Wallet className="w-6 h-6 text-blue-500" />;
    case 'Savings': return <Landmark className="w-6 h-6 text-green-500" />;
    case 'Investment': return <Building2 className="w-6 h-6 text-purple-500" />;
    default: return <Wallet className="w-6 h-6 text-slate-500" />;
  }
};

const getAccountColor = (type: string) => {
  switch (type) {
    case 'Checking': return 'bg-blue-100';
    case 'Savings': return 'bg-green-100';
    case 'Investment': return 'bg-purple-100';
    default: return 'bg-slate-100';
  }
};

export default function AccountsPage() {
  const { accounts } = mockDashboardData;

  const formattedTotal = useMemo(() => {
    const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);
    return totalBalance.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }, [accounts]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Accounts</h1>
          <p className="text-slate-500">Manage your bank accounts and investments.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Account
        </button>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-2"
      >
        <span className="text-slate-500 font-medium">Total Net Worth</span>
        <span className="text-4xl font-bold text-slate-800">{formattedTotal}</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account, i) => {
          const formattedBalance = account.balance.toLocaleString('en-US', {
            style: 'currency',
            currency: account.currency,
          });

          return (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6"
            >
              <div className="flex justify-between items-start">
                <div className={cn("p-3 rounded-xl", getAccountColor(account.type))}>
                  {getAccountIcon(account.type)}
                </div>
                <span className="text-slate-500 text-sm font-medium">{account.accountNumber}</span>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 text-lg">{account.name}</h3>
                <p className="text-slate-500 text-sm">{account.type}</p>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-slate-500">Balance</span>
                <span className="font-bold text-slate-800 text-xl">{formattedBalance}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
