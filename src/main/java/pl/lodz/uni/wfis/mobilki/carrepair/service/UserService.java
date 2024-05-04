package pl.lodz.uni.wfis.mobilki.carrepair.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.lodz.uni.wfis.mobilki.carrepair.mappers.UserMapper;
import pl.lodz.uni.wfis.mobilki.carrepair.model.User;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.UserRepository;
import pl.lodz.uni.wfis.mobilki.carrepair.security.AppUserAdapter;

import java.util.Random;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }



    public UserDetails loadUserByUsername(String workerCode) throws UsernameNotFoundException {
        User user = userRepository
                .findByWorkerCode(workerCode)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new AppUserAdapter(user);
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
