
import axios from 'axios';
import { VITE_API_URL } from '../helpers/api';
import { authHeader } from '../helpers/function';

export const register = (userData: any): Promise<any> =>
    axios.post(`${VITE_API_URL}/account/register`,
        JSON.stringify(userData), {
        headers: { 'Content-Type': 'application/json' }
    });

export const login = async (credentials: any): Promise<any> => {
    const response = await axios.post(`${VITE_API_URL}/account/token`,
        JSON.stringify(credentials), {
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.data && response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
    }
    return response;
}

export const logout = (): void => {
    localStorage.removeItem('token');
}

export const getUserInfo = (): Promise<any> =>
    axios.get<any>(`${VITE_API_URL}/account/me`, {
        headers: { ...authHeader() }
    });