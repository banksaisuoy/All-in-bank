import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import React from 'react';

// The app will redirect to login if not authenticated.
describe('App Routing', () => {
  it('renders App with routing (redirects to login)', async () => {
     render(<App />);
     
     // Due to PrivateRoute and no token in localStorage, it will render the Login component.
     await waitFor(() => {
       expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
     });
  });
});