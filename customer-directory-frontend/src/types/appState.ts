export interface AppState {
    isLoggedIn: boolean
    user: User | null,
    customers: Customer[],
    events: Event[],
    registrations?: Registration[]
}

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    role: "admin" | "customer" | "employee"
    token: string
}

export interface Customer {
    id: string,
    name: string,
    age: number,
    gender: string,
    email: string,
    password: string,
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
    bannerImage?: string,
    description: string,
}

export interface Registration {
    id: string,
    eventId: string,
    dateRegistered: Date,
    customerId?: string,
}