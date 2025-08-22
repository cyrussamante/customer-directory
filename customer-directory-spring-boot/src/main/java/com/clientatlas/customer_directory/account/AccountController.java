package com.clientatlas.customer_directory.account;

import com.clientatlas.customer_directory.domain.User;
import com.clientatlas.customer_directory.domain.UserRole;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;


// TODO: REMOVE ONCE DB IS SETUP.
import java.util.ArrayList;
import java.util.List;

// TODO: SET UP FOR DB
//import com.clientatlas.customer_directory.repository.UserRepository;


@RestController
@RequestMapping("/account")
public class AccountController {

    private final List<User> users = new ArrayList<>(); // TODO: REMOVE ONCE DB IS SETUP.

    // TODO: SET UP FOR DB
//    private final UserRepository userRepository;
//
//    public AccountController(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }

    @GetMapping
    public Map<String, String> account() {
        return Collections.singletonMap("message", "account service is up and running!");
    }

    @GetMapping("/user")
    public User getUser() {
        User user = new User();
        user.setId("abc");
        user.setName("hello");
        user.setEmail("hello@gmail.com");
        user.setPassword("123456");
        user.setRole(UserRole.ADMIN);
        return user;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User newUser) {

        if (newUser.getName() == null || newUser.getEmail() == null|| newUser.getPassword() == null) {
            return ResponseEntity.badRequest().build();
        }

        newUser.setId(UUID.randomUUID().toString());
        System.out.println(newUser.getId());
        newUser.setRole(newUser.getRole() != null ? newUser.getRole() : UserRole.CUSTOMER);

        users.add(newUser); // TODO: REMOVE ONCE DB IS SETUP.
//        newUser = userRepository.save(newUser);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newUser.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return users;
    }
}
