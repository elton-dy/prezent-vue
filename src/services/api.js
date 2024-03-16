import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

const token = localStorage.getItem('token');
if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default apiClient;