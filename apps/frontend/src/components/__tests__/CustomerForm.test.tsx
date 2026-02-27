import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomerForm from '../CustomerForm';
import { vi } from 'vitest';

describe('CustomerForm Validation', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();
    render(<CustomerForm onSubmit={mockOnSubmit} />);

    // Click submit without filling anything
    const submitButton = screen.getByRole('button', {
      name: /create customer/i,
    });
    await user.click(submitButton);

    // Verify Zod validation messages appear
    expect(
      await screen.findByText('First name must be at least 2 characters'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Last name must be at least 2 characters'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Valid date of birth in the past is required'),
    ).toBeInTheDocument();

    // Ensure onSubmit was never called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('displays validation errors for invalid data', async () => {
    const user = userEvent.setup();
    render(<CustomerForm onSubmit={mockOnSubmit} />);

    // Type invalid data (single characters, future date)
    await user.type(screen.getByLabelText(/first name/i), 'A');
    await user.type(screen.getByLabelText(/last name/i), 'B');

    // Set a future date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const futureDate = tomorrow.toISOString().split('T')[0];
    await user.type(screen.getByLabelText(/date of birth/i), futureDate);

    await user.click(screen.getByRole('button', { name: /create customer/i }));

    expect(
      await screen.findByText('First name must be at least 2 characters'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Last name must be at least 2 characters'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Valid date of birth in the past is required'),
    ).toBeInTheDocument();

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits successfully with valid data and clears the form', async () => {
    const user = userEvent.setup();
    render(<CustomerForm onSubmit={mockOnSubmit} />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const dobInput = screen.getByLabelText(/date of birth/i);

    await user.type(firstNameInput, 'Ada');
    await user.type(lastNameInput, 'Lovelace');
    await user.type(dobInput, '1815-12-10');

    await user.click(screen.getByRole('button', { name: /create customer/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        firstName: 'Ada',
        lastName: 'Lovelace',
        dateOfBirth: '1815-12-10',
      });
    });

    // Verify form resets after successful submission
    expect(firstNameInput).toHaveValue('');
    expect(lastNameInput).toHaveValue('');
    expect(dobInput).toHaveValue('');
  });
});
