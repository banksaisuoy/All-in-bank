"use client";

import dynamic from 'next/dynamic';
import { ChartData } from '@/types';
import { motion } from 'framer-motion';

const DynamicSpendingChart = dynamic(
  () => import('./SpendingChart'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] flex items-center justify-center bg-slate-50 rounded-xl animate-pulse">
        <div className="text-slate-400 font-medium">Loading chart data...</div>
      </div>
    )
  }
);

interface ChartWrapperProps {
  data: ChartData[];
}

export function ChartWrapper({ data }: ChartWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full flex flex-col"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800">Cash Flow</h3>
        <p className="text-sm text-slate-500">Income vs Expenses over time</p>
      </div>
      <div className="flex-1 min-h-[300px]">
        <DynamicSpendingChart data={data} />
      </div>
    </motion.div>
  );
}
