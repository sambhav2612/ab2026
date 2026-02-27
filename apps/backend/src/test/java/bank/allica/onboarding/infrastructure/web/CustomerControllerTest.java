package bank.allica.onboarding.infrastructure.web;

import bank.allica.onboarding.application.ports.in.RegisterCustomerCase;
import bank.allica.onboarding.domain.Customer;
import tools.jackson.databind.ObjectMapper; 
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean; 
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CustomerController.class)
class CustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean 
    private RegisterCustomerCase useCase;

    @Test
    void shouldReturnCreatedWhenRegistrationIsValid() throws Exception {
        var request = new RegisterCustomerRequest("Jane", "Smith", LocalDate.of(1990, 1, 1));
        var savedCustomer = new Customer(UUID.randomUUID(), "Jane", "Smith", LocalDate.of(1990, 1, 1));

        when(useCase.register(any())).thenReturn(savedCustomer);

        mockMvc.perform(post("/api/v1/customers")
             .contentType(MediaType.APPLICATION_JSON)
             .content(objectMapper.writeValueAsString(request)))
             .andExpect(status().isCreated())
             .andExpect(jsonPath("$.firstName").value("Jane"));
    }

    @Test
    void shouldReturnBadRequestWhenDomainValidationFails() throws Exception {
        var request = new RegisterCustomerRequest("Jane", "Doe", LocalDate.now().minusYears(17));
        
        when(useCase.register(any())).thenThrow(new IllegalArgumentException("Customer must be at least 18 years old"));

        mockMvc.perform(post("/api/v1/customers")
             .contentType(MediaType.APPLICATION_JSON)
             .content(objectMapper.writeValueAsString(request)))
             .andExpect(status().isBadRequest())
             .andExpect(jsonPath("$.error").value("Customer must be at least 18 years old"));
    }

    @Test
    void shouldReturnCustomerList() throws Exception {
        when(useCase.getAll()).thenReturn(List.of());

        mockMvc.perform(get("/api/v1/customers"))
             .andExpect(status().isOk())
             .andExpect(jsonPath("$").isArray());
    }
}