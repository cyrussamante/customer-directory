package com.clientatlas.customer_directory.domain.customer;

import com.clientatlas.customer_directory.domain.user.User;
import jakarta.persistence.*;

@Entity
@Table(name="customers")
@PrimaryKeyJoinColumn(name = "id")
public class Customer extends User {

    private int age;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CustomerGender gender = CustomerGender.NOT_SPECIFIED;

    private String address;

    @Column(name="image_url")
    private String imageUrl = "default-profile.png";

    @Column(name="number_of_orders", columnDefinition = "INT DEFAULT 0")
    private int numberOfOrders;
    
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

     public CustomerGender getGender() { 
        return gender; 
    }
    
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
}