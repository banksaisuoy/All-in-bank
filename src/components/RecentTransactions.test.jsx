import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RecentTransactions } from './RecentTransactions';

describe('RecentTransactions', () => {
  it('renders "No recent transactions found" when transactions array is empty', () => {
    render(<RecentTransactions transactions={[]} />);
    expect(screen.getByText('No recent transactions found.')).toBeInTheDocument();
  });

  it('renders "No recent transactions found" when transactions prop is undefined', () => {
    render(<RecentTransactions />);
    expect(screen.getByText('No recent transactions found.')).toBeInTheDocument();
  });

  it('renders transactions correctly', () => {
    // Setup mock data
    const mockData = [
      {
        id: 1,
        date: '2024-05-01T10:00:00Z',
        description: 'Grocery Store',
        amount: -150.25,
        category: 'food',
      },
      {
        id: 2,
        date: '2024-05-02T14:30:00Z',
        description: 'Salary Deposit',
        amount: 3000.00,
        category: 'income',
      },
    ];

    render(<RecentTransactions transactions={mockData} />);

    // Check table headers
    expect(screen.getByText('Transaction')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();

    // Check data rendering
    expect(screen.getByText('Grocery Store')).toBeInTheDocument();
    expect(screen.getByText('food')).toBeInTheDocument();
    
    expect(screen.getByText('Salary Deposit')).toBeInTheDocument();
    expect(screen.getByText('income')).toBeInTheDocument();

    // Verify row count (2 data rows + 1 header row)
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
  });
});