package controllers;

import jakarta.validation.Valid;
import models.Flight;
import models.FlightWithoutId;
import services.FlightService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping
    public List<Flight> listFlights() {
        return this.flightService.list();
    }

    @GetMapping("/{id}")
    public Flight getDetails(@PathVariable String id) {
        return this.flightService.getDetails(id);
    }

    @PostMapping
    public List<Flight> addFlight(@Valid @RequestBody FlightWithoutId newFlight) {
        this.flightService.add(newFlight);
        return this.flightService.list();
    }

    @PutMapping("/{id}")
    public Flight update(@PathVariable String id, @Valid @RequestBody FlightWithoutId newFlight) {
        return flightService.edit(id, newFlight);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        flightService.delete(id);
    }
}
