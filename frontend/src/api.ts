import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

export const fetchCSRFToken = async () => {
    try {
        const response = await api.get('/getCSRFToken');
        return response.data.CSRFToken;
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
    }
};

export default api;
