package com.clientatlas.customer_directory.data.controller;

import com.clientatlas.customer_directory.data.service.RegistrationService;
import com.clientatlas.customer_directory.domain.registration.Registration;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }

    @PostMapping
    public Registration createRegistration(@RequestBody Registration registration) {
        return registrationService.createRegistration(registration);
    }

    @DeleteMapping("/{id}")
    public void deleteRegistration(@PathVariable UUID id) {
        registrationService.deleteRegistrationById(id);
    }

    //additional registration endpoints
    
    @GetMapping("/{id}")
    public Registration getRegistrationById(@PathVariable UUID id) {
        return registrationService.getRegistrationById(id);
    }

    @GetMapping("/event/{eventId}")
    public List<Registration> getRegistrationsByEventId(@PathVariable UUID eventId) {
        return registrationService.getAllRegistrationsForEvent(eventId);
    }

    @GetMapping("/customer/{customerId}")
    public List<Registration> getRegistrationsByCustomerId(@PathVariable UUID customerId) {
        return registrationService.getAllRegistrationsByCustomer(customerId);
    }

}
