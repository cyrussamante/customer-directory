package com.clientatlas.customer_directory.domain.user;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name="users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

// CREATE TABLE users (
//    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//    user_name VARCHAR(255) NOT NULL,
//    email VARCHAR(255) NOT NULL UNIQUE,
//    password VARCHAR(255) NOT NULL,
//    user_role VARCHAR(50) NOT NULL
// );
//
// CREATE TABLE customers (
//    id UUID PRIMARY KEY,
//    age INT,
//    gender VARCHAR(50) DEFAULT 'NOT_SPECIFIED',
//    address VARCHAR(255),
//    image_url VARCHAR(255),
//    number_of_orders INT DEFAULT 0,
//    CONSTRAINT fk_customer_user FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
// );

// INSERT INTO users (user_name, email, password, user_role) VALUES
// ('Alice Johnson', 'alice.johnson@example.com', 'password123', 'CUSTOMER'),
// ('Bob Smith', 'bob.smith@example.com', 'securepass456', 'CUSTOMER'),
// ('Charlie Adams', 'charlie.brown@example.com', 'mypassword789', 'CUSTOMER'),
// ('Diana Prince', 'diana.prince@example.com', 'wonderwoman321', 'CUSTOMER'),
// ('Ethan Hunt', 'ethan.hunt@example.com', 'missionimpossible', 'CUSTOMER'),
// ('Fiona Gallagher', 'fiona.gallagher@example.com', 'shameless2025', 'CUSTOMER'),
// ('George Costanza', 'george.costanza@example.com', 'seinfeldfan', 'CUSTOMER'),
// ('Hannah Baker', 'hannah.baker@example.com', 'thirteenreasons', 'CUSTOMER'),
// ('Ian Malcolm', 'ian.malcolm@example.com', 'dinosaursrule', 'CUSTOMER'),
// ('Mr Smith', 'adam.smith@example.com', 'asdfghgfd', 'CUSTOMER'),
// ('Anushka', 'anushka.sharma@gmail.com', 'asdfghgf', 'CUSTOMER');

// INSERT INTO customers (id, age, gender, address, image_url, number_of_orders) VALUES
// ('4bc97fb2-265f-4809-a440-cc35f9ac8ee6', 28, 'female', '123 Maple St, Springfield, IL', '/images/customer-1.png', 5),
// ('21f7666e-2db6-4741-b034-cccaa1715743', 34, 'male', '456 Oak St, Metropolis, IL', '/images/customer-2.png', 12),
// ('5e41bf8f-0572-4eae-9606-685695e08446', 22, 'male', '789 Pine St, Gotham, NY', '/images/customer-3.png', 3),
// ('9209b9b9-48ad-4df7-a0d8-6ac5288486ec', 30, 'female', '321 Elm St, Themyscira, WA', '/images/customer-4.png', 8),
// ('ec535f0b-7491-43cd-a93f-5c7f75e4943c', 40, 'male', '654 Cedar St, Los Angeles, CA', '/images/customer-5.png', 15),
// ('b12ee42b-4659-45a9-b6b4-8f9f5380ef7b', 26, 'female', '987 Birch St, Chicago, IL', '/images/customer-6.png', 7),
// ('d8168e0e-acc5-4aaa-8e00-72d0e04d4aa6', 35, 'male', '135 Willow St, New York, NY', '/images/customer-7.png', 10),
// ('7fb1f93b-cfee-4948-8ebb-7322e60f4034', 19, 'female', '246 Spruce St, Liberty, MO', '/images/customer-8.png', 2),
// ('28077f65-337f-46ab-9f3c-fef9a4093909', 45, 'male', '369 Fir St, Isla Nublar, PR', '/images/customer-9.png', 6),
// ('4dfe46c3-6bf2-413a-b4d6-a5b7ba78d4d7', 23, 'male', '987 Birch St, Chicago, IL', '/images/customer-f70bd3ce-77e7-4de8-b593-a4bbead3e07e.png', 0),
// ('f500d889-9082-4c60-9621-3796f41113e7', 25, 'female', '123 Maple St, Springfield, IL', '/images/customer-9d92cda5-4ee1-434a-a646-f38dbd391aa2.png', 0);
