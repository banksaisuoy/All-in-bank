import React from 'react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

export const RecentTransactionsTable = ({ transactions }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Transactions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link to={`/transactions/${tx.id}`} className="block h-full w-full">
                    {new Date(tx.date).toLocaleDateString()}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link to={`/transactions/${tx.id}`} className="block h-full w-full">
                    {tx.description}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link to={`/transactions/${tx.id}`} className="block h-full w-full">
                    {tx.category}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                  <Link to={`/transactions/${tx.id}`} className={clsx('block h-full w-full', tx.type === 'credit' ? 'text-green-600' : 'text-red-600')}>
                    {tx.type === 'credit' ? '+' : '-'}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(tx.amount))}
                  </Link>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  No recent transactions.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};