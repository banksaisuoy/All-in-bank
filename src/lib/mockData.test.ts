import { describe, it, expect } from 'vitest';
import { userAccounts, recentTransactions, cashFlowData } from './mockData';

describe('mockData', () => {
  it('userAccounts contains required fields', () => {
    expect(userAccounts.length).toBeGreaterThan(0);
    userAccounts.forEach(account => {
      expect(account).toHaveProperty('id');
      expect(account).toHaveProperty('name');
      expect(account).toHaveProperty('balance');
      expect(account).toHaveProperty('type');
    });
  });

  it('recentTransactions contains required fields', () => {
    expect(recentTransactions.length).toBeGreaterThan(0);
    recentTransactions.forEach(tx => {
      expect(tx).toHaveProperty('id');
      expect(tx).toHaveProperty('date');
      expect(tx).toHaveProperty('description');
      expect(tx).toHaveProperty('amount');
      expect(tx).toHaveProperty('status');
    });
  });

  it('cashFlowData contains required fields', () => {
    expect(cashFlowData.length).toBeGreaterThan(0);
    cashFlowData.forEach(data => {
      expect(data).toHaveProperty('name');
      expect(data).toHaveProperty('income');
      expect(data).toHaveProperty('expenses');
    });
  });
});
