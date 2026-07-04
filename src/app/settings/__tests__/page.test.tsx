import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsPage from '../page';

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe('SettingsPage', () => {
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

  it('shows success message on form submit', async () => {
    render(<SettingsPage />);

    const saveButton = screen.getByRole('button', { name: /Save Changes/i });
    fireEvent.click(saveButton);

    expect(await screen.findByText('Settings saved successfully!')).toBeInTheDocument();
  });
});
