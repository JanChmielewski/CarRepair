package pl.lodz.uni.wfis.mobilki.carrepair.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.lodz.uni.wfis.mobilki.carrepair.model.User;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.UserRepository;
import pl.lodz.uni.wfis.mobilki.carrepair.request.LoginRequest;
import pl.lodz.uni.wfis.mobilki.carrepair.request.RegistrationRequest;
import pl.lodz.uni.wfis.mobilki.carrepair.security.CustomAuthenticationProvider;
import pl.lodz.uni.wfis.mobilki.carrepair.service.UserService;


@RestController
public class UserController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final CustomAuthenticationProvider customAuthenticationProvider;

    public UserController(UserRepository repository, PasswordEncoder passwordEncoder, UserService userService, CustomAuthenticationProvider customAuthenticationProvider) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.customAuthenticationProvider = customAuthenticationProvider;
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

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        System.out.println("Recived login request with worker code: " + loginRequest.getWorkerCode() + " and password: " + loginRequest.getPassword());
        Authentication authentication = customAuthenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getWorkerCode(),
                        loginRequest.getPassword()
                )
        );

        if (authentication == null) {
            System.out.println("Authentication failed for workerCode: " + loginRequest.getWorkerCode());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        request.getSession();


        return ResponseEntity.ok("Logged in!");
    }

    @GetMapping("/test")
    public String test(Authentication authentication) {
        System.out.println(authentication);
        return "Access granted!";
    }
}