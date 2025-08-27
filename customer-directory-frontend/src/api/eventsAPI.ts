import type { Event } from '../types/appState';
import axios from 'axios';

export const getEvents = (token: string) => 
    axios.get<Event[]>(`/api/events`,{
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    });

    
export const createEvent = (eventData: any, token: string): Promise<any> =>
    axios.post('/api/events/',
        JSON.stringify(eventData), {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

export const editEvent = (id: string, eventData: Event, token: string): Promise<any> =>
    axios.put(`/api/events/${id}`,
        JSON.stringify(eventData), {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

export const removeEvent = (id: string, token: string): Promise<any> => 
    axios.delete(`/api/events/${id}`,{
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    });
