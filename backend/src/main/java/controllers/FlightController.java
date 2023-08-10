package controllers;
import models.Flight;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

@RestController
public class FlightController {

    private static final String API_URL = "https://rest.api.hamburg-airport.de/v2/flights/arrivals";

    @GetMapping("/flights/{flightNumber}")
    public List<Flight> getFlightsByNumber(@PathVariable String flightNumber) {
        try {
            URL url = new URL(API_URL + "/?flightNumber=" + flightNumber);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // Request headers
            connection.setRequestProperty("Cache-Control", "no-cache");
            connection.setRequestProperty("Ocp-Apim-Subscription-Key", API_KEY);
            connection.setRequestMethod("GET");

            int status = connection.getResponseCode();
            if (status != 200) {
                throw new RuntimeException("Failed with HTTP error code: " + status);
            }

            ObjectMapper mapper = new ObjectMapper();
            List<Flight> flights = mapper.readValue(connection.getInputStream(), new TypeReference<List<Flight>>() {});

            connection.disconnect();
            return flights;

        } catch (Exception ex) {
            throw new RuntimeException("Error fetching flights: " + ex.getMessage());
        }
    }
}
