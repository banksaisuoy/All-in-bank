import { render, screen } from '@testing-library/react';
import SpendingChart from '../SpendingChart';
import { vi } from 'vitest';

// Mock Recharts to avoid testing charting library internals, but allow testing props passing
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
  AreaChart: ({ children }: { children: React.ReactNode }) => <div data-testid="area-chart">{children}</div>,
  Area: () => <div data-testid="area" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: ({ tickFormatter }: any) => {
     // Test the formatter if passed
     if (tickFormatter) tickFormatter(1000);
     return <div data-testid="y-axis" />;
  },
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: ({ formatter }: any) => {
     // Test the formatter if passed
     if (formatter) formatter(1000);
     return <div data-testid="tooltip" />;
  },
}));

describe('SpendingChart Component', () => {
  it('renders the chart correctly', () => {
    // Avoid Warning: The tag <stop> is unrecognized in this browser...
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation((msg) => {
      if (typeof msg === 'string' && (msg.includes('is unrecognized in this browser') || msg.includes('incorrect casing'))) return;
      console.error(msg);
    });

    const mockData = [
      { month: 'Jan', income: 4000, expenses: 2400 },
      { month: 'Feb', income: 3000, expenses: 1398 },
    ];
    render(<SpendingChart data={mockData} />);

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
    expect(screen.getAllByTestId('area')).toHaveLength(2); // One for income, one for expenses

    consoleSpy.mockRestore();
  });
});
