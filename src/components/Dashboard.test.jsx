import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import React from 'react';

// The app will render the Home component initially
describe('App Routing', () => {
  it('renders App with routing (renders home page)', async () => {
     render(<App />);
     
     await waitFor(() => {
       expect(screen.getByText('Welcome to All-in-bank')).toBeInTheDocument();
     });
  });
});