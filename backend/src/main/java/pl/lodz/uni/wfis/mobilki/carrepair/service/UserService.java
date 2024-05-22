package pl.lodz.uni.wfis.mobilki.carrepair.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.lodz.uni.wfis.mobilki.carrepair.exception.RegistrationException;
import pl.lodz.uni.wfis.mobilki.carrepair.model.User;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.UserRepository;
import pl.lodz.uni.wfis.mobilki.carrepair.request.RegistrationRequest;

import java.util.List;
import java.util.Random;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    public User registerUser(RegistrationRequest request) throws RegistrationException {
        var user = new User();
        user.setWorkerCode(generateWorkerCode());
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(encodedPassword);
        user.setAuthority("USER");

        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RegistrationException("Error occurred while registering user");
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
