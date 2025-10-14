import api from '$lib/api';
import type { User } from '$lib/types/user';
import Cookies from 'js-cookie';
import { authStore } from '../../stores/userStore';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

class AuthService {
	private baseUrl = `${PUBLIC_API_BASE_URL}/auth`;

	async login(username: string, password: string, rememberMe: boolean) {
		const res = await fetch(`${this.baseUrl}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password, rememberMe })
		});
		const data = await res.json();
		if (!res.ok) {
			const message =
				data?.message ||
				data?.error ||
				'Error durante el inicio de sesión, comuniquese con administración.';
			throw new Error(message);
		}
		if (data.token) {
			Cookies.set('AUTH_TOKEN', data.token, rememberMe ? { expires: 7 } : {});
		}
		const abilities = Array.isArray(data.abilities) ? data.abilities : [];
		Cookies.set('USER_ABILITIES', JSON.stringify(abilities), rememberMe ? { expires: 7 } : {});

		const profileResponse = await api.get<User>('/auth/profile');
		const user = profileResponse.data;
		authStore.set({
			user,
			token: this.getToken() ?? null
		});

		return data;
	}

	async logout(): Promise<unknown> {
		try {
			const { data } = await api.post('/auth/logout');
			this.clearTokens();
			authStore.set({ user: null, token: null });
			return data;
		} catch {
			this.clearTokens();
			authStore.set({ user: null, token: null });
		}
	}

	getToken() {
		return Cookies.get('AUTH_TOKEN');
	}

	async getProfile(): Promise<User> {
		try {
			const { data } = await api.get<User>('/auth/profile');
			return data;
		} catch (error) {
			console.error('Error fetching profile:', error);
			throw error;
		}
	}

	getAbilities(): string[] {
		const abilities = Cookies.get('USER_ABILITIES');
		return abilities ? JSON.parse(abilities) : [];
	}

	hasAbility(ability: string): boolean {
		const abilities = this.getAbilities();
		if (abilities.length === 0) return false;

		return abilities.some((a) => a.toLowerCase() === ability.toLowerCase());
	}

	clearTokens() {
		Cookies.remove('AUTH_TOKEN');
		Cookies.remove('USER_ABILITIES');
	}
}

export const authService = new AuthService();
