package pl.lodz.uni.wfis.mobilki.carrepair.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.UserRepository;

import java.util.Random;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String generateWorkerCode() {
        int workerCode;
        do {
            Random rnd = new Random();
            workerCode = rnd.nextInt(999999);
        } while (workerCodeExists(String.format("%06d", workerCode)));
        return String.format("%06d", workerCode);
    }

    public boolean workerCodeExists(String workerCode) {
        return userRepository.findByWorkerCode(workerCode).isPresent();
    }
}
