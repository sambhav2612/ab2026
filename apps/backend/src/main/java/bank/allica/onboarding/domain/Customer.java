package bank.allica.onboarding.domain;

import java.time.LocalDate;
import java.time.Period;
import java.util.UUID;

/**
 * Core Domain Entity.
 */
public record Customer(UUID id, String firstName, String lastName, LocalDate dateOfBirth) {

    // Primary constructor for new registrations
    public Customer(String firstName, String lastName, LocalDate dateOfBirth) {
        this(UUID.randomUUID(), firstName, lastName, dateOfBirth);
    }

    // Compact constructor for validation
    public Customer {
        if (firstName == null || firstName.trim().isEmpty()) {
            throw new IllegalArgumentException("First name cannot be blank");
        }
        if (lastName == null || lastName.trim().isEmpty()) {
            throw new IllegalArgumentException("Last name cannot be blank");
        }
        if (dateOfBirth == null) {
            throw new IllegalArgumentException("Date of birth is required");
        }

        // Banking specific invariant: Customer must be an adult
        if (Period.between(dateOfBirth, LocalDate.now()).getYears() < 18) {
            throw new IllegalArgumentException("Customer must be at least 18 years old to open a commercial account");
        }
    }
}