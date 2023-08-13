package models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightWithoutId {
    private String flightNumber;
    private String departureAirport;
    private String arrivalAirport;
    private LocalDateTime scheduledDeparture;
    private LocalDateTime scheduledArrival;
    private String terminal;
}
