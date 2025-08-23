package com.clientatlas.customer_directory.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;

import java.util.UUID;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name="user_name")
    private String name;

    private String email;

    private String password;

    @Column(name="user_role")
    @Enumerated(EnumType.STRING)
    private UserRole role;

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

//CREATE TABLE users (
//    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//    user_name VARCHAR(255) NOT NULL,
//    email VARCHAR(255) NOT NULL UNIQUE,
//    password VARCHAR(255) NOT NULL,
//    user_role VARCHAR(50) NOT NULL
//);
//
//CREATE TABLE customers (
//    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//    age INT NOT NULL,
//    gender VARCHAR(50) NOT NULL,
//    address TEXT NOT NULL,
//    image_url VARCHAR(255),
//    number_of_orders INT DEFAULT 0,
//    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE
//);