import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';

import { userAccounts, recentTransactions } from '@/lib/mockData';

// We need to match the way numbers are formatted in the component
// However, Node's toLocaleString might default to en-US formatting depending on environment
// React component uses `.toLocaleString('en-US', ...)`
const formatCurrency = (val: number) =>
  '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

describe('Home page', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders the Total Balance correctly', () => {
    render(<Home />);
    const totalBalance = userAccounts.reduce((acc, account) => acc + account.balance, 0);
    const expectedBalanceString = formatCurrency(totalBalance);
    expect(screen.getByText('Total Balance')).toBeInTheDocument();
    expect(screen.getByText(expectedBalanceString)).toBeInTheDocument();
  });

  it('renders all user accounts', () => {
    render(<Home />);
    userAccounts.forEach(account => {
      expect(screen.getByText(account.name)).toBeInTheDocument();
      const expectedBalance = formatCurrency(account.balance);
      // Because there might be multiple places with similar text,
      // we check if it is somewhere in the document.
      expect(screen.getByText(expectedBalance)).toBeInTheDocument();
      expect(screen.getByText(`${account.type} Account`)).toBeInTheDocument();
    });
  });

  it('renders recent transactions correctly', () => {
    render(<Home />);
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();

    recentTransactions.forEach(tx => {
      expect(screen.getByText(tx.description)).toBeInTheDocument();

      const isPositive = tx.amount > 0;
      const formattedAmount = tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      // The component renders something like: {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString(...)}
      const expectedAmountText = (isPositive ? '+' : '') + formattedAmount;
      expect(screen.getByText(expectedAmountText)).toBeInTheDocument();
    });
  });
});
