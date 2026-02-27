package bank.allica.onboarding.application.ports.out;

import bank.allica.onboarding.domain.Customer;
import java.util.List;

public interface CustomerRepositoryPort {
    Customer save(Customer customer);

    List<Customer> findAll();
}