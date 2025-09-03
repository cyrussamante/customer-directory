import type { Customer } from '../types/appState';
import axios from 'axios';

export const getCustomers = () =>
    axios.get<Customer[]>(`/api/customers`, {
        withCredentials: true
    });

export const createCustomer = (customerData: any): Promise<any> =>
    axios.post('/api/customers',
        JSON.stringify(customerData), {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true

    })

export const editCustomer = (id: string, customerData: Customer): Promise<any> =>
    axios.put(`/api/customers/${id}`,
        JSON.stringify(customerData), {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

export const removeCustomer = (id: string): Promise<any> =>
    axios.delete(`/api/customers/${id}`, {
        withCredentials: true
    });