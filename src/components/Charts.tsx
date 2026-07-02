'use client';

import { ChartData } from '@/lib/mockData';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { motion } from 'framer-motion';

export function ActivityChart({ data }: { data: ChartData[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96 flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Activity Overview</h3>
        <select className="bg-gray-50 border-none text-sm text-gray-600 rounded-lg px-3 py-2 outline-none cursor-pointer">
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dx={-10} />
            <Tooltip
              cursor={{ fill: '#f3f4f6' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="income" name="Income" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="expense" name="Expense" fill="#f87171" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function BalanceHistoryChart({ data }: { data: { name: string, balance: number }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96 flex flex-col"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Balance History</h3>
        <p className="text-sm text-gray-500">Your account balance over time</p>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dx={-10} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorBalance)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
