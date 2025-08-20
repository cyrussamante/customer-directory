import type { Customer } from '../types/appState';
import axios from 'axios';

const rootUrl = `https://customerdirectory-1.onrender.com`
export const getCustomers = () => axios.get<Customer[]>(`/api/customers`);

export const getCustomerInfo = (id: string): Promise<any> =>
    axios.get<Customer>(`/api/customers/${id}`);

export const createCustomer = (customerData: any): Promise<any> =>
    axios.post('/api/customers/',
        JSON.stringify(customerData), {
        headers: { 'Content-Type': 'application/json' }
    })

export const editCustomer = (id: string, customerData: Customer): Promise<any> =>
    axios.put(`/api/customers/${id}`,
        JSON.stringify(customerData), {
        headers: { 'Content-Type': 'application/json' }
    });

export const removeCustomer = (id: string): Promise<any> => axios.delete(`/api/customers/${id}`);