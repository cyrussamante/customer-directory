package com.clientatlas.customer_directory.data.controller;

import com.clientatlas.customer_directory.data.service.RegistrationService;
import com.clientatlas.customer_directory.domain.registration.Registration;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
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

    @PostMapping("/bulkAdd")
    public List<Registration> createBulkRegistrations(@RequestBody List<Registration> registrations) {
        return registrationService.createBulkRegistrations(registrations);
    }

    @DeleteMapping("/bulkRemove")
    public void removeBulkRegistrations(@RequestBody Map<String, List<UUID>> body) {
        List<UUID> ids = body.get("registrationIds");
        registrationService.removeBulkRegistrations(ids);
    }

}
