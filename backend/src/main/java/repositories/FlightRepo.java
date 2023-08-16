package repositories;

import models.Flight;
import models.FlightWithoutId;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class FlightRepo {

    private final List<Flight> flights = new ArrayList<>();

    public List<Flight> findAll() {
        return new ArrayList<>(flights);
    }

    public Optional<Flight> findById(String id) {
        return flights.stream().filter(flight -> flight.getId().equals(id)).findFirst();
    }

    public Flight insert(Flight flight) {
        flights.add(flight);
        return flight;
    }

    public Flight save(Flight updatedFlight) {
        for (Flight flight : flights) {
            if (flight.getId().equals(updatedFlight.getId())) {
                flight.setFlightNumber(updatedFlight.getFlightNumber());
                flight.setDepartureAirport(updatedFlight.getDepartureAirport());
                flight.setArrivalAirport(updatedFlight.getArrivalAirport());
                flight.setScheduledDeparture(updatedFlight.getScheduledDeparture());
                flight.setScheduledArrival(updatedFlight.getScheduledArrival());
                flight.setTerminal(updatedFlight.getTerminal());
                flight.setUserId(updatedFlight.getUserId());
                return flight;
            }
        }
        return null;
    }

    public void deleteById(String id) {
        flights.removeIf(flight -> flight.getId().equals(id));
    }
}
