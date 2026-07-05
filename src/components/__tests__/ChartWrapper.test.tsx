import { render, screen } from '@testing-library/react';
import { ChartWrapper } from '../ChartWrapper';
import { vi } from 'vitest';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

// Mock dynamic import allowing the loading state to render first
vi.mock('next/dynamic', async () => {
    return {
        default: (importFn: any, options: any) => {
            let ResolvedComponent: any = null;
            importFn().then((res: any) => {
               ResolvedComponent = res;
            });

            return function DynamicComponent(props: any) {
               // Render loading component if not resolved and options exist
               if(!ResolvedComponent && options && options.loading) {
                   return options.loading();
               }
               if(ResolvedComponent) return <ResolvedComponent {...props} />
               return <div data-testid="mock-spending-chart">SpendingChart</div>;
            }
        }
    }
});

describe('ChartWrapper Component', () => {
  it('renders correctly with loading state and chart', async () => {
    render(<ChartWrapper data={[]} />);
    expect(screen.getByText(/Cash Flow/i)).toBeInTheDocument();

    // Check for the loading text defined in the Next.js dynamic options
    expect(screen.getByText(/Loading chart data.../i)).toBeInTheDocument();
  });
});
