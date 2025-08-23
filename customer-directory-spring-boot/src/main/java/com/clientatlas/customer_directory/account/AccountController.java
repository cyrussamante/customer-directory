package com.clientatlas.customer_directory.account;

import com.clientatlas.customer_directory.domain.User;
import com.clientatlas.customer_directory.domain.UserRole;
import com.clientatlas.customer_directory.repository.UserRepository;
import com.clientatlas.customer_directory.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.Map;
import java.util.List;



@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    TokenService tokenService;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/token")
    public String token(Authentication authentication) {
        return tokenService.generateToken(authentication);
    }

    @GetMapping
    public Map<String, String> account() {
        return Collections.singletonMap("message", "account service is up and running!");
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User newUser) {

        if (newUser.getName() == null || newUser.getEmail() == null|| newUser.getPassword() == null) {
            return ResponseEntity.badRequest().build();
        }

        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser.setRole(newUser.getRole() != null ? newUser.getRole() : UserRole.CUSTOMER);

        newUser = userRepository.save(newUser);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newUser.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
