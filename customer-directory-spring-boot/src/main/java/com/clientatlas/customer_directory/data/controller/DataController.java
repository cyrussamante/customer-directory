package com.clientatlas.customer_directory.data.controller;
import com.clientatlas.customer_directory.data.service.CustomerService;
import com.clientatlas.customer_directory.data.service.EventService;
import com.clientatlas.customer_directory.data.service.RegistrationService;

import org.springframework.web.bind.annotation.*;
import com.clientatlas.customer_directory.domain.customer.Customer;
import com.clientatlas.customer_directory.domain.event.Event;
import com.clientatlas.customer_directory.domain.registration.Registration;
import java.util.List;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class DataController {

    private final CustomerService customerService;
    private final EventService eventService;
    private final RegistrationService registrationService;

    public DataController(CustomerService customerService, EventService eventService, RegistrationService registrationService) {
        this.customerService = customerService;
        this.eventService = eventService;
        this.registrationService = registrationService;
    }

    @GetMapping
    public Map<String, String> data() {
        return Collections.singletonMap("message", "data service is up and running!");
    }


    //customer endpoints

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

    //events endpoints

    @GetMapping("/events")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/events/{id}")
    public Event getEventById(@PathVariable UUID id) {
        return eventService.getEventById(id);
    }

    @PostMapping("/events")
    public Event createEvent(@RequestBody Event event) {
        return eventService.createEvent(event);
    }

    @PutMapping("/events/{id}")
    public Event updateEvent(@PathVariable UUID id, @RequestBody Event event) {
        return eventService.updateEvent(id, event);
    }

    @DeleteMapping("/events/{id}")
    public void deleteEvent(@PathVariable UUID id) {
        eventService.deleteEventById(id);
    } 

    //registrations endpoints
    @GetMapping("/registrations")
    public List<Registration> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }

    @GetMapping("/registrations/{id}")
    public Registration getRegistrationById(@PathVariable UUID id) {
        return registrationService.getRegistrationById(id);
    }

    @PostMapping("/registrations")
    public Registration createRegistration(@RequestBody Registration registration) {
        return registrationService.createRegistration(registration);
    }

    @PutMapping("/registrations/{id}")
    public Registration updateRegistration(@PathVariable UUID id, @RequestBody Registration registration) {
        return registrationService.updateRegistration(id, registration);
    }

    @DeleteMapping("/registrations/{id}")
    public void deleteRegistration(@PathVariable UUID id) {
        registrationService.deleteRegistrationById(id);
    }

    //aaditional registration endpoints
    @GetMapping("/registrations/grouped-by-event")
    public List<Object[]> getRegistrationsGroupedByEvent() {
        return registrationService.getRegistrationsGroupedByEvent();
    }

    @GetMapping("/registrations/grouped-by-customer")
    public List<Object[]> getRegistrationsGroupedByCustomer() {
        return registrationService.getRegistrationsGroupedByCustomer();
    }
    
}