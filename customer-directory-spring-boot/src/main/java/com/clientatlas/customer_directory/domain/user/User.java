package com.clientatlas.customer_directory.domain.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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

    @Column(name="user_name", nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
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
//        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//user_name VARCHAR(255) NOT NULL,
//email VARCHAR(255) NOT NULL UNIQUE,
//password VARCHAR(255) NOT NULL,
//user_role VARCHAR(50) NOT NULL DEFAULT 'CUSTOMER'
//        );
//
//CREATE TABLE customers (
//        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//age INT,
//gender VARCHAR(50) NOT NULL DEFAULT 'NOT_SPECIFIED',
//address VARCHAR(255),
//image_url VARCHAR(512),
//number_of_orders INT NOT NULL DEFAULT 0,
//user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE
//);