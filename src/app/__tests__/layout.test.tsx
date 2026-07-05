import { render, screen } from '@testing-library/react';
import RootLayout from '../layout';
import { vi } from 'vitest';

vi.mock('@/components/Sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

vi.mock('@/components/MobileNav', () => ({
  MobileNav: () => <div data-testid="mobile-nav">MobileNav</div>,
}));

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Inter: () => ({ className: 'mock-inter-font' }),
}));

describe('RootLayout', () => {
  it('renders the layout with children and sidebar', () => {
    // We strictly suppress only the Next.js html/body nesting warning inside the testing-library div wrapper
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation((msg, ...args) => {
      if (typeof msg === 'string' && msg.includes('validateDOMNesting')) return;
      throw new Error(`Unexpected console.error: ${msg} ${args.join(' ')}`);
    });

    render(
      <RootLayout>
        <div data-testid="child-content">Child Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
