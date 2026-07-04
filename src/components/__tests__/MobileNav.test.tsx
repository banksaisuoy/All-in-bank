import { render, screen } from '@testing-library/react';
import { MobileNav } from '../MobileNav';
import { usePathname } from 'next/navigation';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('MobileNav', () => {
  it('renders correctly', () => {
    (usePathname as any).mockReturnValue('/');
    render(<MobileNav />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Accounts')).toBeInTheDocument();
  });
});
