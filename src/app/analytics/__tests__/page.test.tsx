import { render, screen } from '@testing-library/react';
import AnalyticsPage from '../page';

// Mock Recharts and Next dynamic imports to simplify testing
vi.mock('next/dynamic', () => ({
  default: () => {
    const DynamicComponent = () => <div data-testid="mock-dynamic-chart">Mock Chart</div>;
    return DynamicComponent;
  },
}));

// We also mock ChartWrapper to avoid testing its internal Recharts implementation here
vi.mock('@/components/ChartWrapper', () => ({
  ChartWrapper: () => <div data-testid="mock-chart-wrapper">Mock Chart Wrapper</div>
}));

describe('AnalyticsPage', () => {
  it('renders the header correctly', () => {
    render(<AnalyticsPage />);
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Dive deep into your spending habits.')).toBeInTheDocument();
  });

  it('renders the charts', () => {
    render(<AnalyticsPage />);

    expect(screen.getByTestId('mock-chart-wrapper')).toBeInTheDocument();
    expect(screen.getByText('Spending by Category')).toBeInTheDocument();
    expect(screen.getByTestId('mock-dynamic-chart')).toBeInTheDocument();
  });
});
