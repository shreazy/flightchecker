package de.neuefische.sharoz.backend;

import exception.NoSuchFlightException;
import models.Flight;
import models.FlightWithoutId;
import repositories.FlightRepo;
import services.FlightService;
import services.UuIdService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FlightServiceTest {

    FlightRepo flightRepo = mock(FlightRepo.class);
    UuIdService uuIdService = mock(UuIdService.class);

    FlightService flightService = new FlightService(flightRepo, uuIdService);

    @Test
    void expectListOfAllFlights_whenGettingTheList() {
        //given
        Flight newFlight = new Flight("abc", "FN123", "JFK", "LAX", LocalDateTime.now(), LocalDateTime.now().plusHours(5), "T1", null);
        List<Flight> expected = new ArrayList<>(List.of(newFlight));
        //when
        when(flightRepo.findAll()).thenReturn(expected);
        List<Flight> actual = flightService.list();
        //then
        assertEquals(expected, actual);
        verify(flightRepo).findAll();
    }

    @Test
    void expectId_whenAddedFlight() {
        //given
        FlightWithoutId newFlight = new FlightWithoutId("FN123", "JFK", "LAX", LocalDateTime.now(), LocalDateTime.now().plusHours(5), "T1");
        Flight expected = new Flight("abc", "FN123", "JFK", "LAX", LocalDateTime.now(), LocalDateTime.now().plusHours(5), "T1", null);
        //when
        when(uuIdService.getRandomId()).thenReturn("abc");
        when(flightRepo.insert(expected)).thenReturn(expected);
        Flight actual = flightService.add(newFlight);
        //then
        assertEquals(expected, actual);
        verify(uuIdService).getRandomId();
        verify(flightRepo).insert(expected);
    }

    @Test
    void expectFlight_whenGettingFlightDetails() {
        //given
        Flight expected = new Flight("abc", "FN123", "JFK", "LAX", LocalDateTime.now(), LocalDateTime.now().plusHours(5), "T1", null);
        //when
        when(flightRepo.findById("abc")).thenReturn(Optional.of(expected));
        Flight actual = flightService.getDetails("abc");
        //then
        assertEquals(expected, actual);
        verify(flightRepo).findById("abc");
    }

    @Test
    void expectUpdatedFlight_whenEditingFlightDetails() {
        //given
        FlightWithoutId flightWithoutId = new FlightWithoutId("FN123", "JFK", "LAX", LocalDateTime.now(), LocalDateTime.now().plusHours(5), "T1");
        Flight expected = new Flight("abc", "FN123", "JFK", "LAX", LocalDateTime.now(), LocalDateTime.now().plusHours(5), "T1", null);
        //when
        when(flightRepo.findById("abc")).thenReturn(Optional.of(expected));
        when(flightRepo.save(expected)).thenReturn(expected);
        Flight actual = flightService.edit("abc", flightWithoutId);
        //then
        assertEquals(expected, actual);
        verify(flightRepo).findById("abc");
        verify(flightRepo).save(expected);
    }

    @Test
    void expectDeleteMethodToBeCalled_whenDeletingFlight() {
        //given
        String id = "abc";
        Flight expected = new Flight("abc", "FN123", "JFK", "LAX", LocalDateTime.now(), LocalDateTime.now().plusHours(5), "T1", null);
        //when
        when(flightRepo.findById(id)).thenReturn(Optional.of(expected));
        flightService.delete(id);
        //then
        verify(flightRepo).findById(id);
        verify(flightRepo).deleteById(id);
    }

    @Test
    void expectNoSuchFlightException_whenCalledWithNonExistent() {
        //GIVEN
        String id = "abc";
        NoSuchFlightException exception = new NoSuchFlightException(id);
        //WHEN
        when(flightRepo.findById(id)).thenThrow(exception);
        //THEN
        assertThrows(NoSuchFlightException.class, () -> flightService.getDetails(id));
        assertTrue(exception instanceof NoSuchFlightException);
    }
}
