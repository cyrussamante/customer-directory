package com.clientatlas.customer_directory.data.controller;
import com.clientatlas.customer_directory.data.service.DataService;
import org.springframework.web.bind.annotation.*;
import com.clientatlas.customer_directory.domain.customer.Customer;
import java.util.List;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class DataController {

    private final DataService customerService;

    public DataController(DataService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public Map<String, String> data() {
        return Collections.singletonMap("message", "data service is up and running!");
    }

    @GetMapping("/customers")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/customers/{id}")
    public Customer getCustomerById(@PathVariable UUID id) {
        return customerService.getCustomerById(id);
    }

   @PostMapping("/customers")
   public Customer createCustomer(@RequestBody Customer customer) {
       return customerService.createCustomer(customer);
   }

   @PutMapping("/customers/{id}")
   public Customer updateCustomer(@PathVariable UUID id, @RequestBody Customer customer) {
       return customerService.updateCustomer(id, customer);
   }

    @DeleteMapping("/customers/{id}")
    public void deleteCustomer(@PathVariable UUID id) {
        customerService.deleteCustomerById(id);
    }
    
}