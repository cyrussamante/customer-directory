import axios from 'axios';

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