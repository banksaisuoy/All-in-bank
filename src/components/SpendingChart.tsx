"use client";

import React, { useCallback } from "react";
import { ChartData } from "@/types";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SpendingChartProps {
  data: ChartData[];
}

const SpendingChart = React.memo(function SpendingChart({ data }: SpendingChartProps) {
  const formatCurrency = useCallback((value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  }, []);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickFormatter={(value) => formatCurrency(value as number)}
            dx={-10}
          />
          <Tooltip
            formatter={(value: any) => formatCurrency(value as number)}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorIncome)"
            name="Income"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorExpense)"
            name="Expenses"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

export default SpendingChart;
