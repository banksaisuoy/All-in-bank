import { describe, it, expect, vi } from 'vitest';
import { Dashboard } from './Dashboard';
import { SpendingChart } from './SpendingChart';
import App from '../App';

// Mock Recharts per instructions
describe('App Routing', () => {
  it('renders App with routing', () => {
     render(<App />);
     expect(screen.getByText('Overview')).toBeInTheDocument();
  });
});