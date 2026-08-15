import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RecentTransactions } from './RecentTransactions';
import * as transactionService from '../services/transactionService';

// Mock the transaction service
vi.mock('../services/transactionService', () => ({
  getRecentTransactions: vi.fn(),
}));

describe('RecentTransactions', () => {
  it('renders loading state initially and then displays transactions', async () => {
    // Setup mock data
    const mockData = [
      {
        id: 1,
        date: '2024-05-01T10:00:00Z',
        description: 'Grocery Store',
        amount: 150.25,
        type: 'debit',
        balanceAfter: 2850.75,
      },
      {
        id: 2,
        date: '2024-05-02T14:30:00Z',
        description: 'Salary Deposit',
        amount: 3000.00,
        type: 'credit',
        balanceAfter: 5850.75,
      },
    ];

    transactionService.getRecentTransactions.mockResolvedValue(mockData);

    const { container } = render(<RecentTransactions />);
    
    // Check loading state
    expect(container.querySelector('.spinner')).toBeInTheDocument();

    // Wait for the data to load and component to update
    await waitFor(() => {
      expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    });

    // Check table headers
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Balance')).toBeInTheDocument();

    // Check data rendering
    expect(screen.getByText('Grocery Store')).toBeInTheDocument();
    expect(screen.getByText('-$150.25')).toBeInTheDocument();
    
    expect(screen.getByText('Salary Deposit')).toBeInTheDocument();
    expect(screen.getByText('+$3000.00')).toBeInTheDocument();

    // Verify row count (2 data rows + 1 header row)
    const rows = screen.getAllByRole('row');