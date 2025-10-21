<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import ReadonlyInput from '$lib/components/form/ReadonlyInput.svelte';
	import { employeeService } from '$lib/services/employeeService';
	import { ERROR_MESSAGES } from '$lib/constants/strings';
	import { formatAsDatetime, isInteger } from '$lib/constants/utils';
	import type { Employee } from '$lib/types/employee';

	let isLoading = false;
	let error: string | null = null;
	let errorMessage = 'No se encontraron alumnos.';
	let employee: Employee | null = null;
	//TODO: WIP...!
	onMount(() => {
		verifyId();
		loadEmployee(Number.parseInt($page.params.id!!));
	});

	$: pageTitle = isLoading
		? 'Cargando empleado... | LongDrink'
		: employee
			? `Modificar Empleado: ${employee.names} ${employee.paternalSurname} | LongDrink`
			: 'Modificar Empleado | LongDrink';

	async function loadEmployee(id: number) {
		isLoading = true;
		error = null;
		try {
			employee = await employeeService.fetchEmployee(id);
		} catch (err) {
			errorMessage = ERROR_MESSAGES.EMPLOYEE_NOT_FOUND;
			employee = null;
		} finally {
			isLoading = false;
		}
	}

	function verifyId() {
		const idVal = Number($page.params.id);
		if (!isInteger(idVal)) {
			goto('/dashboard/employee');
		}
	}

	function goBack() {
		history.length > 1 ? history.back() : goto('/dashboard/employee');
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>
