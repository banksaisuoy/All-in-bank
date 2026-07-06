import { render, screen } from '@testing-library/react';
import CardsPage from '../page';

// Mock framer-motion to avoid complex animation testing issues in jsdom
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => {
        // Strip out framer-motion specific props that might cause issues
        const { initial, animate, transition, layoutId, ...safeProps } = props;
        return <div {...safeProps}>{children}</div>;
      }
    }
  };
});

describe('CardsPage', () => {
  it('renders the header correctly', () => {
    render(<CardsPage />);
    expect(screen.getByText('Cards')).toBeInTheDocument();
    expect(screen.getByText('Manage your credit and debit cards.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Card/i })).toBeInTheDocument();
  });

  it('renders card data from mockData correctly', () => {
    render(<CardsPage />);

    // Check for mock data
    expect(screen.getByText('**** **** **** 4242')).toBeInTheDocument();
    expect(screen.getByText('**** **** **** 8888')).toBeInTheDocument();
    expect(screen.getByText('12/25')).toBeInTheDocument();
    expect(screen.getByText('09/27')).toBeInTheDocument();
    expect(screen.getByText('Visa')).toBeInTheDocument();
    expect(screen.getByText('Mastercard')).toBeInTheDocument();
  });
});
