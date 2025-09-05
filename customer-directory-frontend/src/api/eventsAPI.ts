
import type { Event } from '../types/appState';
import axios from 'axios';
import { VITE_API_URL } from '../helpers/api';
import { authHeader } from '../helpers/function';

export const getEvents = () =>
    axios.get<Event[]>(`${VITE_API_URL}/api/events`, {
        headers: { ...authHeader() }
    });

    
export const createEvent = (eventData: any): Promise<any> =>
    axios.post(`${VITE_API_URL}/api/events`,
        JSON.stringify(eventData), {
        headers: { 
            'Content-Type': 'application/json',
            ...authHeader()
        }
    });

export const editEvent = (id: string, eventData: Event): Promise<any> =>
    axios.put(`${VITE_API_URL}/api/events/${id}`,
        JSON.stringify(eventData), {
        headers: { 
            'Content-Type': 'application/json',
            ...authHeader()
        }
    });

export const removeEvent = (id: string): Promise<any> =>
    axios.delete(`${VITE_API_URL}/api/events/${id}`, {
        headers: { ...authHeader() }
    });
