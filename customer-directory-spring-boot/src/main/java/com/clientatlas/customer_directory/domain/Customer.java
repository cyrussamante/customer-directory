package com.clientatlas.customer_directory.domain;

import jakarta.persistence.*;

@Entity
@Table(name="customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int age;
    private String gender;
    private String address;

    @Column(name="imageurl")
    private String imageUrl;

    @Column(name="numberoforders")
    private int numberOfOrders;
    
    @OneToOne
    @JoinColumn(name="userid", referencedColumnName = "id")
    private User user;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String getGender() { return gender; }
    public void setGender(String gender) {
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


// CREATE TABLE customers (
//     id SERIAL PRIMARY KEY,
//     age INT NOT NULL,
//     gender VARCHAR(50) NOT NULL,
//     address TEXT NOT NULL,
//     imageUrl VARCHAR(255),
//     numberOfOrders INT DEFAULT 0,
//     userId INT REFERENCES users(id) ON DELETE CASCADE
// );

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