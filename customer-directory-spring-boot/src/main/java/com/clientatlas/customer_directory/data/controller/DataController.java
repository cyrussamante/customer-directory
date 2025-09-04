package com.clientatlas.customer_directory.data.controller;
import com.clientatlas.customer_directory.data.service.CustomerService;
import com.clientatlas.customer_directory.data.service.EventService;
import com.clientatlas.customer_directory.data.service.RegistrationService;

import com.clientatlas.customer_directory.data.service.UserService;
import com.clientatlas.customer_directory.domain.user.User;
import org.springframework.http.ResponseEntity;
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
    private final UserService userService;

    public DataController(CustomerService customerService, EventService eventService, RegistrationService registrationService, UserService userService) {
        this.customerService = customerService;
        this.eventService = eventService;
        this.registrationService = registrationService;
        this.userService = userService;
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

    @PostMapping("/registrations")
    public Registration createRegistration(@RequestBody Registration registration) {
        return registrationService.createRegistration(registration);
    }

    @DeleteMapping("/registrations/{id}")
    public void deleteRegistration(@PathVariable UUID id) {
        registrationService.deleteRegistrationById(id);
    }

    //additional registration endpoints 

    @GetMapping("/registrations/{id}")
    public Registration getRegistrationById(@PathVariable UUID id) {
        return registrationService.getRegistrationById(id);
    }

    @GetMapping("/registrations/{eventId}")
    public List<Registration> getRegistrationsByEventId(@PathVariable UUID eventId) {
        return registrationService.getAllRegistrationsForEvent(eventId);
    }

    @GetMapping("/registrations/{customerId}")
    public List<Registration> getRegistrationsByCustomerId(@PathVariable UUID customerId) {
        return registrationService.getAllRegistrationsByCustomer(customerId);
    }

    // user endpoints
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable UUID id) {
        return userService.getUser(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound()
                        .build());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        boolean deleted = userService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<User> patchUser(@PathVariable UUID id, @RequestBody Map<String, Object> updatedData) {
        User updatedUser = userService.patchUser(id, updatedData);
        return updatedUser == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable UUID id, @RequestBody User user) {
        return userService.putUser(id, user);
    }

}