import type { Event } from '../types/appState';
import axios from 'axios';

export const getEvents = () => 
    axios.get<Event[]>(`/api/events`,{
        withCredentials: true
    });

    
export const createEvent = (eventData: any): Promise<any> =>
    axios.post('/api/events',
        JSON.stringify(eventData), {
        headers: { 
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

export const editEvent = (id: string, eventData: Event): Promise<any> =>
    axios.put(`/api/events/${id}`,
        JSON.stringify(eventData), {
        headers: { 
            'Content-Type': 'application/json',
        },
        withCredentials: true
        
    });

export const removeEvent = (id: string): Promise<any> =>
    axios.delete(`/api/events/${id}`, {
        withCredentials: true
    });
