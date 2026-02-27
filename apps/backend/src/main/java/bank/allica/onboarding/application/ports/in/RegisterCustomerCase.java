package bank.allica.onboarding.application.ports.in;

import bank.allica.onboarding.domain.Customer;
import java.util.List;

public interface RegisterCustomerCase {
    Customer register(RegisterCustomerCommand command);

    List<Customer> getAll();
}