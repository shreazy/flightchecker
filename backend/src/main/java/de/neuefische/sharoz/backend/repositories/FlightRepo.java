package de.neuefische.sharoz.backend.repositories;

import de.neuefische.sharoz.backend.models.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightRepo extends MongoRepository<Flight, String> {
}
