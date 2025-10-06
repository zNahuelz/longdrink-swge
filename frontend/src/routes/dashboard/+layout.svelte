<script lang="ts">
	import Navbar from '$lib/components/shared/Navbar.svelte';
	import Sidebar from '$lib/components/shared/Sidebar.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { authService } from '$lib/services/authService';
	import { writable } from 'svelte/store';

    const isLoading = writable(false);

	onMount(() => {
		const token = authService.getToken();
		if (!token) {
			goto('/');
            return;
		}
        isLoading.set(false);
	});
</script>

{#if $isLoading}
<h1>Loading...!</h1>
{:else}
<div class="drawer min-h-screen bg-base-100 lg:drawer-open">
	<!-- Hidden checkbox for mobile toggle -->
	<input id="drawer-toggle" type="checkbox" class="drawer-toggle" />
	<!-- Sidebar -->
	<div class="drawer-side z-40">
		<label for="drawer-toggle" class="drawer-overlay"></label>
		<Sidebar />
	</div>
	<!-- Main content area -->
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<Navbar />
		<!-- Page content -->
		<main class="flex-1 overflow-x-hidden p-6">
			<slot />
		</main>
	</div>
</div>
{/if}
