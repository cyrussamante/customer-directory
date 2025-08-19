import type { Event } from '../types/appState';
import axios from 'axios';

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