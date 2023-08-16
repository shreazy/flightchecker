package services;

import exception.NoSuchFlightException;
import models.Flight;
import models.FlightWithoutId;
import repositories.FlightRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {

    private final FlightRepo flightRepo;
    private final UuIdService uuIdService;

    public FlightService(FlightRepo flightRepo, UuIdService uuIdService) {
        this.flightRepo = flightRepo;
        this.uuIdService = uuIdService;
    }

    public List<Flight> list() {
        return this.flightRepo.findAll();
    }

    public Flight add(FlightWithoutId newFlight) {
        String id = uuIdService.getRandomId();
        Flight flight = new Flight(id, newFlight.getFlightNumber(), newFlight.getDepartureAirport(), newFlight.getArrivalAirport(), newFlight.getScheduledDeparture(), newFlight.getScheduledArrival(), newFlight.getTerminal(), null);
        return this.flightRepo.insert(flight);
    }

    public Flight getDetails(String id) {
        return this.flightRepo.findById(id).orElseThrow(() -> new NoSuchFlightException(id));
    }

    public Flight edit(String id, FlightWithoutId newFlight) {
        Flight currentFlight = this.flightRepo.findById(id).orElseThrow(() -> new NoSuchFlightException(id));
        Flight editedFlight = new Flight(id, newFlight.getFlightNumber(), newFlight.getDepartureAirport(), newFlight.getArrivalAirport(), newFlight.getScheduledDeparture(), newFlight.getScheduledArrival(), newFlight.getTerminal(), currentFlight.getUserId());
        return this.flightRepo.save(editedFlight);
    }

    public void delete(String id) {
        this.flightRepo.deleteById(id);
    }
}
