import axios from 'axios';
import type { User } from '../types/appState';
import { VITE_API_URL } from '../helpers/api';

export const editUser = (id: string, userData: User): Promise<any> =>
    axios.put(`${VITE_API_URL}/api/users/${id}`,
        JSON.stringify(userData), {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });

export const getUsers = () =>
    axios.get<User[]>(`${VITE_API_URL}/api/users`, {
        withCredentials: true
    });

export const removeUser = (id: string): Promise<any> =>
    axios.delete(`${VITE_API_URL}/api/users/${id}`, {
        withCredentials: true
    });