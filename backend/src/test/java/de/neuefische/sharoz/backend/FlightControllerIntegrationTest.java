package de.neuefische.sharoz.backend;

import models.Flight;
import models.FlightWithoutId;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class FlightControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DirtiesContext
    void expectFlightList_whenGettingAllFlights() throws Exception {
        String expected = """
                [
                    {
                        "flightNumber": "FL123",
                        "departureAirport": "JFK",
                        "arrivalAirport": "LAX",
                        "scheduledDeparture": "2035-01-01T12:00:00",
                        "scheduledArrival": "2035-01-01T15:00:00",
                        "terminal": "A"
                    }
                ]
            """;

        String newFlight = """
            {
                "flightNumber": "FL123",
                "departureAirport": "JFK",
                "arrivalAirport": "LAX",
                "scheduledDeparture": "2035-01-01T12:00:00",
                "scheduledArrival": "2035-01-01T15:00:00",
                "terminal": "A"
            }
            """;

        mockMvc.perform(post("/api/flights").content(newFlight).contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());

        mockMvc.perform(get("/api/flights"))
                .andExpect(MockMvcResultMatchers.content().json(expected))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DirtiesContext
    void expectFlight_whenGettingByID() throws Exception {
        String newFlight = """
            {
                "flightNumber": "FL123",
                "departureAirport": "JFK",
                "arrivalAirport": "LAX",
                "scheduledDeparture": "2035-01-01T12:00:00",
                "scheduledArrival": "2035-01-01T15:00:00",
                "terminal": "A"
            }
            """;

        MvcResult result = mockMvc.perform(post("/api/flights").content(newFlight).contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        List<Flight> flights = (List<Flight>) result.getModelAndView().getModel().get("flights");
        String id = flights.get(0).getId();

        mockMvc.perform(get("/api/flights/" + id))
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.flightNumber").value("FL123"))
                .andExpect(jsonPath("$.departureAirport").value("JFK"))
                .andExpect(jsonPath("$.arrivalAirport").value("LAX"))
                .andExpect(jsonPath("$.scheduledDeparture").value("2035-01-01T12:00:00"))
                .andExpect(jsonPath("$.scheduledArrival").value("2035-01-01T15:00:00"))
                .andExpect(jsonPath("$.terminal").value("A"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    // Add more tests for update, delete, etc.

    @AfterEach
    public void tearDown() {
        // Cleanup resources if necessary
    }
}
