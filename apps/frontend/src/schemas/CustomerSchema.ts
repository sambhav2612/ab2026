import { z } from 'zod';

export const customerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().refine(
    (date) => {
      const parsedDate = Date.parse(date);
      return !isNaN(parsedDate) && new Date(parsedDate) <= new Date();
    },
    {
      message: 'Valid date of birth in the past is required',
    },
  ),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
