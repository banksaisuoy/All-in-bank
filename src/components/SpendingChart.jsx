import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const SpendingChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="flex h-full items-center justify-center text-gray-500">No trend data available.</div>;
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
          tickFormatter={(value) => `$${value}`}
          dx={-10}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
          itemStyle={{ color: '#111827', fontWeight: 600 }}
          formatter={(value) => [`$${value}`, 'Amount']}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#4F46E5"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorValue)"
        />
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
};