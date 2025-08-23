package com.clientatlas.customer_directory.data.service;

import com.clientatlas.customer_directory.domain.customer.Customer;
import com.clientatlas.customer_directory.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class DataService {
    
    private final CustomerRepository customerRepository;

    public DataService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(UUID id) {
        return customerRepository.findById(id)
        .orElse(null);
    }

   public Customer createCustomer(Customer customer) {
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
              existingCustomer.setPassword(updatedCustomer.getPassword());
              existingCustomer.setRole(updatedCustomer.getRole());
              existingCustomer.setAge(updatedCustomer.getAge());
              existingCustomer.setGender(updatedCustomer.getGender());
              existingCustomer.setAddress(updatedCustomer.getAddress());
              existingCustomer.setNumberOfOrders(updatedCustomer.getNumberOfOrders());
              return customerRepository.save(existingCustomer);
       }
       return null;
   }
}