package com.clientatlas.customer_directory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.clientatlas.customer_directory.domain.registration.Registration;
import java.util.UUID;
import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, UUID> {

    @Query("SELECT r.eventId, COUNT(r) FROM Registration r GROUP BY r.eventId")
    List<Object[]> countRegistrationsGroupedByEvent();

    @Query("SELECT r.customerId, COUNT(r) FROM Registration r GROUP BY r.customerId")
    List<Object[]> countRegistrationsGroupedByCustomer();
    
}