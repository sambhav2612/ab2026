package bank.allica.onboarding.application.services;

import bank.allica.onboarding.application.ports.in.RegisterCustomerCommand;
import bank.allica.onboarding.application.ports.in.RegisterCustomerCase;
import bank.allica.onboarding.application.ports.out.CustomerRepositoryPort;
import bank.allica.onboarding.domain.Customer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService implements RegisterCustomerCase {

    private final CustomerRepositoryPort repository;

    public CustomerService(CustomerRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public Customer register(RegisterCustomerCommand command) {
        // Map DTO to Domain Entity (Validation happens automatically in the record
        // constructor)
        var customer = new Customer(
                command.firstName(),
                command.lastName(),
                command.dateOfBirth());

        return repository.save(customer);
    }

    @Override
    public List<Customer> getAll() {
        return repository.findAll();
    }
}