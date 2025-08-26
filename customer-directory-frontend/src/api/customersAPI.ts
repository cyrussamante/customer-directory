import type { Customer } from '../types/appState';
import axios from 'axios';

export const getCustomers = (token: String) => 
    axios.get<Customer[]>(`/api/customers`,{
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    });

export const createCustomer = (customerData: any, token: string): Promise<any> =>
    axios.post('/api/customers',
        JSON.stringify(customerData), {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

export const editCustomer = (id: string, customerData: Customer, token: string): Promise<any> =>
    axios.put(`/api/customers/${id}`,
        JSON.stringify(customerData), {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

export const removeCustomer = (id: string, token: string): Promise<any> => 
    axios.delete(`/api/customers/${id}`,{
    headers: {
            'Authorization': `Bearer ${token}`
        }
    });