import { authService } from '$lib/services/authService.js';
import { redirect } from '@sveltejs/kit';
import { authStore } from '../stores/userStore.js';

export const load = async ({ cookies }) => {
	const token = cookies.get('AUTH_TOKEN');
	if (token) {
		authService.clearTokens(); //??? TODO: delete
		authStore.set({ user: null, token: null }); //??? TODO: delete
		throw redirect(303, '/dashboard');
	}
	return {};
};
