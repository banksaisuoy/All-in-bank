import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dashboard } from './Dashboard';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../hooks/useSpendingData', () => ({
  useSpendingData: () => ({
    metrics: { balance: 1000, income: 500, expenses: 200 },
    data: { trendData: [], categoryData: [] },
    spendingByCategory: [],
    recentTransactions: [],
    isLoading: false
  })
}));

describe('Dashboard Component', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/Overview of your personal spending/i)).toBeInTheDocument();
  });
});