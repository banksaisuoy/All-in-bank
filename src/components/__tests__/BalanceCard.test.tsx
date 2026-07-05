import { render, screen } from '@testing-library/react';
import { BalanceCard } from '../BalanceCard';

const mockBalance = {
  total: 5000.50,
  available: 4500.00,
  currency: 'USD',
};

describe('BalanceCard', () => {
  it('renders total balance correctly formatted', () => {
    render(<BalanceCard balance={mockBalance} />);

    // We expect the text to contain the formatted amount
    expect(screen.getByText('$5,000.50')).toBeInTheDocument();
  });

  it('renders available balance correctly formatted', () => {
    render(<BalanceCard balance={mockBalance} />);

    expect(screen.getByText('$4,500.00')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<BalanceCard balance={mockBalance} />);

    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /receive/i })).toBeInTheDocument();
  });
});
