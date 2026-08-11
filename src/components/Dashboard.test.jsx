import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('App Routing', () => {
  it('renders App', async () => {
     render(<App />);
     await waitFor(() => {
       expect(screen.getAllByText(/Sign in/i)[0]).toBeInTheDocument();
     });
  });
});