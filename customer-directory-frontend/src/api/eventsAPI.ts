import type { Event } from '../types/appState';
import axios from 'axios';
import { VITE_API_URL } from '../helpers/api';


export const getEvents = () =>
    axios.get<Event[]>(`${VITE_API_URL}/api/events`, {
        withCredentials: true
    });

    
export const createEvent = (eventData: any): Promise<any> =>
    axios.post(`${VITE_API_URL}/api/events`,
        JSON.stringify(eventData), {
        headers: { 
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

export const editEvent = (id: string, eventData: Event): Promise<any> =>
    axios.put(`${VITE_API_URL}/api/events/${id}`,
        JSON.stringify(eventData), {
        headers: { 
            'Content-Type': 'application/json',
        },
        withCredentials: true
        
    });

export const removeEvent = (id: string): Promise<any> =>
    axios.delete(`${VITE_API_URL}/api/events/${id}`, {
        withCredentials: true
    });
