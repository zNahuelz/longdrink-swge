<script lang="ts">
	import { PAGINATION_LIMITS } from '$lib/constants/constants';
	import Icon from '@iconify/svelte';
	export let limit: number = 10;
	export let totalPages: number = 1;
	export let page: number = 1;
	function goToPage(p: number) {
		if (p >= 1 && p <= totalPages && p !== page) {
			page = p;
		}
	}
</script>

<div
	class="mt-3 flex flex-col items-center space-y-2 md:flex md:flex-row md:items-center md:gap-2 md:space-y-0"
>
	<div class="join">
		<button class="btn join-item" on:click={() => goToPage(page - 1)} disabled={page <= 1}>
			<Icon icon="lucide:arrow-left" />
		</button>

		<button class="btn join-item {page === 1 ? 'btn-active' : ''}" on:click={() => goToPage(1)}>
			1
		</button>

		{#if totalPages > 2}
			<button class="btn-disabled btn join-item">...</button>
		{/if}

		{#if totalPages > 1}
			<button
				class="btn join-item {page === totalPages ? 'btn-active' : ''}"
				on:click={() => goToPage(totalPages)}
			>
				{totalPages}
			</button>
		{/if}

		<button class="btn join-item" on:click={() => goToPage(page + 1)} disabled={page >= totalPages}>
			<Icon icon="lucide:arrow-right" />
		</button>
	</div>
	<select class="select w-60 md:w-50" bind:value={limit}>
		{#each PAGINATION_LIMITS as { label, value }}
			<option {value}>{label}</option>
		{/each}
	</select>
</div>
