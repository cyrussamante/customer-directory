import axios from 'axios';

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