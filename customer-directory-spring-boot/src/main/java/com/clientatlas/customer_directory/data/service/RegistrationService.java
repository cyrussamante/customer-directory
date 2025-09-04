package com.clientatlas.customer_directory.data.service;

import com.clientatlas.customer_directory.domain.registration.Registration;
import com.clientatlas.customer_directory.repository.RegistrationRepository;
import org.springframework.stereotype.Service;
import java.util.UUID;
import java.util.List;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;

    public RegistrationService(RegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    public Registration createRegistration(Registration registration) {
         return registrationRepository.save(registration);
    }

    public void deleteRegistrationById(UUID id) {
        registrationRepository.deleteById(id);
    }

    //might not need
    public Registration getRegistrationById(UUID id) {
        return registrationRepository.findById(id)
        .orElse(null);
    }

    public List<Registration> getAllRegistrationsForEvent(UUID eventId) {
        return registrationRepository.findAllByEventId(eventId);
    }

    public List<Registration> getAllRegistrationsByCustomer(UUID customerId) {
        return registrationRepository.findAllByCustomerId(customerId);
    }

}