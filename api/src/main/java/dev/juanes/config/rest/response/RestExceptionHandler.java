package dev.juanes.config.rest.response;

import dev.juanes.config.exception.ValidationException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RestExceptionHandler {
    @ExceptionHandler(ValidationException.class)
    protected ResponseEntity<ApiResponse> handleValidationExceptions(ValidationException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(ex.getMessage()));
    }
}
