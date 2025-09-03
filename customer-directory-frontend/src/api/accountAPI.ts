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
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

export const logout = (): Promise<any> =>
    axios.post('/account/logout', {
        withCredentials: true
    })

export const getUserInfo = (): Promise<any> =>
    axios.get<any>(`/account/me`, {
        withCredentials: true
    })


export const editUser = (id: string, userData: User): Promise<any> =>
    axios.put(`/account/users/${id}`,
        JSON.stringify(userData), {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });

export const getUsers = () =>
    axios.get<User[]>(`/account/users`, {
        withCredentials: true
    });

export const removeUser = (id: string): Promise<any> =>
    axios.delete(`/account/users/${id}`, {
        withCredentials: true
    });