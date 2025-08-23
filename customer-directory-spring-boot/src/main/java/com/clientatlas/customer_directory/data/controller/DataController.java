package com.clientatlas.customer_directory.data.controller;

import com.clientatlas.customer_directory.data.service.DataService;
import com.clientatlas.customer_directory.domain.customer.Customer;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DataController {

    private final DataService dataService;

    @GetMapping
    public Map<String, String> data() {
        return Collections.singletonMap("message", "data service is up and running!");
    }

    public DataController(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping("/customers")
    public List<Customer> getCustomers() {
        return dataService.getAllCustomers();
    }
    
}
