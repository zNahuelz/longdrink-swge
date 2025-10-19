<script lang="ts">
	import dayjs from 'dayjs';
	export let columns: { key: keyof T; label: string; render?: (row: any) => any }[] = [];
	export let data: T[] = [];
	export let errorMessage: string = 'No se encontraron elementos.';
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
			{#if data.length <= 0 || !data}
				<tr>
					<td class="py-4 text-center text-lg font-light" colspan={columns.length + 1}>
						{errorMessage}
					</td></tr
				>
			{:else}
				{#each data as row}
					<tr class="hover:bg-secondary/10">
						{#each columns as col}
							<td>
								{#if col.render}
									{col.render(row)}
								{:else if col.key === 'createdAt' && row[col.key]}
									{dayjs(row[col.key]).format('DD/MM/YYYY h:mm A')}
								{:else if col.key === 'deletedAt'}
									<span class={row[col.key] ? 'font-bold text-error' : 'font-bold text-success'}>
										{row[col.key] ? 'DESHABILITADO' : 'HABILITADO'}
									</span>
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
