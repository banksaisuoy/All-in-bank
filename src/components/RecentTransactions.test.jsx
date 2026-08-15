import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { RecentTransactions } from './RecentTransactions';
import * as transactionService from '../services/transactionService';

// Mock the CSS file import
vi.mock('./RecentTransactions.css', () => ({}), { virtual: true });

describe('RecentTransactions', () => {
  it('renders transactions correctly', async () => {
    vi.spyOn(transactionService, 'getRecentTransactions').mockResolvedValue([
      { id: '1', date: '2023-10-27', description: 'Groceries', amount: 50.00, type: 'debit', balanceAfter: 950.00 },
      { id: '2', date: '2023-10-26', description: 'Salary', amount: 3000.00, type: 'credit', balanceAfter: 1000.00 }
    ]);

    render(<RecentTransactions />);

    await waitFor(() => {
      expect(screen.getByText('+$3000.00')).toBeInTheDocument();
    });

    // Verify row count (2 data rows + 1 header row)
    const rows = screen.getAllByRole('row');