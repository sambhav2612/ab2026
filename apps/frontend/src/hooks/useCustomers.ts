import { useState, useEffect, useCallback } from 'react';
import { CustomerFormData } from '../schemas/CustomerSchema';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

// Assuming standard Spring Boot local port
const API_BASE_URL = 'http://localhost:8080/api/v1/customers';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // GET: Retrieve customer details
  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'An unexpected error occurred');
      }

      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred fetching data',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch initial data on mount
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // POST: Create a new customer
  const createCustomer = async (customerData: CustomerFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || 'An unexpected error occurred on the server.',
        );
      }

      // Refresh the ledger on success
      await fetchCustomers();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    customers,
    isLoading,
    error,
    createCustomer,
    refetch: fetchCustomers,
  };
};
