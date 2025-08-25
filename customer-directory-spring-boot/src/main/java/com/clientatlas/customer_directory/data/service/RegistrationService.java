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

    public Registration getRegistrationById(UUID id) {
        return registrationRepository.findById(id)
        .orElse(null);
    }

    public Registration createRegistration(Registration registration) {
         return registrationRepository.save(registration);
    }

    public void deleteRegistrationById(UUID id) {
        registrationRepository.deleteById(id);
    }

    public Registration updateRegistration(UUID id, Registration updatedRegistration) {
        Registration existingRegistration = registrationRepository.findById(id).orElse(null);
        if (existingRegistration != null) {
                existingRegistration.setEventId(updatedRegistration.getEventId());
                existingRegistration.setCustomerId(updatedRegistration.getCustomerId());
                existingRegistration.setDateRegistered(updatedRegistration.getDateRegistered());
                return registrationRepository.save(existingRegistration);
        }
        return null;
    }
}
