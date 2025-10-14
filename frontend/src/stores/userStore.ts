import type { User } from '$lib/types/user';
import { writable } from 'svelte/store';

interface AuthState {
	user: User | null;
	token: string | null;
}

export const authStore = writable<AuthState>({
	user: null,
	token: null
});
