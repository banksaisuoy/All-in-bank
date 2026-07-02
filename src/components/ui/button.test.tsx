import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './button';

describe('Button component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles clicks', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Click me' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('passes classNames correctly', () => {
    render(<Button className="my-custom-class">Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toHaveClass('my-custom-class');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeDisabled();
  });
});
