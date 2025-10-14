<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	let { children } = $props();
	import { Toasts } from 'svoast';
	import { onMount } from 'svelte';
	import { authService } from '$lib/services/authService';
	import { authStore } from '../stores/userStore';
	import api from '$lib/api';
	import type { User } from '$lib/types/user';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';

	onMount(async () => {
		const token = authService.getToken();

		if (!token) {
			goto('/');
			return;
		}

		authStore.update((a) => ({ ...a, token }));

		try {
			const response = await api.get<User>('/auth/profile');
			authStore.update((a) => ({ ...a, user: response.data }));
		} catch (err) {
			console.error('Failed to restore user profile:', err);
			authService.logout();
			goto('/');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toasts position="top-right" />
{@render children?.()}
