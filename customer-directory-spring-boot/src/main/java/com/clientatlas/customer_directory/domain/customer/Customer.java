package com.clientatlas.customer_directory.domain.customer;

import com.clientatlas.customer_directory.domain.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;

import java.util.UUID;

@Entity
@Table(name="customers")
public class Customer extends User {

    @Id
    @GeneratedValue
    private UUID id;

    private int age;
    private String gender;
    private String address;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="number_of_orders")
    private int numberOfOrders;
    
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

// INSERT INTO users (name, email, password, role) VALUES
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

// INSERT INTO customers (id, age, gender, address, imageUrl, numberOfOrders) VALUES
// (1, 28, 'female', '123 Maple St, Springfield, IL', '/images/customer-1.png', 5),
// (2, 34, 'male', '456 Oak St, Metropolis, IL', '/images/customer-2.png', 12),
// (3, 22, 'male', '789 Pine St, Gotham, NY', '/images/customer-3.png', 3),
// (4, 30, 'female', '321 Elm St, Themyscira, WA', '/images/customer-4.png', 8),
// (5, 40, 'male', '654 Cedar St, Los Angeles, CA', '/images/customer-5.png', 15),
// (6, 26, 'female', '987 Birch St, Chicago, IL', '/images/customer-6.png', 7),
// (7, 35, 'male', '135 Willow St, New York, NY', '/images/customer-7.png', 10),
// (8, 19, 'female', '246 Spruce St, Liberty, MO', '/images/customer-8.png', 2),
// (9, 45, 'male', '369 Fir St, Isla Nublar, PR', '/images/customer-9.png', 6),
// (10, 23, 'male', '987 Birch St, Chicago, IL', '/images/customer-f70bd3ce-77e7-4de8-b593-a4bbead3e07e.png', 0),
// (11, 25, 'female', '123 Maple St, Springfield, IL', '/images/customer-9d92cda5-4ee1-434a-a646-f38dbd391aa2.png', 0);


// INSERT INTO events (title, startDateTime, enddatetime, location, price, description, capacity) VALUES
// ('Event Title 1', '2023-10-01T10:00:00Z', '2023-10-02T11:00:00Z', 'Toronto', 1, 'hello', 5),
// ('Event Title 2', '2023-10-02T11:00:00Z', '2023-10-02T11:00:00Z', 'Vancouver', 2, 'hello', 5),
// ('Event Title 3', '2023-10-03T12:00:00Z', '2023-10-02T11:00:00Z', 'Montreal', 3, 'hello', 5),
// ('Event Title 4', '2023-10-04T13:00:00Z', '2023-10-02T11:00:00Z', 'Quebec City', 3, 'hello', 5),
// ('Summer Music Festival', '2025-08-25T14:00:00Z',  '2025-10-02T11:00:00Z', 'Central Park, New York, NY', 50, 'Join us for a day of live music featuring top artists from various genres. Food trucks and local vendors will be present.', 5000),
// ('Tech Innovations Conference', '2025-09-10T09:00:00Z', '2023-10-02T11:00:00Z', 'Convention Center, San Francisco, CA', 200, 'Explore the latest in technology and innovation with industry leaders. Networking opportunities and workshops available.', 1000),
// ('Art in the Park', '2025-09-15T10:00:00Z',  '2023-10-02T11:00:00Z', 'Riverside Park, Chicago, IL', 20, 'A day dedicated to local artists showcasing their work. Enjoy live art demonstrations, food stalls, and family activities.', 3000),
// ('Culinary Delights Expo', '2025-10-05T11:00:00Z',  '2023-10-02T11:00:00Z','Downtown Expo Hall, Los Angeles, CA', 75, 'Taste your way through a variety of cuisines from around the world. Cooking demonstrations and celebrity chefs will be featured.', 2000),
// ('Outdoor Yoga Retreat', '2025-10-20T08:00:00Z',  '2023-10-02T11:00:00Z','Mountain View, Boulder, CO', 40, 'Reconnect with nature and yourself in this serene outdoor yoga session. Suitable for all levels.', 100);

// INSERT INTO registrations (eventId, dateRegistered, customerId) VALUES
// (1, '2023-09-01T10:00:00Z', 5),
// (1, '2023-09-02T11:00:00Z', 5),
// (2, '2023-09-03T12:00:00Z', 6),
// (2, '2023-09-04T13:00:00Z', 7),
// (3, '2023-09-05T14:00:00Z', 5),
// (3, '2023-09-06T15:00:00Z', 6),
// (4, '2023-09-07T16:00:00Z', 7),
// (5, '2025-08-20T14:00:00Z', 8),
// (6, '2025-09-05T09:00:00Z', 9),
// (7, '2025-09-15T10:00:00Z', 1);