<script lang="ts">
	import dayjs from 'dayjs';
	export let columns: { key: keyof T; label: string }[] = [];
	export let data: T[] = [];
	export let emptyMessage: string = 'No se encontraron elementos.';
</script>

<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
	<table class="table">
		<thead>
			<tr class="font-bold text-black">
				{#each columns as col}
					<th>{col.label}</th>
				{/each}
				<th class="text-center">ACCIONES</th>
			</tr>
		</thead>
		<tbody>
			{#if data.length === 0}
				<template> <h1>{emptyMessage}</h1></template>
			{:else}
				{#each data as row}
					<tr class="hover:bg-primary/20">
						{#each columns as col}
							<td>
								{#if ['createdAt', 'deletedAt'].includes(col.key as string) && row[col.key]}
									{dayjs(row[col.key]).format('DD/MM/YYYY h:mm A')}
								{:else if col.key === 'deletedAt'}
									{row[col.key] ? 'DESHABILITADO' : 'HABILITADO'}
								{:else}
									{row[col.key]}
								{/if}
							</td>
						{/each}
						<td class="flex items-center justify-center">
							<slot name="actions" {row}></slot>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
