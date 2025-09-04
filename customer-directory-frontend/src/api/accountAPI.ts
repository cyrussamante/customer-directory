import axios from 'axios';
import { VITE_API_URL } from '../helpers/api';

export const register = (userData: any): Promise<any> =>

    axios.post(`${VITE_API_URL}/account/register`,
        JSON.stringify(userData), {
        headers: { 'Content-Type': 'application/json' }
    })

export const login = (credentials: any): Promise<any> =>

    axios.post(`${VITE_API_URL}/account/token`,
        JSON.stringify(credentials), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

export const logout = (): Promise<any> =>
    axios.post(`${VITE_API_URL}/account/logout`, {
        withCredentials: true
    })

export const getUserInfo = (): Promise<any> =>
    axios.get<any>(`${VITE_API_URL}/account/me`, {
        withCredentials: true
    })