package com.clientatlas.customer_directory.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.clientatlas.customer_directory.domain.Customer;
import com.clientatlas.customer_directory.domain.User;
import com.clientatlas.customer_directory.repository.CustomerRepository;
import com.clientatlas.customer_directory.repository.UserRepository;

@Service
public class CustomerService {
    
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    public CustomerService(CustomerRepository customerRepository, UserRepository userRepository) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(int id) {
        return customerRepository.findById(id)
        .orElse(null);
    }

    public Customer createCustomer(Customer customer) {
        // Create and save the User first
        User user = new User();
        user.setName(customer.getName());
        user.setEmail(customer.getEmail());
        user.setPassword(customer.getPassword());
        user.setRole(customer.getRole());
        User savedUser = userRepository.save(user);
        // Link the user to the customer
        customer.setUser(savedUser);
        customer.setId(savedUser.getId());
        // return customerRepository.save(customer);
    }

    public void deleteCustomerById(int id) {
        customerRepository.deleteById(id);
    }

    public Customer updateCustomer(int id, Customer updatedCustomer) {
        Customer existingCustomer = customerRepository.findById(id).orElse(null);
        if (existingCustomer != null) {
            // Update associated User fields
            if (existingCustomer.getUser() != null) {
                existingCustomer.getUser().setName(updatedCustomer.getName());
                existingCustomer.getUser().setEmail(updatedCustomer.getEmail());
                existingCustomer.getUser().setPassword(updatedCustomer.getPassword());
                existingCustomer.getUser().setRole(updatedCustomer.getRole());
                userRepository.save(existingCustomer.getUser());
            }
            // Update Customer fields
            existingCustomer.setAge(updatedCustomer.getAge());
            existingCustomer.setGender(updatedCustomer.getGender());
            existingCustomer.setAddress(updatedCustomer.getAddress());
            existingCustomer.setImageUrl(updatedCustomer.getImageUrl());
            existingCustomer.setNumberOfOrders(updatedCustomer.getNumberOfOrders());
            return customerRepository.save(existingCustomer);
        }
        return null;
    }
}
