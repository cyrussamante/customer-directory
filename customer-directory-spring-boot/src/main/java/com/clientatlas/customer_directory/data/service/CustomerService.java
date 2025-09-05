package com.clientatlas.customer_directory.data.service;

import com.clientatlas.customer_directory.domain.customer.Customer;
import com.clientatlas.customer_directory.repository.CustomerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {
    
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerService(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(UUID id) {
        return customerRepository.findById(id)
        .orElse(null);
    }

   public Customer createCustomer(Customer customer) {
       customer.setPassword(passwordEncoder.encode(customer.getPassword()));
       return customerRepository.save(customer);
   }

    public void deleteCustomerById(UUID id) {
        customerRepository.deleteById(id);
    }

   public Customer updateCustomer(UUID id, Customer updatedCustomer) {
       Customer existingCustomer = customerRepository.findById(id).orElse(null);


       if (existingCustomer != null) {
              existingCustomer.setName(updatedCustomer.getName());
              existingCustomer.setEmail(updatedCustomer.getEmail());
              
              String newPassword = updatedCustomer.getPassword();

              if (newPassword != null && !newPassword.isBlank() && !passwordEncoder.matches(newPassword, existingCustomer.getPassword())) {
                  existingCustomer.setPassword(passwordEncoder.encode(newPassword));
              }

              existingCustomer.setRole(updatedCustomer.getRole());
              existingCustomer.setDateOfBirth(updatedCustomer.getDateOfBirth());
              existingCustomer.setImageUrl(updatedCustomer.getImageUrl());
              existingCustomer.setGender(updatedCustomer.getGender());
              existingCustomer.setAddress(updatedCustomer.getAddress());
              existingCustomer.setNumberOfOrders(updatedCustomer.getNumberOfOrders());
              return customerRepository.save(existingCustomer);
       }
       return null;
   }
}