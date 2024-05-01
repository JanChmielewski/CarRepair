package pl.lodz.uni.wfis.mobilki.carrepair.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.UserDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.mappers.UserMapper;
import pl.lodz.uni.wfis.mobilki.carrepair.model.User;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.UserRepository;

@RestController
public class UserController {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserController(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(userMapper.toDTO(savedUser));
    }

}
