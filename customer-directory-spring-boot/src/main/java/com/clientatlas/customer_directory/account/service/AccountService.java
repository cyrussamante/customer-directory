package com.clientatlas.customer_directory.account.service;

import com.clientatlas.customer_directory.domain.customer.Customer;
import com.clientatlas.customer_directory.domain.user.User;
import com.clientatlas.customer_directory.domain.user.UserRole;
import com.clientatlas.customer_directory.repository.CustomerRepository;
import com.clientatlas.customer_directory.repository.UserRepository;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountService(UserRepository userRepository, CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new BadCredentialsException("Invalid email or password"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }
        return user;
    }

    public User registerUser(@Valid @RequestBody User newUser) {
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser.setRole(newUser.getRole() != null ? newUser.getRole() : UserRole.CUSTOMER);

        User user = userRepository.save(newUser);

        if (user.getRole() == UserRole.CUSTOMER) {
            Customer customer = new Customer();
            customer.setUser(user);
            customerRepository.save(customer);
        }

        return user;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUser(UUID id) {
        return userRepository.findById(id);
    }

    public boolean deleteUser(UUID id) {
        return userRepository.findById(id).map(user -> {

            if (user.getRole() == UserRole.CUSTOMER) {
                customerRepository.findByUserId(user.getId())
                        .ifPresent(customerRepository::delete);
            }

            userRepository.delete(user);
            return true;
        }).orElse(false);
    }

    public User patchUser(UUID id, Map<String, Object> updatedData) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) return null;

        User user = optionalUser.get();

        updatedData.forEach((key, value) -> {
            switch (key) {
                case "name" -> user.setName((String) value);
                case "email" -> user.setEmail((String) value);
                case "password" -> user.setPassword(passwordEncoder.encode((String) value));
                case "role" -> user.setRole(UserRole.valueOf((String) value));
            }
        });
        return userRepository.save(user);
    }
}
