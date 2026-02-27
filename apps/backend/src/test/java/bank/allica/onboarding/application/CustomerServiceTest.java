package bank.allica.onboarding.application;

import bank.allica.onboarding.application.ports.in.RegisterCustomerCommand;
import bank.allica.onboarding.application.ports.out.CustomerRepositoryPort;
import bank.allica.onboarding.application.services.CustomerService;
import bank.allica.onboarding.domain.Customer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class CustomerServiceTest {

    private CustomerRepositoryPort repository;
    private CustomerService service;

    @BeforeEach
    void setUp() {
        repository = Mockito.mock(CustomerRepositoryPort.class);
        service = new CustomerService(repository);
    }

    @Test
    void shouldRegisterNewCustomer() {
        var dob = LocalDate.of(1990, 1, 1);
        var command = new RegisterCustomerCommand("John", "Doe", dob);

        when(repository.save(any(Customer.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var result = service.register(command);

        assertThat(result.firstName()).isEqualTo("John");
        verify(repository).save(any(Customer.class));
    }
}