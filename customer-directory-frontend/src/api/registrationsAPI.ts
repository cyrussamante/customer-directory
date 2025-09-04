import type { Registration } from '../types/appState';
import axios from 'axios';

export const getRegistrations = () => 
    axios.get<Registration[]>(`/api/registrations`,{
        withCredentials: true
    });

export const createRegistration = (data: any): Promise<any> =>
    axios.post('/api/registrations',
        JSON.stringify(data), {
        headers: { 
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

export const removeRegistration = (id: string): Promise<any> => 
    axios.delete(`/api/registrations/${id}`, {
        withCredentials: true
    });

export const getRegistrationsByEventId = (eventId: string) =>
    axios.get<Registration[]>(`/api/registrations/${eventId}`, {
        withCredentials: true
    });

export const getRegistrationsByCustomerId = (customerId: string) =>
    axios.get<Registration[]>(`/api/registrations/${customerId}`, {
        withCredentials: true
    });
