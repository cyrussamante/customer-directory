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

export interface Customer extends User {
    age: number,
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