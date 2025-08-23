package com.clientatlas.customer_directory.data.service;

import com.clientatlas.customer_directory.domain.customer.Customer;
import com.clientatlas.customer_directory.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataService {

    private final CustomerRepository customerRepository;

    public DataService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
}
