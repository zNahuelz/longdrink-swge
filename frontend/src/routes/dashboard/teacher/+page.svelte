<script lang="ts">
	console.log;
	import type { Teacher } from '$lib/types/teacher';
	import { teacherService } from '$lib/services/teacherService';
	import LoadingScreen from '$lib/components/shared/LoadingScreen.svelte';
	import Table from '$lib/components/shared/Table.svelte';
	import Icon from '@iconify/svelte';
	import { toast } from 'svoast';
	import { TEACHER_SEARCH_TYPES } from '$lib/constants/searchTypes';
	import { Pagination as _Pagination } from '$lib/types/pagination';
	import Pagination from '$lib/components/shared/Pagination.svelte';
	import { writable } from 'svelte/store';
	import { get } from 'svelte/store';
	import { ERROR_MESSAGES, tableElementsMessage } from '$lib/constants/strings';

	let isLoading = false;
	let error: string | null = null;
	let errorMessage = 'No se encontraron docentes.';
	let teachers = new _Pagination<Teacher>({} as any, []);
	let page = 1;
	let limit = 10;
	let search = '';
	const searchBy = writable<'all' | 'id' | 'citizen_id' | 'names'>('id');

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

	/***************************** Validations *****************************/
	$: totalPages = teachers.meta?.lastPage ?? 1;

	$: minlength = $searchBy === 'names' ? 3 : $searchBy === 'citizen_id' ? 8 : undefined;

	$: pattern =
		$searchBy === 'citizen_id' ? '^[0-9]{8,15}$' : $searchBy === 'id' ? '^[0-9]+$' : undefined;

	$: required = $searchBy !== 'all';
	/***************************** Validations *****************************/

	/***************************** Runes *****************************/
	$: if ($searchBy) search = '';
	$: if (limit) page = 1;

	$: (loadTeachers(), [page, limit]);
	/***************************** Runes *****************************/

	async function loadTeachers() {
		isLoading = true;
		error = null;
		try {
			teachers = await teacherService.fetchTeachers({
				page,
				search,
				searchBy: get(searchBy),
				limit
			});
			if (teachers.data?.length <= 0 && search != '') {
				errorMessage = ERROR_MESSAGES.TEACHERS_NOT_FOUND;
			}
		} catch (err) {
			teachers = new _Pagination<Teacher>({} as any, []);
			errorMessage = ERROR_MESSAGES.API_CONN_ERROR;
		} finally {
			isLoading = false;
		}
	}

	function resetTable() {
		page = 1;
		limit = 10;
		search = '';
		searchBy.set('id');
		loadTeachers();
	}

	function wip(action: string, teacher: Teacher) {
		toast.info(`ID: ${teacher.id} -- ${teacher.names} | ${action}`);
	}
</script>

<svelte:head>
	<title>Listado de Docentes | LongDrink</title>
</svelte:head>
{#if isLoading}
	<LoadingScreen loadMessage="Cargando docentes..."></LoadingScreen>
{:else}
	<div
		class="mb-2 flex flex-col items-center space-y-2 md:flex md:flex-row md:items-center md:justify-between"
	>
		<button type="button" class="btn w-100 btn-success md:w-auto">Nuevo</button>
		<form
			class="flex flex-col items-center space-y-2 md:flex md:flex-row md:items-center md:gap-2 md:space-y-0"
			on:submit|preventDefault={loadTeachers}
			on:invalid={(e) => e.preventDefault()}
		>
			<select class="select w-100 md:w-50" name="searchBy" bind:value={$searchBy}>
				{#each TEACHER_SEARCH_TYPES as { label, value }}
					<option {value}>{label}</option>
				{/each}
			</select>
			<input
				type="text"
				class="input w-100 md:w-50"
				placeholder="Criterio de busqueda..."
				name="search"
				{required}
				{minlength}
				{pattern}
				bind:value={search}
			/>
			<button type="submit" class="btn w-100 btn-info md:w-auto" disabled={isLoading}>Buscar</button
			>
			<button
				type="button"
				class="btn w-100 btn-neutral md:w-auto"
				title="Refrescar"
				on:click={resetTable}
				disabled={isLoading}><Icon icon="lucide:refresh-ccw" /></button
			>
		</form>
	</div>
	<Table {columns} data={teachers.data} {errorMessage}>
		<div class="join-horizontal join" slot="actions" let:row>
			<button
				class="btn join-item btn-primary"
				title="Detalles"
				on:click={() => wip('Detalles', row)}
				><Icon icon="lucide:more-horizontal" class="text-md lg:text-lg" /></button
			>
			<button class="btn join-item btn-accent" title="Editar" on:click={() => wip('Editar', row)}
				><Icon icon="lucide:edit" class="text-md lg:text-lg" /></button
			>
			<button class="btn join-item btn-error" title="Eliminar" on:click={() => wip('Eliminar', row)}
				><Icon icon="lucide:trash-2" class="text-md lg:text-lg" /></button
			>
		</div>
	</Table>
	<Pagination bind:limit bind:page {totalPages}></Pagination>
	<h1 class="mt-1 text-center font-medium">
		{#if teachers.data?.length >= 1}
			{tableElementsMessage('docente', 'docentes', teachers.meta?.total, teachers.data?.length)}
		{/if}
	</h1>
{/if}
