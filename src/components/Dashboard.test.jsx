import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock Recharts per instructions
describe('App Routing', () => {
  it('renders App with routing', async () => {
     render(<App />);
     // The dashboard displays a loading state first due to useProfile. We should wait for Overview or find Loading dashboard.
     expect(await screen.findByText('Overview')).toBeInTheDocument();
  });
});