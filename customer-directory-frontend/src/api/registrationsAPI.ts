
import type { Registration } from '../types/appState';
import axios from 'axios';
import { VITE_API_URL } from '../helpers/api';
import { authHeader } from '../helpers/function';


export const getRegistrations = () =>
    axios.get<Registration[]>(`${VITE_API_URL}/api/registrations`, {
        headers: { ...authHeader() }
    });

export const createRegistration = (data: any): Promise<any> =>
    axios.post(`${VITE_API_URL}/api/registrations`,
        JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        }
    });

export const removeRegistration = (id: string): Promise<any> =>
    axios.delete(`${VITE_API_URL}/api/registrations/${id}`, {
        headers: { ...authHeader() }
    });

export const getRegistrationsByEventId = (eventId: string) =>
    axios.get<Registration[]>(`${VITE_API_URL}/api/registrations/event/${eventId}`, {
        headers: { ...authHeader() }
    });

export const getRegistrationsByCustomerId = (customerId: string) =>
    axios.get<Registration[]>(`${VITE_API_URL}/api/registrations/customer/${customerId}`, {
        headers: { ...authHeader() }
    });
