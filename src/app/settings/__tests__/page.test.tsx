import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import SettingsPage from '../page';
import { vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe('SettingsPage', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the header correctly', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Manage your profile and preferences.')).toBeInTheDocument();
  });

  it('renders the form with mock data', () => {
    render(<SettingsPage />);

    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Alice Smith');
    expect(screen.getByLabelText(/Email Address/i)).toHaveValue('alice.smith@example.com');
    expect(screen.getByRole('button', { name: /Change Avatar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
  });

  it('shows and hides success message on form submit', async () => {
    render(<SettingsPage />);

    const saveButton = screen.getByRole('button', { name: /Save Changes/i });

    act(() => {
      fireEvent.click(saveButton);
    });

    expect(await screen.findByText('Settings saved successfully!')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    await waitFor(() => {
       expect(screen.queryByText('Settings saved successfully!')).not.toBeInTheDocument();
    });
  });
});
