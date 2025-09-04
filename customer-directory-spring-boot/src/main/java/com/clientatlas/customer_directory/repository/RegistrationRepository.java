package com.clientatlas.customer_directory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.clientatlas.customer_directory.domain.registration.Registration;
import java.util.UUID;
import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, UUID> {

    List<Registration> findAllByEventId(UUID eventId);
    List<Registration> findAllByCustomerId(UUID customerId);
    
}