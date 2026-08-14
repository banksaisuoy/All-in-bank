import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dashboard } from './Dashboard';
import { SpendingChart } from './SpendingChart';

import App from '../App';

// Mock Recharts per instructions
vi.mock('recharts', async () => {
  const OriginalRecharts = await vi.importActual('recharts');
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }) => <div data-testid="mock-responsive-container">{children}</div>,
    AreaChart: ({ children }) => <svg data-testid="mock-area-chart">{children}</svg>,
    Area: () => <g data-testid="mock-area" />,
    XAxis: () => <g data-testid="mock-xaxis" />,
    YAxis: () => <g data-testid="mock-yaxis" />,
    CartesianGrid: () => <g data-testid="mock-cartesian-grid" />,
    Tooltip: () => <g data-testid="mock-tooltip" />
  };
});

// Mock Framer Motion per instructions
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }) => <div className={className} data-testid="motion-div">{children}</div>,
  },
}));


describe('Dashboard Component', () => {
  it('renders correctly', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Total Balance')).toBeInTheDocument();
    expect(screen.getByText('Total Income')).toBeInTheDocument();
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
  });

  it('changes filter to 7 Days and 30 Days and updates class', () => {
    render(<Dashboard />);
    const btn7Days = screen.getByText('7 Days');
    const btn30Days = screen.getByText('30 Days');
    const btnAll = screen.getByText('All Time');

    // Initially 30Days is selected
    expect(btn30Days).toHaveClass('bg-indigo-50');

    // Click 7 days
    fireEvent.click(btn7Days);
    expect(btn7Days).toHaveClass('bg-indigo-50');
    expect(btn30Days).not.toHaveClass('bg-indigo-50');

    // Click All Time
    fireEvent.click(btnAll);
    expect(btnAll).toHaveClass('bg-indigo-50');
  });

  it('renders metric values safely without errors', () => {
    render(<Dashboard />);
    // Check if total balance renders a value
    expect(screen.getAllByText(/\$/)[0]).toBeInTheDocument();
  });

  it('renders category breakdown correctly', () => {
     render(<Dashboard />);
     expect(screen.getByText('food')).toBeInTheDocument();
     expect(screen.getByText('transport')).toBeInTheDocument();
  });
});

describe('SpendingChart Component', () => {
  it('renders properly with data', () => {
     render(<SpendingChart data={[{ date: 'Oct 1', value: 100 }]} />);
     expect(screen.getByTestId('mock-area-chart')).toBeInTheDocument();
  });
  it('renders properly without data', () => {
     render(<SpendingChart data={[]} />);
     expect(screen.getByText('No trend data available.')).toBeInTheDocument();
  });
});

describe('App Routing', () => {
  it('renders App with routing', () => {
     render(<App />);
     expect(screen.getByText('Welcome to All-in-bank')).toBeInTheDocument();
  });
});