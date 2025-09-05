
import axios from 'axios';
import { VITE_API_URL } from '../helpers/api';
import { authHeader } from '../helpers/function';

export const uploadImage = (imageFile: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', imageFile);

    return axios.post(`${VITE_API_URL}/images/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...authHeader()
        }
    });
};

export const getImage = (imageId: string): Promise<any> => {
    return axios.get(`${VITE_API_URL}/images/${imageId}`, {
        responseType: 'blob',
    });
};