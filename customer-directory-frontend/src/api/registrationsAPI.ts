import type { Registration } from '../types/appState';
import axios from 'axios';
import { VITE_API_URL } from '../helpers/api';

export const getRegistrations = () =>
    axios.get<Registration[]>(`${VITE_API_URL}/api/registrations`, {
        withCredentials: true
    });

export const createRegistration = (data: any): Promise<any> =>
    axios.post(`${VITE_API_URL}/api/registrations`,
        JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

export const removeRegistration = (id: string): Promise<any> =>
    axios.delete(`${VITE_API_URL}/api/registrations/${id}`, {
        withCredentials: true
    });

export const getRegistrationsByEventId = (eventId: string) =>
    axios.get<Registration[]>(`${VITE_API_URL}/api/registrations/event/${eventId}`, {
        withCredentials: true
    });

export const getRegistrationsByCustomerId = (customerId: string) =>
    axios.get<Registration[]>(`${VITE_API_URL}/api/registrations/customer/${customerId}`, {
        withCredentials: true
    });
