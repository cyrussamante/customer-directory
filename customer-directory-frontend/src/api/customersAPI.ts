
import type Customer from "../types/customer";
import  axios from 'axios';

// export async function getCustomers(): Promise<Customer[]> {

//     const res = await fetch('/api/customers');

//     if (!res.ok) {
//         throw new Error(`Unable to get customers: {res.status}`);
//     }

//     return res.json();
// }

export const getCustomers = () => axios.get<Customer[]>('/api/customers');

export async function createCustomer(customer: Omit<Customer, "id"| "imageUrl">): Promise<Customer> {

try {
    const response = await fetch('api/customers', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(customer)
      });

      return response.json();
}

catch {
    throw new Error('Unable to add customer');
}


  

  
}