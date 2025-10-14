<script lang="ts">
	import { page } from '$app/state';
	import { authService } from '$lib/services/authService.js';
	import type { User } from '$lib/types/user';
	import { onMount } from 'svelte';
	import { toast } from 'svoast';
	import { authStore } from '../../stores/userStore';
	import { get } from 'svelte/store';

	let profile: User | null = null;
	let loading = false;

	const auth = get(authStore);

	onMount(async () => {
		const state = page.state as { welcome?: boolean };
		if (state?.welcome) {
			toast.success('¡Bienvenido de vuelta!');
		}
	});
</script>

<svelte:head>
	<title>Dashboard | LongDrink</title>
</svelte:head>

<h1 class="mb-4 text-center text-3xl">Dashboard</h1>
<p>TOKEN: {authService.getToken()}</p>
<p>Permisos: {JSON.stringify(authService.getAbilities())}</p>
<p>
	Usuario: {#if $authStore.user}
		{JSON.stringify($authStore.user, null, 2)}
	{:else}
		<cite>Cargando...</cite>
	{/if}
</p>
