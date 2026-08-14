import { mockTransactions } from '../lib/mockData';

export const getRecentTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTransactions.slice(0, 5));
    }, 500); // simulate network delay
  });
};