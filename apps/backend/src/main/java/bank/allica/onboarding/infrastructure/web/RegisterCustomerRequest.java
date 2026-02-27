package bank.allica.onboarding.infrastructure.web;

import java.time.LocalDate;

public record RegisterCustomerRequest(String firstName, String lastName, LocalDate dateOfBirth) {
}