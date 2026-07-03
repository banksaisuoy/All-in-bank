import { render, screen } from '@testing-library/react';
import { TransactionList } from '../TransactionList';
import { Transaction } from '@/types';

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
});
