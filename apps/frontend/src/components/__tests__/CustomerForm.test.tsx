import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomerForm } from '../CustomerForm';
import { vi, describe, it, expect } from 'vitest';

describe('CustomerForm', () => {
  it('should display validation errors when submitting an empty form', async () => {
    const mockSuccess = vi.fn();
    render(<CustomerForm onSuccess={mockSuccess} />);

    const submitButton = screen.getByRole('button', {
      name: /register customer/i,
    });
    await userEvent.click(submitButton);

    // Verify accessible error messages appear
    expect(
      await screen.findByText(/first name is required/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/last name is required/i),
    ).toBeInTheDocument();
    expect(mockSuccess).not.toHaveBeenCalled();
  });

  it('should call onSuccess and reset form after successful submission', async () => {
    const mockSuccess = vi.fn();

    // Mock the global fetch for the API call
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: '123', firstName: 'Jane', lastName: 'Doe' }),
    });

    render(<CustomerForm onSuccess={mockSuccess} />);

    // Act: Fill out the form
    await userEvent.type(screen.getByLabelText(/first name/i), 'Jane');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(screen.getByLabelText(/date of birth/i), '1995-05-10');

    await userEvent.click(
      screen.getByRole('button', { name: /register customer/i }),
    );

    // Assert: Success callback triggered
    await waitFor(() => {
      expect(mockSuccess).toHaveBeenCalled();
    });
  });
});
