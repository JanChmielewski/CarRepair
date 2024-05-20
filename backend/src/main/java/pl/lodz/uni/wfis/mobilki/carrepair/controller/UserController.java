package pl.lodz.uni.wfis.mobilki.carrepair.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.lodz.uni.wfis.mobilki.carrepair.exception.RegistrationException;
import pl.lodz.uni.wfis.mobilki.carrepair.model.User;
import pl.lodz.uni.wfis.mobilki.carrepair.request.LoginRequest;
import pl.lodz.uni.wfis.mobilki.carrepair.request.RegistrationRequest;
import pl.lodz.uni.wfis.mobilki.carrepair.security.CustomAuthenticationProvider;
import pl.lodz.uni.wfis.mobilki.carrepair.service.UserService;


@RestController
public class UserController {
    private final CustomAuthenticationProvider customAuthenticationProvider;
    private final UserService userService;

    public UserController(CustomAuthenticationProvider customAuthenticationProvider, UserService userService) {
        this.customAuthenticationProvider = customAuthenticationProvider;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest request) {
        try {
            User user = userService.registerUser(request);
            return ResponseEntity.ok("User registered! \nWorker code: " +
                    user.getWorkerCode() +
                    "\nName: " + user.getName() +
                    "\nSurname: " + user.getSurname() +
                    "\nPassword: " + user.getPassword() +
                    "\nAuthority: " + user.getAuthority()
            );

        } catch (RegistrationException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        System.out.println("Received login request with worker code: " + loginRequest.getWorkerCode() + " and password: " + loginRequest.getPassword());
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