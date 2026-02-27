package bank.allica.onboarding.infrastructure.persistence;

import bank.allica.onboarding.application.ports.out.CustomerRepositoryPort;
import bank.allica.onboarding.domain.Customer;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class InMemoryCustomerRepositoryAdapter implements CustomerRepositoryPort {

    // Thread-safe store to satisfy the in-memory requirement
    private final Map<UUID, Customer> store = new ConcurrentHashMap<>();

    @Override
    public Customer save(Customer customer) {
        store.put(customer.id(), customer);
        return customer;
    }

    @Override
    public List<Customer> findAll() {
        // Return a sorted list (by ID or name) to ensure predictable UI rendering
        return store.values().stream()
                .sorted((c1, c2) -> c1.lastName().compareToIgnoreCase(c2.lastName()))
                .toList();
    }
}