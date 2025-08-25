package com.clientatlas.customer_directory.domain.event;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name="events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;

    @Column(name="start_date_time")
    private String startDateTime;

    @Column(name="end_date_time")
    private String endDateTime;

    private String location;
    private Double price;

    @Column(columnDefinition = "TEXT")
    private String description;

    private int capacity;

    @Column(name="banner_image")
    private String bannerImage;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(String startDateTime) {
        this.startDateTime = startDateTime;
    }

    public String getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(String endDateTime) {
        this.endDateTime = endDateTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getBannerImage() {
        return bannerImage;
    }

    public void setBannerImage(String bannerImage) {
        this.bannerImage = bannerImage;
    }

}

// CREATE TABLE events (
//     id UUID PRIMARY KEY,
//     title VARCHAR(255),
//     start_date_time TIMESTAMP,
//     end_date_time TIMESTAMP,
//     location VARCHAR(255),
//     price NUMERIC,
//     description TEXT,
//     capacity INT,
//     banner_image VARCHAR(255)
// );

// CREATE TABLE registrations (
//     id UUID PRIMARY KEY,
//     event_id UUID REFERENCES events(id),
//     customer_id UUID REFERENCES customers(id),
//     date_registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );