import { useMemo } from 'react';
import { transactions } from '../data/mockData';

export const useSpendingData = (filter) => { 
  return useMemo(() => {
    // Basic mock implementation since original was cut off
    return transactions || [];
  }, [filter]);
};