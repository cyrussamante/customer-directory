package com.clientatlas.customer_directory.data.service;

import com.clientatlas.customer_directory.domain.registration.Registration;
import com.clientatlas.customer_directory.repository.RegistrationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    public List<Registration> createBulkRegistrations(List<Registration> registrations) {
        return registrationRepository.saveAll(registrations);
    }

    @Transactional
    public void removeBulkRegistrations(List<UUID> registrationIds) {
        registrationRepository.deleteAllByIdIn(registrationIds);
    }

}