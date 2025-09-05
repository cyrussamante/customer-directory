import axios from 'axios';
import { VITE_AI_API_URL } from '../helpers/api';

export const generateEventDetails = (prompt: string): Promise<any> =>

    axios.post(`${VITE_AI_API_URL}/api/generate-event`, 
        JSON.stringify({ prompt }),{
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );