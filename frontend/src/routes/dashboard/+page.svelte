<script lang="ts">
	import { page } from '$app/state';
	import { authService } from '$lib/services/authService.js';
	import type { User } from '$lib/types/user';
	import { onMount } from 'svelte';
	import { toast } from 'svoast';

	let profile: User | null = null;
	let loading = false;

	onMount(async () => {
		const state = page.state as { welcome?: boolean };
		if (state?.welcome) {
			toast.success('¡Bienvenido de vuelta!');
		}

		try {
			loading = true;
			profile = await authService.getProfile();
		} catch (error) {
			toast.error('No se pudo cargar el perfil.');
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Dashboard | LongDrink</title>
</svelte:head>

<h1 class="mb-4 text-center text-3xl">Dashboard</h1>
<p>JWT: {authService.getToken()}</p>
<p>Permisos: {JSON.stringify(authService.getPermissions())}</p>
<p>Usuario: {JSON.stringify(profile, null, 2)}</p>
