package pl.lodz.uni.wfis.mobilki.carrepair.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import pl.lodz.uni.wfis.mobilki.carrepair.exception.RegistrationException;
import pl.lodz.uni.wfis.mobilki.carrepair.model.User;
import pl.lodz.uni.wfis.mobilki.carrepair.request.LoginRequest;
import pl.lodz.uni.wfis.mobilki.carrepair.request.RegistrationRequest;
import pl.lodz.uni.wfis.mobilki.carrepair.security.CustomAuthenticationProvider;
import pl.lodz.uni.wfis.mobilki.carrepair.security.jwt.JwtUtil;
import pl.lodz.uni.wfis.mobilki.carrepair.service.UserService;

import java.util.Map;


@RestController
@RequestMapping("/api")
public class UserController {
    private final CustomAuthenticationProvider customAuthenticationProvider;
    private final UserService userService;
    private final JwtUtil jwtUtil;


    public UserController(CustomAuthenticationProvider customAuthenticationProvider, UserService userService, JwtUtil jwtUtil) {
        this.customAuthenticationProvider = customAuthenticationProvider;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
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
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = customAuthenticationProvider.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getWorkerCode(),
                            loginRequest.getPassword()
                    ));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            final String jwt = jwtUtil.generateToken(userDetails);

            Map<String, Object> response = Map.of(
                    "message", "User logged in successfully",
                    "token", jwt,
                    "workerCode", loginRequest.getWorkerCode()
            );
            System.out.println(jwt);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
        catch (Exception e) {
            throw new RuntimeException("Run into the error while authenticating user: \n" + e);
        }
    }

    @GetMapping("users")
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/test")
    public String test(Authentication authentication) {
        System.out.println(authentication);
        return "Access granted!";
    }
}