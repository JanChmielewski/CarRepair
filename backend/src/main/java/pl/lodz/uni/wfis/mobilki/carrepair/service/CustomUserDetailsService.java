package pl.lodz.uni.wfis.mobilki.carrepair.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.lodz.uni.wfis.mobilki.carrepair.mappers.UserMapper;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.UserRepository;
import pl.lodz.uni.wfis.mobilki.carrepair.security.CustomUserDetails;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public CustomUserDetailsService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String workerCode) throws UsernameNotFoundException {
        return userRepository.findByWorkerCode(workerCode)
                .map(userMapper::toDTO)
                .map(CustomUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}