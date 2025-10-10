<script lang="ts">
	import Navbar from '$lib/components/shared/Navbar.svelte';
	import Sidebar from '$lib/components/shared/Sidebar.svelte';
</script>

<div class="drawer min-h-screen bg-base-100 lg:drawer-open">
	<input id="drawer-toggle" type="checkbox" class="drawer-toggle" />
	<div class="drawer-side z-40">
		<label for="drawer-toggle" class="drawer-overlay"></label>
		<Sidebar />
	</div>
	<div class="drawer-content flex flex-col">
		<Navbar />
		<main class="flex-1 overflow-x-hidden p-6">
			<slot />
		</main>
	</div>
</div>