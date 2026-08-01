import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export const StatCard = ({ icon: Icon, label, value, subtitle, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col"
    >
      <div className="flex items-center gap-4">
        <div className={clsx('p-3 rounded-lg', color)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
      </div>
      {subtitle && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      )}
    </motion.div>
  );
};