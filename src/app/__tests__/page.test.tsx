import { render, screen } from '@testing-library/react';
import Home from '../page';
import { vi } from 'vitest';

// Mock components to simplify page testing
vi.mock('@/components/BalanceCard', () => ({
  BalanceCard: () => <div data-testid="balance-card">BalanceCard</div>,
}));

vi.mock('@/components/TransactionList', () => ({
  TransactionList: () => <div data-testid="transaction-list">TransactionList</div>,
}));

vi.mock('@/components/ChartWrapper', () => ({
  ChartWrapper: () => <div data-testid="chart-wrapper">ChartWrapper</div>,
}));

describe('Home Page', () => {
  it('renders the header correctly', () => {
    render(<Home />);

    // Check greeting (Alice is from mockData)
    expect(screen.getByText(/Good morning, Alice!/i)).toBeInTheDocument();

    // Check search input
    expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
  });

  it('renders main components', () => {
    render(<Home />);

    expect(screen.getByTestId('balance-card')).toBeInTheDocument();
    expect(screen.getByTestId('chart-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('transaction-list')).toBeInTheDocument();
  });
});
