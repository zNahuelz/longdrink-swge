<script lang="ts">
	import { goto } from '$app/navigation';
	import LoadingScreen from '$lib/components/shared/LoadingScreen.svelte';
	import Pagination from '$lib/components/shared/Pagination.svelte';
	import Table from '$lib/components/shared/Table.svelte';
	import { DEFAULT_STATUS_TYPES } from '$lib/constants/constants';
	import { EMPLOYEE_SEARCH_TYPES } from '$lib/constants/searchTypes';
	import { ERROR_MESSAGES, tableElementsMessage } from '$lib/constants/strings';
	import { employeeService } from '$lib/services/employeeService';
	import type { Employee } from '$lib/types/employee';
	import { Pagination as _Pagination } from '$lib/types/pagination';
	import Icon from '@iconify/svelte';
	import { get, writable } from 'svelte/store';
	import { toast } from 'svoast';

	let isLoading = false;
	let error: string | null = null;
	let errorMessage = 'No se encontraron alumnos.';
	let employees = new _Pagination<Employee>({} as any, []);
	let page = 1;
	let limit = 10;
	let search = '';
	let status = 'available';
	const searchBy = writable<'all' | 'id' | 'citizen_id' | 'position' | 'names'>('id');

	const columns = [
		{ key: 'id', label: '#' },
		{ key: 'names', label: 'NOMBRES' },
		{ key: 'paternalSurname', label: 'AP. PATERNO' },
		{ key: 'citizenId', label: 'DNI' },
		{ key: 'phone', label: 'TELÉFONO' },
		{ key: 'position', label: 'CARGO' },
		{ key: 'createdAt', label: 'F. REGISTRO' },
		{ key: 'deletedAt', label: 'ESTADO' },
		{
			key: 'user',
			label: 'USUARIO',
			render: (row: Employee) => row.user?.username ?? 'SIN USUARIO'
		}
	];

	/***************************** Validations *****************************/
	$: totalPages = employees.meta?.lastPage ?? 1;

	$: minlength =
		$searchBy === 'names'
			? 3
			: $searchBy === 'position'
				? 3
				: $searchBy === 'citizen_id'
					? 8
					: undefined;

	$: pattern =
		$searchBy === 'citizen_id' ? '^[0-9]{8,15}$' : $searchBy === 'id' ? '^[0-9]+$' : undefined;

	$: required = $searchBy !== 'all';
	/***************************** Validations *****************************/

	/***************************** Runes *****************************/
	$: if ($searchBy) search = '';
	$: if (limit) page = 1;
	$: if (status) page = 1;

	$: (loadEmployees(), [page, limit, status]);
	/***************************** Runes *****************************/

	async function loadEmployees() {
		isLoading = true;
		error = null;
		try {
			employees = await employeeService.fetchEmployees({
				page,
				search,
				searchBy: get(searchBy),
				limit,
				status
			});
			if (employees.data?.length <= 0 && search != '') {
				errorMessage = ERROR_MESSAGES.EMPLOYEES_NOT_FOUND;
			}
		} catch (err) {
			employees = new _Pagination<Employee>({} as any, []);
			errorMessage = ERROR_MESSAGES.API_CONN_ERROR;
		} finally {
			isLoading = false;
		}
	}

	function resetTable() {
		page = 1;
		limit = 10;
		search = '';
		status = 'available';
		searchBy.set('id');
		loadEmployees();
	}

	function goTo(page: string) {
		goto(page);
	}

	function wip(action: string, employee: Employee) {
		toast.info(`ID: ${employee.id} -- ${employee.names} | ${action}`);
	}
</script>

<svelte:head>
	<title>Listado de Empleados | LongDrink</title>
</svelte:head>
{#if isLoading}
	<LoadingScreen loadMessage="Cargando empleados..."></LoadingScreen>
{:else}
	<div
		class="mb-2 flex flex-col items-center space-y-2 md:flex md:flex-row md:items-center md:justify-between"
	>
		<button
			type="button"
			class="btn w-100 btn-success md:w-auto"
			on:click={() => goTo('/dashboard/employee/new')}>Nuevo</button
		>
		<form
			class="flex flex-col items-center space-y-2 md:flex md:flex-row md:items-center md:gap-2 md:space-y-0"
			on:submit|preventDefault={loadEmployees}
			on:invalid={(e) => e.preventDefault()}
		>
			<select class="select w-100 md:w-50" name="searchBy" bind:value={$searchBy}>
				{#each EMPLOYEE_SEARCH_TYPES as { label, value }}
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
	<Table {columns} data={employees.data} {errorMessage}>
		<div class="join-horizontal join" slot="actions" let:row>
			<button
				class="btn join-item btn-primary"
				title="Detalles"
				on:click={() => goTo(`/dashboard/employee/${row.id}`)}
				><Icon icon="lucide:more-horizontal" class="text-md lg:text-lg" /></button
			>
			<button
				class="btn join-item btn-accent"
				title="Editar"
				on:click={() => goTo(`/dashboard/employee/edit/${row.id}`)}
				><Icon icon="lucide:edit" class="text-md lg:text-lg" /></button
			>
			<button class="btn join-item btn-error" title="Eliminar" on:click={() => wip('Eliminar', row)}
				><Icon icon="lucide:trash-2" class="text-md lg:text-lg" /></button
			>
		</div>
	</Table>
	<div
		class="flex flex-col items-center space-y-2 md:flex md:flex-row md:items-center md:justify-between md:space-y-0"
	>
		<Pagination bind:limit bind:page {totalPages}></Pagination>
		<select class="select w-60 md:w-50" bind:value={status}>
			{#each DEFAULT_STATUS_TYPES as { label, value }}
				<option {value}>{label}</option>
			{/each}
		</select>
	</div>

	<h1 class="mt-1 text-center font-medium">
		{#if employees.data?.length >= 1}
			{tableElementsMessage('empleado', 'empleados', employees.meta?.total, employees.data?.length)}
		{/if}
	</h1>
{/if}
