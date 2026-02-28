package bank.allica.onboarding.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class CustomerTest {

    @Test
    @DisplayName("should create customer when all details are valid and age is 18+")
    void shouldCreateCustomer() {
        var dob = LocalDate.of(1995, 5, 10);
        var customer = new Customer("Jane", "Doe", dob);
        
        assertThat(customer.firstName()).isEqualTo("Jane");
        assertThat(customer.lastName()).isEqualTo("Doe");
        assertThat(customer.dateOfBirth()).isEqualTo(dob);
    }

    @Test
    @DisplayName("should reject registration if first name is blank")
    void shouldRejectEmptyFirstName() {
        var dob = LocalDate.of(1990, 1, 1);
        assertThatThrownBy(() -> new Customer("   ", "Smith", dob))
           .isInstanceOf(IllegalArgumentException.class)
           .hasMessageContaining("First name cannot be blank");
    }

    @Test
    @DisplayName("should reject registration if last name is blank")
    void shouldRejectEmptylastName() {
        var dob = LocalDate.of(1990, 1, 1);
        assertThatThrownBy(() -> new Customer("John", "   ", dob))
           .isInstanceOf(IllegalArgumentException.class)
           .hasMessageContaining("Last name cannot be blank");
    }

    @Test
    @DisplayName("should reject registration if customer is under 18")
    void shouldRejectMinor() {
        var underageDob = LocalDate.now().minusYears(17).minusDays(1);
        assertThatThrownBy(() -> new Customer("Jane", "Doe", underageDob))
           .isInstanceOf(IllegalArgumentException.class)
           .hasMessageContaining("Customer must be at least 18 years old");
    }
}