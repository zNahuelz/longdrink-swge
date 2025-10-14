<script lang="ts">
	import { Pagination } from '$lib/types/pagination';
	import type { Teacher } from '$lib/types/teacher';
	import { onMount } from 'svelte';
	import { teacherService } from '$lib/services/teacherService';
	import LoadingScreen from '$lib/components/shared/LoadingScreen.svelte';
	import Table from '$lib/components/shared/Table.svelte';
	import Icon from '@iconify/svelte';
	import { toast } from 'svoast';

	let teachers = new Pagination<Teacher>({} as any, []);
	let isLoading = false;
	let error: string | null = null;
	let search = '';
	let page = 1;

	const columns = [
		{ key: 'id', label: '#' },
		{ key: 'names', label: 'NOMBRES' },
		{ key: 'paternalSurname', label: 'AP. PATERNO' },
		{ key: 'maternalSurname', label: 'AP.MATERNO' },
		{ key: 'citizenId', label: 'DNI' },
		{ key: 'phone', label: 'TELÉFONO' },
		{ key: 'createdAt', label: 'F. REGISTRO' },
		{ key: 'deletedAt', label: 'ESTADO' }
	];
	//TODO: Add pagination, search, filters.
	async function loadTeachers() {
		isLoading = true;
		error = null;
		try {
			teachers = await teacherService.fetchTeachers({ page, search });
		} catch (err) {
			error = err instanceof Error ? err.message : 'Error desconocido...!';
		} finally {
			isLoading = false;
		}
	}

	function wip(action: string, teacher: Teacher) {
		toast.info(`ID: ${teacher.id} -- ${teacher.names} | ${action}`);
	}

	onMount(async () => {
		loadTeachers();
	});
</script>

<svelte:head>
	<title>Listado de Docentes | LongDrink</title>
</svelte:head>
{#if isLoading}
	<LoadingScreen loadMessage="Cargando docentes..."></LoadingScreen>
{:else}
	<Table {columns} data={teachers.data} emptyMessage="No se encontraron docentes.">
		<div class="join-horizontal join" slot="actions" let:row>
			<button class="btn join-item btn-info" title="Detalles" on:click={() => wip('Detalles', row)}
				><Icon icon="lucide:more-horizontal" class="text-md lg:text-lg" /></button
			>
			<button class="btn join-item btn-primary" title="Editar" on:click={() => wip('Editar', row)}
				><Icon icon="lucide:edit" class="text-md lg:text-lg" /></button
			>
			<button class="btn join-item btn-error" title="Eliminar" on:click={() => wip('Eliminar', row)}
				><Icon icon="lucide:trash-2" class="text-md lg:text-lg" /></button
			>
		</div>
	</Table>
{/if}
