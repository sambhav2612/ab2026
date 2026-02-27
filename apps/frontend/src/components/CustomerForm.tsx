import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  onSuccess: () => void;
}

export const CustomerForm = ({ onSuccess }: Props) => {
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setApiError(null);
    try {
      const response = await fetch('http://localhost:8080/api/v1/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      reset();
      onSuccess();
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : 'An unexpected error occurred',
      );
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {apiError && (
          <div role="alert" className="error-banner">
            {apiError}
          </div>
        )}

        <div className="field-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            {...register('firstName')}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
          {errors.firstName && (
            <span id="firstName-error" className="error-msg">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            {...register('lastName')}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          />
          {errors.lastName && (
            <span id="lastName-error" className="error-msg">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            id="dateOfBirth"
            type="date"
            {...register('dateOfBirth')}
            aria-invalid={!!errors.dateOfBirth}
            aria-describedby={errors.dateOfBirth ? 'dob-error' : undefined}
          />
          {errors.dateOfBirth && (
            <span id="dob-error" className="error-msg">
              {errors.dateOfBirth.message}
            </span>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register Customer'}
        </button>
      </form>
    </div>
  );
};
