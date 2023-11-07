import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

const token = localStorage.getItem('accessToken');
if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default apiClient;