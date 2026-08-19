import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dashboard } from './Dashboard';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../hooks/useSpendingData', () => ({
  useSpendingData: () => ({
    metrics: { balance: 1000, income: 1500, expenses: 500 },
    data: { trendData: [], categoryData: [] },
    spendingByCategory: [],
    recentTransactions: [],
  })
}));

describe('Dashboard Component', () => {
  it('renders dashboard with total balance', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(screen.getByText('Total Balance')).toBeInTheDocument();
  });
});