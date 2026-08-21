import '../../vitest.setup.js';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dashboard } from './Dashboard';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../hooks/useSpendingData', () => ({
  useSpendingData: () => ({
    metrics: { balance: 5000, income: 2000, expenses: 1000 },
    data: { trendData: [], categoryData: [] },
    spendingByCategory: [],
    recentTransactions: [],
    isLoading: false
  })
}));

describe('Dashboard Component', () => {
  it('renders Dashboard successfully', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });
});