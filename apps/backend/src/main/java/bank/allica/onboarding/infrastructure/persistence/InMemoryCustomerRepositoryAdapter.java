package bank.allica.onboarding.infrastructure.persistence;

import bank.allica.onboarding.application.ports.out.CustomerRepositoryPort;
import bank.allica.onboarding.domain.Customer;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class InMemoryCustomerRepositoryAdapter implements CustomerRepositoryPort {

    private final CustomerJpaRepository jpaRepository;

    public InMemoryCustomerRepositoryAdapter(CustomerJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Customer save(Customer customer) {
        // Map Domain Record -> JPA Entity
        CustomerEntity entity = new CustomerEntity(
                customer.id(),
                customer.firstName(),
                customer.lastName(),
                customer.dateOfBirth());

        jpaRepository.save(entity);
        return customer;
    }

    @Override
    public List<Customer> findAll() {
        // Map JPA Entity -> Domain Record
        return jpaRepository.findAll().stream()
                .map(entity -> new Customer(
                        entity.getId(),
                        entity.getFirstName(),
                        entity.getLastName(),
                        entity.getDateOfBirth()))
                // Sort by Last Name, then First Name for the UI
                .sorted(java.util.Comparator.comparing(Customer::lastName, String.CASE_INSENSITIVE_ORDER)
                        .thenComparing(Customer::firstName, String.CASE_INSENSITIVE_ORDER))
                .collect(Collectors.toList());
    }
}