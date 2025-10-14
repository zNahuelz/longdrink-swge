<script lang="ts">
	export let loadMessage: string = 'Cargando...';
</script>

<div class="flex min-h-screen flex-col items-center">
	<span class="loading h-20 w-20 loading-dots text-primary"></span>
	<h1 class="text-2xl font-thin">{loadMessage}</h1>
</div>
