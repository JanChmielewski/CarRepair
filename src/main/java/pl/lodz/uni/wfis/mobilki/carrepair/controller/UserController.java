package pl.lodz.uni.wfis.mobilki.carrepair.controller;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.uni.wfis.mobilki.carrepair.model.User;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.UserRepository;
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
    public String register(@RequestBody RegistrationRequest request) {
        var user = new User();
        user.setWorkerCode(userService.generateWorkerCode());
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAuthority("ROLE_USER");

        repository.save(user);

        StringBuilder registeredUser = new StringBuilder();

        registeredUser.append("User registered! \nWorker code: ")
                .append(user.getWorkerCode())
                .append("\nName: ").append(user.getName())
                .append("\nSurname: ").append(user.getSurname())
                .append("\nPassword: ").append(request.getPassword())
                .append("\nAuthority: ").append(user.getAuthority());

        return registeredUser.toString();
    }

    @GetMapping("/test")
    public String test() {
        return "Access granted!";
    }

}