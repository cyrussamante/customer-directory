package com.clientatlas.customer_directory.data;

import org.springframework.web.bind.annotation.*;
import com.clientatlas.customer_directory.domain.User;
import com.clientatlas.customer_directory.repository.UserRepository;
import com.clientatlas.customer_directory.repository.CustomerRepository;
import java.util.List;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DataController {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    @GetMapping
    public Map<String, String> data() {
        return Collections.singletonMap("message", "data service is up and running!");
    }

    public DataController(UserRepository userRepository, CustomerRepository customerRepository) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    
}
