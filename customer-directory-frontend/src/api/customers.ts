
import type Customer from "../types/customer";

export async function getCustomers(): Promise<Customer[]> {

    const res = await fetch('/api/customers');

    if (!res.ok) {
        throw new Error(`Unable to get customers: {res.status}`);
    }

    return res.json();
}