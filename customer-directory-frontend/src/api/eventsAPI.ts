import type { Event } from '../types/appState';
import axios from 'axios';

const rootUrl = `https://customerdirectory-1.onrender.com`
export const getEvents = () => axios.get<Event[]>(`/api/events`);


export const createEvent = (eventData: any): Promise<Event> =>
    axios.post('/api/events/',
        JSON.stringify(eventData), {
        headers: { 'Content-Type': 'application/json' }
    })

export const editEvent = (id: string, eventData: Event): Promise<any> =>
    axios.put(`/api/events/${id}`,
        JSON.stringify(eventData), {
        headers: { 'Content-Type': 'application/json' }
    });

export const removeEvent = (id: string): Promise<any> => axios.delete(`/api/events/${id}`);

export const login = (credentials: any): Promise<any> =>
    
    axios.post('/api/login',
        JSON.stringify(credentials), {
        headers: { 'Content-Type': 'application/json' }
    })
