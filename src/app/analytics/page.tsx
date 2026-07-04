"use client";

import { mockDashboardData } from "@/lib/mockData";
import { motion } from "framer-motion";
import { ChartWrapper } from "@/components/ChartWrapper";
import dynamic from 'next/dynamic';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const DynamicCategoryChart = dynamic(
  () => Promise.resolve(({ data }: { data: any[] }) => {
    const formatCurrency = (value: number) => {
      return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      });
    };

    return (
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="amount"
              nameKey="category"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => formatCurrency(value as number)}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] flex items-center justify-center bg-slate-50 rounded-xl animate-pulse">
        <div className="text-slate-400 font-medium">Loading chart data...</div>
      </div>
    )
  }
);


export default function AnalyticsPage() {
  const { chartData, spendingByCategory } = mockDashboardData;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500">Dive deep into your spending habits.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-full">
          <ChartWrapper data={chartData} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800">Spending by Category</h3>
            <p className="text-sm text-slate-500">This month&apos;s expenses breakdown</p>
          </div>
          <div className="flex-1 min-h-[300px] flex items-center justify-center">
            <DynamicCategoryChart data={spendingByCategory} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
