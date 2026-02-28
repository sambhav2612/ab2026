import React from 'react';
import { useCustomers } from '../hooks/useCustomers';
import CustomerForm from './CustomerForm';

const CustomerList: React.FC = () => {
  const { customers, isLoading, createCustomer } = useCustomers();

  return (
    <div>
      <h1>Customer Management</h1>

      <section>
        <h2>Add New Customer</h2>
        {/* Pass the createCustomer function to the form */}
        <CustomerForm onSubmit={createCustomer} />
      </section>

      <hr />

      <section>
        <h2>Customer List</h2>
        {isLoading ? (
          <div aria-label="Loading customers...">Loading...</div>
        ) : !customers || customers.length === 0 ? (
          <div>No customers found.</div>
        ) : (
          <ul>
            {customers.map((customer) => (
              <li key={customer.id}>
                {customer.firstName} {customer.lastName} (DOB:{' '}
                {customer.dateOfBirth})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default CustomerList;
