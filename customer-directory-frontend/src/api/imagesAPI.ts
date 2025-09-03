import axios from 'axios';



export const uploadImage = (imageFile: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', imageFile);

    return axios.post('/images/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    });
};

export const getImage = (imageId: string): Promise<any> => {
    return axios.get(`${imageId}`, {
        responseType: 'blob',
    });
};