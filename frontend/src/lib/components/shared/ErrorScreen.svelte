<script lang="ts">
	import Icon from '@iconify/svelte';
	export let errorMessage: string = 'Cargando...';
	export let iconifyIcon: string = 'lucide:circle-alert';
	export let iconColor: string = 'text-error';
</script>

<div class="flex min-h-screen flex-col items-center">
	<Icon icon={iconifyIcon} class="text-[150px] {iconColor}" />
	<h1 class="text-center text-2xl font-thin text-balance">{errorMessage}</h1>
</div>
