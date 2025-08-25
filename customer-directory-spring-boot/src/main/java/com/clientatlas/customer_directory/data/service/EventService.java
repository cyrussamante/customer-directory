package com.clientatlas.customer_directory.data.service;

import com.clientatlas.customer_directory.domain.event.Event;
import com.clientatlas.customer_directory.repository.EventRepository;
import org.springframework.stereotype.Service;
import java.util.UUID;
import java.util.List;

@Service
public class EventService {
    
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(UUID id) {
        return eventRepository.findById(id)
        .orElse(null);
    }

    public Event createEvent(Event event) {
         return eventRepository.save(event);
    }

    public void deleteEventById(UUID id) {
        eventRepository.deleteById(id);
    }

    public Event updateEvent(UUID id, Event updatedEvent) {
        Event existingEvent = eventRepository.findById(id).orElse(null);
        if (existingEvent != null) {
                existingEvent.setTitle(updatedEvent.getTitle());
                existingEvent.setStartDateTime(updatedEvent.getStartDateTime());
                existingEvent.setEndDateTime(updatedEvent.getEndDateTime());
                existingEvent.setLocation(updatedEvent.getLocation());
                existingEvent.setPrice(updatedEvent.getPrice());
                existingEvent.setDescription(updatedEvent.getDescription());
                existingEvent.setCapacity(updatedEvent.getCapacity());
                existingEvent.setBannerImage(updatedEvent.getBannerImage());
                return eventRepository.save(existingEvent);
        }
        return null;
    }
    
}
