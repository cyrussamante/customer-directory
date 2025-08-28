import axios from 'axios';



export const uploadImage = (imageFile: File, token: string): Promise<any> => {
    const formData = new FormData();
    formData.append('file', imageFile);

    return axios.post('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getImage = (imageId: string, token: string): Promise<any> => {
    return axios.get(`/images/${imageId}`, {
        responseType: 'blob',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};