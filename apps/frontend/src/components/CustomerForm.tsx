import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, CustomerFormData } from '../schemas/CustomerSchema';

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => Promise<void>;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    mode: 'onBlur',
  });

  const handleFormSubmit = async (data: CustomerFormData) => {
    try {
      // Await the API call
      await onSubmit(data);
      reset(); // Clear the form only if successful
    } catch (error) {
      // Catch the backend exception and display it
      if (error instanceof Error) {
        setError('root.serverError', {
          type: 'server',
          message: error.message,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      aria-label="Create Customer Form"
    >
      {/* --- Display Backend Exceptions Here --- */}
      {errors.root?.serverError && (
        <div
          style={{
            padding: '10px',
            marginBottom: '15px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderLeft: '4px solid #c62828',
          }}
          role="alert"
        >
          <strong>Registration Failed: </strong>
          {errors.root.serverError.message}
        </div>
      )}

      {/* ... First Name Input ... */}
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          aria-invalid={!!errors.firstName}
          {...register('firstName')}
        />
        {errors.firstName && (
          <span style={{ color: 'red' }}>{errors.firstName.message}</span>
        )}
      </div>

      {/* ... Last Name Input ... */}
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          aria-invalid={!!errors.lastName}
          {...register('lastName')}
        />
        {errors.lastName && (
          <span style={{ color: 'red' }}>{errors.lastName.message}</span>
        )}
      </div>

      {/* ... Date of Birth Input ... */}
      <div>
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          id="dateOfBirth"
          type="date"
          aria-invalid={!!errors.dateOfBirth}
          {...register('dateOfBirth')}
        />
        {errors.dateOfBirth && (
          <span style={{ color: 'red' }}>{errors.dateOfBirth.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Customer'}
      </button>
    </form>
  );
};

export default CustomerForm;
