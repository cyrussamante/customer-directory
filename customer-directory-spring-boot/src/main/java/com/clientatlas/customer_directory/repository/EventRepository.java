package com.clientatlas.customer_directory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.clientatlas.customer_directory.domain.event.Event;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {}