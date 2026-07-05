import { render, screen } from '@testing-library/react';
import AccountsPage from '../page';
import { vi } from 'vitest';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

// Temporarily modify mock data for test to cover the 'default' case
vi.mock('@/lib/mockData', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/lib/mockData')>();
  return {
    ...mod,
    mockDashboardData: {
      ...mod.mockDashboardData,
      accounts: [
        ...mod.mockDashboardData.accounts,
        {
          id: 'test-default-id',
          name: 'Test Default Account',
          type: 'UnknownType' as any, // This should trigger the default case, using any for negative testing
          balance: 100,
          currency: 'USD',
          accountNumber: '****9999',
        }
      ]
    }
  }
});


describe('AccountsPage', () => {
  it('renders the header correctly', () => {
    render(<AccountsPage />);
    expect(screen.getByText('Accounts')).toBeInTheDocument();
    expect(screen.getByText('Manage your bank accounts and investments.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Account/i })).toBeInTheDocument();
  });

  it('renders account data from mockData correctly', () => {
    render(<AccountsPage />);

    // Check for some mock data
    expect(screen.getByText('Main Checking')).toBeInTheDocument();
    expect(screen.getAllByText('Savings')[0]).toBeInTheDocument();
    expect(screen.getByText('Investment Portfolio')).toBeInTheDocument();

    // Check the injected mock data to hit the default switch cases
    expect(screen.getByText('Test Default Account')).toBeInTheDocument();

    // Check for account numbers
    expect(screen.getByText('****1234')).toBeInTheDocument();
    expect(screen.getByText('****5678')).toBeInTheDocument();
  });
});
