import React, { useState, useEffect } from 'react';
import { getRecentTransactions } from '../services/transactionService';
import './RecentTransactions.css';
import { cn } from '../lib/utils';

export const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchTransactions = async () => {
      try {
        const data = await getRecentTransactions();
        if (isMounted) {
          setTransactions(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTransactions();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="recent-transactions-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="recent-transactions-container">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
      <div className="table-responsive">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>{tx.description}</td>
                <td
                  className={cn(
                    'amount-cell',
                    tx.type === 'credit' ? 'credit' : 'debit'
                  )}
                >
                  {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                </td>
                <td>${tx.balanceAfter.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
