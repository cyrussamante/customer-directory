export interface AppState {
    isLoggedIn: boolean
    user: User | Customer | null,
    customers: Customer[],
    events: Event[],
    registrations?: Registration[],
    users: User[],
}

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    role: "ADMIN" | "CUSTOMER" | "EMPLOYEE"
}

export interface Customer extends User {
    dateOfBirth: Date,
    gender: string,
    address: string,
    imageUrl?: string,
    numberOfOrders: number,
    registrations?: Registration[],
}

export interface Event {
    id: string,
    title: string,
    startDateTime: Date,
    endDateTime: Date,
    location: string,
    price?: number,
    description: string,
    capacity: number,   
    bannerImage?: string,
}

export interface Registration {
    id: string,
    eventId: string,
    dateRegistered: Date,
    customerId?: string,
}