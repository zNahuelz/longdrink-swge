import axios from 'axios';
import { authService } from './services/authService';

const api = axios.create({
	baseURL: 'http://localhost:8080'
});

api.interceptors.request.use((config) => {
	const token = authService.getToken();
	if (token && !config.url?.includes('/auth/login')) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});


//TODO: Check this. 
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			authService.logout();
			if (typeof window !== 'undefined') {
				window.location.href = '/';
			}
		}
		return Promise.reject(error);
	}
);

export default api;
