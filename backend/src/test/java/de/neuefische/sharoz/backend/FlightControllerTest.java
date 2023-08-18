package de.neuefische.sharoz.backend;
import de.neuefische.sharoz.backend.controllers.FlightController;
import de.neuefische.sharoz.backend.models.Flight;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class FlightControllerTest {

    private MockMvc mockMvc;

    @MockBean
    private FlightController flightController;

    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void getFlightsByNumberShouldReturnListOfFlights() throws Exception {
        // Arrange
        Flight mockFlight = new Flight();
        mockFlight.setFlightNumber("LH123");
        mockFlight.setDepartureAirport("Hamburg");
        mockFlight.setArrivalAirport("Berlin");
        List<Flight> mockFlights = Arrays.asList(mockFlight);

        when(flightController.getFlightsByNumber("LH123")).thenReturn(mockFlights);

        // Act & Assert
        mockMvc.perform(get("/flights/LH123"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("[{\"flightNumber\":\"LH123\",\"departureAirport\":\"Hamburg\",\"arrivalAirport\":\"Berlin\"}]"));
    }
}

