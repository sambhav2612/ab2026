package bank.allica.onboarding.infrastructure.web;

import bank.allica.onboarding.application.ports.in.RegisterCustomerCommand;
import bank.allica.onboarding.application.ports.in.RegisterCustomerCase;
import bank.allica.onboarding.domain.Customer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {

    private final RegisterCustomerCase useCase;

    public CustomerController(RegisterCustomerCase useCase) {
        this.useCase = useCase;
    }

    @PostMapping
    public ResponseEntity<Customer> register(@RequestBody RegisterCustomerRequest request) {
        var command = new RegisterCustomerCommand(
                request.firstName(),
                request.lastName(),
                request.dateOfBirth());
        return ResponseEntity.status(HttpStatus.CREATED).body(useCase.register(command));
    }

    @GetMapping
    public ResponseEntity<List<Customer>> list() {
        return ResponseEntity.ok(useCase.getAll());
    }
}