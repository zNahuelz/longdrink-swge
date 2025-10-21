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

	onMount(() => {
		verifyId();
		loadEmployee(Number.parseInt($page.params.id!!));
	});

	$: pageTitle = isLoading
		? 'Cargando empleado... | LongDrink'
		: employee
			? `Empleado: ${employee.names} ${employee.paternalSurname} | LongDrink`
			: 'Detalles de Empleado | LongDrink';

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

	function goTo(page: string) {
		goto(page);
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="flex flex-row justify-between">
	<h1 class="mb-3 text-2xl font-light">Detalle de empleado #{$page.params.id}</h1>
	<div class="join-horizontal join">
		<button
			class="btn join-item btn-accent"
			title="Editar"
			on:click={() => goTo(`/dashboard/employee/edit/${employee?.id}`)}
			><Icon icon="lucide:edit" class="text-md lg:text-lg" /></button
		>
		<button class="btn join-item btn-error" title="Eliminar"
			><Icon icon="lucide:trash-2" class="text-md lg:text-lg" /></button
		>
		<button class="btn join-item btn-secondary" title="Atrás" on:click={() => goBack()}
			><Icon icon="lucide:square-arrow-left" class="text-md lg:text-lg" /></button
		>
	</div>
</div>
<div class="md:grid md:grid-cols-3 md:gap-2">
	<ReadonlyInput label="Nombres" value={employee?.names}></ReadonlyInput>
	<ReadonlyInput label="Apellido Paterno" value={employee?.paternalSurname}></ReadonlyInput>
	<ReadonlyInput label="Apellido Materno" value={employee?.maternalSurname}></ReadonlyInput>
	<ReadonlyInput label="Doc. Identidad" value={employee?.citizenId} iconifyIcon="lucide:id-card"
	></ReadonlyInput>
	<ReadonlyInput
		label="Tipo de Doc. Id."
		value={employee?.citizenIdType}
		iconifyIcon="lucide:id-card-lanyard"
	></ReadonlyInput>
	<ReadonlyInput label="Teléfono" value={employee?.phone} iconifyIcon="lucide:phone"
	></ReadonlyInput>
	<ReadonlyInput
		label="Dirección"
		value={employee?.address}
		iconifyIcon="lucide:map-pinned"
		colSpan="2"
	></ReadonlyInput>
	<ReadonlyInput
		label="Fecha de Nacimiento"
		value={employee?.birthDate}
		iconifyIcon="lucide:calendar-days"
	></ReadonlyInput>
	<ReadonlyInput
		label="Fecha de Contratación"
		value={employee?.hiringDate}
		iconifyIcon="lucide:calendar-days"
	></ReadonlyInput>
	<ReadonlyInput
		label="Fecha de Despido"
		value={!employee?.dismissalDate ? 'CONTRATO VIGENTE' : employee.dismissalDate}
		iconifyIcon="lucide:door-open"
		textColor={employee?.dismissalDate ? 'error' : 'success'}
		fontWeight="bold"
	></ReadonlyInput>
	<ReadonlyInput label="Cargo" value={employee?.position} iconifyIcon="lucide:text-select"
	></ReadonlyInput>
	<ReadonlyInput
		label="Fecha de Registro"
		value={!employee?.createdAt ? '-----' : formatAsDatetime(employee?.createdAt)}
		iconifyIcon="lucide:calendar-cog"
	></ReadonlyInput>
	<ReadonlyInput
		label="Última Modificación"
		value={!employee?.updatedAt ? '-----' : formatAsDatetime(employee?.updatedAt)}
		iconifyIcon="lucide:calendar-cog"
	></ReadonlyInput>
</div>
{#if employee?.user}
	<h1 class="mt-3 text-2xl font-light">
		Detalles de usuario: {`${employee?.names} ${employee?.paternalSurname}`}
	</h1>
	<div class="mt-3 md:grid md:grid-cols-3 md:gap-2">
		<ReadonlyInput
			label="ID - Nombre de Usuario"
			value={`${employee?.user?.id} - ${employee?.user?.username}`}
			iconifyIcon="lucide:shield-user"
		></ReadonlyInput>
		<ReadonlyInput
			label="Correo Electrónico"
			value={employee?.user?.email}
			iconifyIcon="lucide:mail"
		></ReadonlyInput>
		<ReadonlyInput
			label="Fecha de Registro"
			value={!employee?.user?.createdAt ? '-----' : formatAsDatetime(employee?.user?.createdAt)}
			iconifyIcon="lucide:calendar-cog"
		></ReadonlyInput>
		<ReadonlyInput
			label="Última Modificación"
			value={!employee?.user?.updatedAt ? '-----' : formatAsDatetime(employee?.user?.updatedAt)}
			iconifyIcon="lucide:calendar-cog"
		></ReadonlyInput>
		<ReadonlyInput
			label="Estado"
			value={employee?.user?.deletedAt ? 'CUENTA DESHABILITADA' : 'VIGENTE'}
			iconifyIcon="lucide:laptop-minimal-check"
			textColor={employee?.user.deletedAt ? 'error' : 'success'}
			fontWeight="bold"
		></ReadonlyInput>
		<ReadonlyInput
			label="Rol en Sistema"
			value={!employee?.user?.role ? '-----' : employee?.user?.role.name}
			iconifyIcon="lucide:folder-key"
		></ReadonlyInput>
		{#if (employee?.user?.role?.abilities ?? []).length > 0}
			<div
				class="col-span-full overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
			>
				<table class="table border table-sm">
					<thead>
						<tr class="font-bold text-black">
							<th>Permiso</th>
							<th>Descripción</th>
						</tr>
					</thead>
					<tbody>
						{#each employee?.user?.role?.abilities ?? [] as ability, i}
							<tr class="hover:bg-secondary/10">
								<td class="font-medium">{ability.name}</td>
								<td>{ability.description}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<h1 class="col-span-full text-center text-lg font-semibold">
				{ERROR_MESSAGES.ROLE_WITHOUT_ABILITIES_UD}
			</h1>
		{/if}
	</div>
{:else}
	<h1 class="col-span-full mt-3 text-center text-lg font-semibold text-error">
		{ERROR_MESSAGES.EMPLOYEE_WITHOUT_USER}
	</h1>
{/if}
