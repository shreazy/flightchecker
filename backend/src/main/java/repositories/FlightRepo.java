package repositories;

import models.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightRepo extends MongoRepository<Flight, String> {
}
