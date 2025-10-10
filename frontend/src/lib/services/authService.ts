import api from '$lib/api';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
	sub: string;
	iat: number;
	exp: number;
	permissions?: string[];
}

class AuthService {
	private baseUrl = 'http://localhost:8080/api/v1/auth';

	async login(username: string, password: string, rememberMe: boolean) {
		const res = await fetch(`${this.baseUrl}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
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
			Cookies.set('JWT_TOKEN', data.token, rememberMe ? { expires: 7 } : {});
		}
		return data;
	}

	logout() {
		Cookies.remove('JWT_TOKEN');
	}

	getToken() {
		return Cookies.get('JWT_TOKEN');
	}

	async getProfile() {
		try {
			const { data } = await api.get('/api/v1/auth/profile');
			return data;
		} catch (error) {
			console.error('Error fetching profile:', error);
			throw error;
		}
	}

	getDecodedToken(): JwtPayload | null {
		const token = this.getToken();
		if (!token) return null;
		try {
			return jwtDecode<JwtPayload>(token);
		} catch {
			return null;
		}
	}

	getPermissions(): string[] {
		const decoded = this.getDecodedToken();
		return decoded?.permissions || [];
	}

	hasPermission(permission: string): boolean {
		const permissions = this.getPermissions();
		return permissions.includes(permission);
	}
}

export const authService = new AuthService();
