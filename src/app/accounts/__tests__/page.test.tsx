import { render, screen } from '@testing-library/react';
import AccountsPage from '../page';

// Mock matchMedia for Recharts responsive container (though not strictly needed here, good for consistency)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver for Recharts
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;


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

    // Check for account numbers
    expect(screen.getByText('****1234')).toBeInTheDocument();
    expect(screen.getByText('****5678')).toBeInTheDocument();
  });
});
