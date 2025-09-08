package com.clientatlas.customer_directory.domain.customer;

import com.clientatlas.customer_directory.domain.user.User;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="customers")
@PrimaryKeyJoinColumn(name = "id")
public class Customer extends User {

    @Column(name="date_of_birth")
    private LocalDate dateOfBirth;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CustomerGender gender = CustomerGender.NOT_SPECIFIED;

    private String address;

    @Column(name="number_of_orders", columnDefinition = "INT DEFAULT 0")
    private int numberOfOrders;

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
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

    public int getNumberOfOrders() {
        return numberOfOrders;
    }

    public void setNumberOfOrders(int numberOfOrders) {
        this.numberOfOrders = numberOfOrders;
    } 
}