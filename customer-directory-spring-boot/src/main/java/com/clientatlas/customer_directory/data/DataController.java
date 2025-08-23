package com.clientatlas.customer_directory.data;
import com.clientatlas.customer_directory.service.CustomerService;
import org.springframework.web.bind.annotation.*;
import com.clientatlas.customer_directory.domain.Customer;
import java.util.List;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DataController {

    private final CustomerService customerService;

    public DataController(CustomerService customerService) {
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
    public Customer getCustomerById(@PathVariable Integer id) {
        return customerService.getCustomerById(id);
    }

    @PostMapping("/customers")
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.createCustomer(customer);
    }
    
    @PutMapping("/customers/{id}") 
    public Customer updateCustomer(@PathVariable Integer id, @RequestBody Customer customer) {
        return customerService.updateCustomer(id, customer);
    }

    @DeleteMapping("/customers/{id}")
    public void deleteCustomer(@PathVariable Integer id) {
        customerService.deleteCustomerById(id);
    }
    
}
