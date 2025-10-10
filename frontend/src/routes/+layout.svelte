<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	let { children } = $props();
	import { Toasts } from 'svoast';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toasts  position="top-right"/>
{@render children?.()}
