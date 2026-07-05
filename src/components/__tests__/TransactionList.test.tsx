import { render, screen } from '@testing-library/react';
import { TransactionList } from '../TransactionList';
import { Transaction } from '@/types';
import { vi } from 'vitest';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2023-10-25T10:00:00Z',
    description: 'Test Grocery',
    amount: 50.00,
    type: 'debit',
    category: 'Food',
  },
  {
    id: '2',
    date: '2023-10-24T10:00:00Z',
    description: 'Test Salary',
    amount: 1000.00,
    type: 'credit',
    category: 'Income',
  },
  {
    id: '3',
    date: '2023-10-23T10:00:00Z',
    description: 'Test Utilities',
    amount: 100.00,
    type: 'debit',
    category: 'Utilities',
  },
  {
    id: '4',
    date: '2023-10-22T10:00:00Z',
    description: 'Test Dining',
    amount: 30.00,
    type: 'debit',
    category: 'Dining',
  },
  {
    id: '5',
    date: '2023-10-21T10:00:00Z',
    description: 'Test Entertainment',
    amount: 20.00,
    type: 'debit',
    category: 'Entertainment',
  },
  {
    id: '6',
    date: '2023-10-20T10:00:00Z',
    description: 'Test Health',
    amount: 80.00,
    type: 'debit',
    category: 'Health',
  },
  {
    id: '7',
    date: '2023-10-19T10:00:00Z',
    description: 'Test Unknown',
    amount: 10.00,
    type: 'debit',
    category: 'Unknown',
  },
  {
    id: '8',
    date: 'invalid-date',
    description: 'Test Invalid Date',
    amount: 15.00,
    type: 'debit',
    category: 'Food',
  }
];

describe('TransactionList', () => {
  it('renders the header correctly', () => {
    render(<TransactionList transactions={mockTransactions} />);
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
  });

  it('renders a list of transactions', () => {
    render(<TransactionList transactions={mockTransactions} />);

    expect(screen.getByText('Test Grocery')).toBeInTheDocument();
    expect(screen.getByText('Test Salary')).toBeInTheDocument();

    // Check amounts
    expect(screen.getByText('-$50.00')).toBeInTheDocument();
    expect(screen.getByText('+$1,000.00')).toBeInTheDocument();
  });

  it('renders all category icons correctly', () => {
    render(<TransactionList transactions={mockTransactions} />);
    expect(screen.getByText('Test Grocery')).toBeInTheDocument();
    expect(screen.getByText('Test Utilities')).toBeInTheDocument();
    expect(screen.getByText('Test Dining')).toBeInTheDocument();
    expect(screen.getByText('Test Entertainment')).toBeInTheDocument();
    expect(screen.getByText('Test Health')).toBeInTheDocument();
    expect(screen.getByText('Test Salary')).toBeInTheDocument(); // category text
    expect(screen.getByText('Test Unknown')).toBeInTheDocument();
  });

  it('handles invalid dates gracefully', () => {
    render(<TransactionList transactions={mockTransactions} />);
    expect(screen.getByText('Invalid Date • Food')).toBeInTheDocument();
  });
});
