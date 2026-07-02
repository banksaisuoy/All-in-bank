import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';

describe('Card components', () => {
  it('renders all card components properly', () => {
    render(
      <Card data-testid="card">
        <CardHeader data-testid="card-header">
          <CardTitle>My Title</CardTitle>
          <CardDescription>My Description</CardDescription>
        </CardHeader>
        <CardContent data-testid="card-content">Content</CardContent>
        <CardFooter data-testid="card-footer">Footer</CardFooter>
      </Card>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByText('My Title')).toBeInTheDocument();
    expect(screen.getByText('My Description')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
