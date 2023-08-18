package de.neuefische.sharoz.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Flight not found!")
public class NoSuchFlightException extends RuntimeException {
    public NoSuchFlightException() {
    }

    public NoSuchFlightException(String id) {
        super("Flight not found: " + id);
    }
}
