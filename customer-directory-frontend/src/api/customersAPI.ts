
import type { Customer } from '../types/appState';
import axios from 'axios';
import { VITE_API_URL } from '../helpers/api';
import { authHeader } from '../helpers/function';


export const getCustomers = () =>
    axios.get<Customer[]>(`${VITE_API_URL}/api/customers`, {
        headers: { ...authHeader() }
    });

export const createCustomer = (customerData: any): Promise<any> =>
    axios.post(`${VITE_API_URL}/api/customers`,
        JSON.stringify(customerData), {
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        }
    });

export const editCustomer = (id: string, customerData: Customer): Promise<any> =>
    axios.put(`${VITE_API_URL}/api/customers/${id}`,
        JSON.stringify(customerData), {
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        }
    });

export const removeCustomer = (id: string): Promise<any> =>
    axios.delete(`${VITE_API_URL}/api/customers/${id}`, {
        headers: { ...authHeader() }
    });