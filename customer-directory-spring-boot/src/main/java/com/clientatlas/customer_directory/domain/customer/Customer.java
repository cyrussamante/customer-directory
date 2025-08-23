package com.clientatlas.customer_directory.domain.customer;

import com.clientatlas.customer_directory.domain.user.User;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name="customers")
public class Customer {

    @Id
    @GeneratedValue
    private UUID id;

    private int age;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CustomerGender gender = CustomerGender.NOT_SPECIFIED;

    private String address;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="number_of_orders", nullable = false)
    private int numberOfOrders = 0;
    
    @OneToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public CustomerGender getGender() { return gender; }
    public void setGender(CustomerGender gender) {
        this.gender = gender;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public int getNumberOfOrders() {
        return numberOfOrders;
    }
    public void setNumberOfOrders(int numberOfOrders) {
        this.numberOfOrders = numberOfOrders;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

}

// CREATE TABLE events (
//     id SERIAL PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     startDateTime TIMESTAMP NOT NULL,
//     endDateTime TIMESTAMP NOT NULL,
//     location VARCHAR(255) NOT NULL,
//     price NUMERIC,
//     description TEXT NOT NULL,
//     capacity INT NOT NULL,
//     bannerImage VARCHAR(255)
// );

// CREATE TABLE registrations (
//     id SERIAL PRIMARY KEY,
//     eventId INT REFERENCES events(id),
//     customerId INT REFERENCES customers(id),
//     dateRegistered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
// );