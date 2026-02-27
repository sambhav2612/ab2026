import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, CustomerFormData } from '../schemas/CustomerSchema';

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    mode: 'onBlur',
  });

  const handleFormSubmit = (data: CustomerFormData) => {
    onSubmit(data);
    reset(); // Clear the form after successful submission
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      aria-label="Create Customer Form"
    >
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          aria-invalid={!!errors.firstName}
          aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          {...register('firstName')}
        />
        {errors.firstName && (
          <span id="firstName-error" style={{ color: 'red' }}>
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          aria-invalid={!!errors.lastName}
          aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          {...register('lastName')}
        />
        {errors.lastName && (
          <span id="lastName-error" style={{ color: 'red' }}>
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          id="dateOfBirth"
          type="date"
          aria-invalid={!!errors.dateOfBirth}
          aria-describedby={errors.dateOfBirth ? 'dob-error' : undefined}
          {...register('dateOfBirth')}
        />
        {errors.dateOfBirth && (
          <span id="dob-error" style={{ color: 'red' }}>
            {errors.dateOfBirth.message}
          </span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Customer'}
      </button>
    </form>
  );
};

export default CustomerForm;
