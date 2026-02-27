package bank.allica.onboarding.application.ports.in;

import java.time.LocalDate;

public record RegisterCustomerCommand(String firstName, String lastName, LocalDate dateOfBirth) {
}