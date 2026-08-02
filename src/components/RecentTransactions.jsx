import React from 'react';
import { cn } from '../lib/utils';

export const RecentTransactions = ({ transactions }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">Date</th>
              <th scope="col" className="px-6 py-3 font-medium">Description</th>
              <th scope="col" className="px-6 py-3 font-medium">Category</th>
              <th scope="col" className="px-6 py-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No recent transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="bg-white border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {tx.description}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {tx.category}
                    </span>
                  </td>
                  <td className={cn(
                    "px-6 py-4 text-right font-medium whitespace-nowrap",
                    tx.amount > 0 ? "text-emerald-600" : "text-gray-900"
                  )}>
                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};