export default interface Customer {
    id: string,
    name: string,
    age: number,
    email: string,
    password: string,
    address: string,
    imageUrl?: string,
    numberOfOrders: number
}