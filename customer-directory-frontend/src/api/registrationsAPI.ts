import type { Registration } from '../types/appState';
import axios from 'axios';

export const getRegistrations = (token: string) => 
    axios.get<Registration[]>(`/api/registrations`,{
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    });

export const createRegistration = (data: any, token: string): Promise<any> =>
    axios.post('/api/registrations',
        JSON.stringify(data), {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

export const editRegistration = (id: string, data: Registration, token: string): Promise<any> =>
    axios.put(`/api/registrations/${id}`,
        JSON.stringify(data), {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

export const removeRegistration = (id: string, token: string): Promise<any> => 
    axios.delete(`/api/registrations/${id}`,{
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    });