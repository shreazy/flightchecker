package controllers;
import models.Flight;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class FlightController {

    @GetMapping("/flights/{flightNumber}")
    public Flight getFlight(@PathVariable String flightNumber) {
        // This is where we would call the service to get the flight data based on flightNumber
        // For now, return a demo flight
        Flight demoFlight = new Flight();
        demoFlight.setFlightNumber("AB123");
        demoFlight.setDepartureAirport("Hamburg");
        demoFlight.setArrivalAirport("Berlin");
        demoFlight.setScheduledDeparture(LocalDateTime.of(2023, 7, 27, 8, 0));
        demoFlight.setActualDeparture(LocalDateTime.of(2023, 7, 27, 8, 5));
        demoFlight.setScheduledArrival(LocalDateTime.of(2023, 7, 27, 9, 0));
        demoFlight.setActualArrival(LocalDateTime.of(2023, 7, 27, 9, 5));
        demoFlight.setTerminal("1");

        return demoFlight;
    }
}
