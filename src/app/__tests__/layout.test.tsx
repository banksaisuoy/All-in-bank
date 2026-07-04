import { render, screen } from '@testing-library/react';
import RootLayout from '../layout';
import { vi } from 'vitest';

vi.mock('@/components/Sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Inter: () => ({ className: 'mock-inter-font' }),
}));

describe('RootLayout', () => {
  it('renders the layout with children and sidebar', () => {
    // We suppress the warning for testing since NextJS requires html/body in root layout
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation((msg) => {
      if (msg.includes('validateDOMNesting')) return;
      console.error(msg);
    });

    render(
      <RootLayout>
        <div data-testid="child-content">Child Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
