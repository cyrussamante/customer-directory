package com.clientatlas.customer_directory.data.service;

import com.clientatlas.customer_directory.domain.user.User;
import com.clientatlas.customer_directory.domain.user.UserRole;
import com.clientatlas.customer_directory.repository.CustomerRepository;
import com.clientatlas.customer_directory.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomerRepository customerRepository;


    public UserService(UserRepository userRepository, CustomerRepository customerRepository , PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;

    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUser(UUID id) {
        return userRepository.findById(id);
    }

    public boolean deleteUser(UUID id) {
        return userRepository.findById(id).map(user -> {
            userRepository.delete(user);
            if (user.getRole() == UserRole.CUSTOMER) {
                customerRepository.findById(user.getId())
                        .ifPresent(customerRepository::delete);
            }
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

    public User putUser(UUID id, User updatedUser) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());

            String newPassword = updatedUser.getPassword();
            if (newPassword != null && !newPassword.isBlank() && !passwordEncoder.matches(newPassword, existingUser.getPassword())) {
                existingUser.setPassword(passwordEncoder.encode(newPassword));
            }

            existingUser.setRole(updatedUser.getRole());
            return userRepository.save(existingUser);
        }
        return null;
    }
}
