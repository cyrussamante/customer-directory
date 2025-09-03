import axios from 'axios';
import type { User } from '../types/appState';

export const register = (userData: any): Promise<any> =>

    axios.post('/account/register',
        JSON.stringify(userData), {
        headers: { 'Content-Type': 'application/json' }
    })

export const login = (credentials: any): Promise<any> =>

    axios.post('/account/token',
        JSON.stringify(credentials), {
        headers: { 'Content-Type': 'application/json' }
    })

export const getUserInfo = (token: string): Promise<any> =>
    axios.get<any>(`/account/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })


export const editUser = (id: string, userData: User, token: string): Promise<any> =>
    axios.put(`/account/users/${id}`,
        JSON.stringify(userData), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

export const getUsers = (token: String) =>
    axios.get<User[]>(`/account/users`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

export const removeUser = (id: string, token: string): Promise<any> =>
    axios.delete(`/account/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });