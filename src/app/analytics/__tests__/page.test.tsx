import { render, screen } from '@testing-library/react';
import AnalyticsPage from '../page';
import { vi } from 'vitest';
import { mockDashboardData } from '@/lib/mockData';

// We also mock ChartWrapper to avoid testing its internal Recharts implementation here
vi.mock('@/components/ChartWrapper', () => ({
  ChartWrapper: () => <div data-testid="mock-chart-wrapper">Mock Chart Wrapper</div>
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

// The mock for next/dynamic must return the implementation that renders the chart
vi.mock('next/dynamic', async () => {
    return {
        default: (importFn: any, options: any) => {
            let ResolvedComponent: any = null;
            importFn().then((res: any) => {
               ResolvedComponent = res;

               // Render the loading component to get coverage on it if we have not yet resolved
               if (options && options.loading) {
                   options.loading();
               }
            });

            return function DynamicComponent(props: any) {
               if(ResolvedComponent) return <ResolvedComponent {...props} />
               // Render loading component if not resolved and options exist
               if(!ResolvedComponent && options && options.loading) {
                   return options.loading();
               }
               return <div data-testid="mock-dynamic-chart">Mock Chart</div>;
            }
        }
    }
});

// Mock Recharts
vi.mock('recharts', () => ({
    ResponsiveContainer: ({ children }: any) => <div data-testid="recharts-responsive-container">{children}</div>,
    PieChart: ({ children }: any) => <svg data-testid="recharts-pie-chart">{children}</svg>,
    Pie: ({ children }: any) => <g data-testid="recharts-pie">{children}</g>,
    Cell: () => <g data-testid="recharts-cell" />,
    Tooltip: ({ formatter }: any) => {
      // Execute the formatter logic to cover it in tests
      if (formatter) {
         const mockLoadingValue = () => {
             return <div data-testid="recharts-tooltip">Tooltip {formatter(100)}</div>;
         }
         return mockLoadingValue();
      }
      return <div data-testid="recharts-tooltip" />;
    },
    Legend: () => <div data-testid="recharts-legend" />,
  }));


describe('AnalyticsPage', () => {
  it('renders the header correctly', () => {
    render(<AnalyticsPage />);
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Dive deep into your spending habits.')).toBeInTheDocument();
  });

  it('renders the charts and internal pie chart', async () => {
    render(<AnalyticsPage />);

    expect(screen.getByTestId('mock-chart-wrapper')).toBeInTheDocument();
    expect(screen.getByText('Spending by Category')).toBeInTheDocument();

    // We mock so it resolves immediately in vitest's execution model
    expect(await screen.findByTestId('recharts-pie-chart')).toBeInTheDocument();
    expect(await screen.findByTestId('recharts-pie')).toBeInTheDocument();
    expect(await screen.findByTestId('recharts-tooltip')).toBeInTheDocument();
  });
});
