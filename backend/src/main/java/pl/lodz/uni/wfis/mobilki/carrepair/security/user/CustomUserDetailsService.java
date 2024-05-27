package pl.lodz.uni.wfis.mobilki.carrepair.security.user;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.UserDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.mappers.UserMapper;
import pl.lodz.uni.wfis.mobilki.carrepair.model.User;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.UserRepository;

import java.util.Optional;

public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByWorkerCode(username);
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException("User not found with worker code: " + username);
        }
        User user = userOptional.get();
        UserMapper userMapper = new UserMapper();
        UserDTO userDTO = userMapper.toDTO(user);
        return new CustomUserDetails(userDTO);
    }
}