package de.neuefische.sharoz.backend.controllers;

import jakarta.validation.Valid;
import de.neuefische.sharoz.backend.models.Flight;
import de.neuefische.sharoz.backend.models.FlightWithoutId;
import de.neuefische.sharoz.backend.services.FlightService;
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
    public Flight addFlight(@Valid @RequestBody FlightWithoutId newFlight) {
        return this.flightService.add(newFlight);
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
