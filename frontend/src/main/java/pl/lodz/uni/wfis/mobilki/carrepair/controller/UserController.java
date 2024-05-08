package pl.lodz.uni.wfis.mobilki.carrepair.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.uni.wfis.mobilki.carrepair.model.User;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.UserRepository;
import pl.lodz.uni.wfis.mobilki.carrepair.request.LoginRequest;
import pl.lodz.uni.wfis.mobilki.carrepair.request.RegistrationRequest;
import pl.lodz.uni.wfis.mobilki.carrepair.service.UserService;

@RestController
public class UserController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    public UserController(UserRepository repository, PasswordEncoder passwordEncoder, UserService userService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest request) {
        var user = new User();
        user.setWorkerCode(userService.generateWorkerCode());
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(encodedPassword);
        user.setAuthority("USER");

        repository.save(user);

        return ResponseEntity.ok("User registered! \nWorker code: " +
                user.getWorkerCode() +
                "\nName: " + user.getName() +
                "\nSurname: " + user.getSurname() +
                "\nPassword: " + encodedPassword +
                "\nAuthority: " + user.getAuthority());
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok("Logged in! \nWorker code: " + loginRequest.getWorkerCode());
    }

    @GetMapping("/test")
    public String test(Authentication authentication) {
        System.out.println(authentication);
        return "Access granted!";
    }
}