import axios from 'axios';
import type { User } from '../types/appState';

export const editUser = (id: string, userData: User): Promise<any> =>
    axios.put(`/api/users/${id}`,
        JSON.stringify(userData), {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });

export const getUsers = () =>
    axios.get<User[]>(`/api/users`, {
        withCredentials: true
    });

export const removeUser = (id: string): Promise<any> =>
    axios.delete(`/api/users/${id}`, {
        withCredentials: true
    });