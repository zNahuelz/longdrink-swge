import axios from 'axios';
import { authService } from './services/authService';
import { authStore } from '../stores/userStore';
import { goto } from '$app/navigation';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

const api = axios.create({
	baseURL: PUBLIC_API_BASE_URL
});

api.interceptors.request.use((config) => {
	const token = authService.getToken();
	if (token && !config.url?.includes('/auth/login')) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			console.warn('Session expired or unauthorized — logging out.');

			authService.clearTokens();
			authStore.set({ user: null, token: null });

			if (typeof window !== 'undefined') {
				try {
					await goto('/');
				} catch {
					window.location.href = '/';
				}
			}
		}
		return Promise.reject(error);
	}
);

export default api;
