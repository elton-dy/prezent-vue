import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://1-prezent.com/api',
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