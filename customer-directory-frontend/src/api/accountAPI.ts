import axios from 'axios';

export const login = (credentials: any): Promise<any> =>

    axios.post('/api/account/login',
        JSON.stringify(credentials), {
        headers: { 'Content-Type': 'application/json' }
    })

export const register = (userData: any): Promise<any> =>

    axios.post('/api/account/register',
        JSON.stringify(userData), {
        headers: { 'Content-Type': 'application/json' }
    })