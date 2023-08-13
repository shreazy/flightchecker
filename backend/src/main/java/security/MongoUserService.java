package security;

import org.springframework.stereotype.Service;

@Service
public class MongoUserService {

    private final MongoUserRepository mongoUserRepository;

    public MongoUserService(MongoUserRepository userRepository) {
        this.mongoUserRepository = userRepository;
    }

    public MongoUser getUserByUsername(String username) {
        return this.mongoUserRepository.findByUsername(username).orElseThrow();
    }
}