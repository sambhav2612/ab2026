package bank.allica.onboarding.infrastructure.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleDomainValidation(IllegalArgumentException ex) {
        // Return clear, actionable error messages for the UI to display
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }
}