import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomerList from '../CustomerList';
import { useCustomers } from '../../hooks/useCustomers';
import { vi, Mock } from 'vitest';

// Mock the data fetching hook
vi.mock('../../hooks/useCustomers');

describe('CustomerList Dashboard - Integration', () => {
  const mockCreateCustomer = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useCustomers as Mock).mockReturnValue({
      customers: [],
      isLoading: false,
      createCustomer: mockCreateCustomer,
    });
  });

  it('renders the create customer form alongside the ledger', () => {
    render(<CustomerList />);

    // Verify the form elements are present
    expect(
      screen.getByRole('form', { name: /create customer form/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('No customers found.')).toBeInTheDocument();
  });

  it('calls createCustomer when the form is successfully submitted', async () => {
    const user = userEvent.setup();
    render(<CustomerList />);

    await user.type(screen.getByLabelText(/first name/i), 'Grace');
    await user.type(screen.getByLabelText(/last name/i), 'Hopper');
    await user.type(screen.getByLabelText(/date of birth/i), '1906-12-09');

    await user.click(screen.getByRole('button', { name: /create customer/i }));

    await waitFor(() => {
      expect(mockCreateCustomer).toHaveBeenCalledWith({
        firstName: 'Grace',
        lastName: 'Hopper',
        dateOfBirth: '1906-12-09',
      });
    });
  });
});
