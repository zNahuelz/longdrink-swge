<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount, tick } from 'svelte';
	import Swal from 'sweetalert2';
	import Icon from '@iconify/svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import ErrorScreen from '$lib/components/shared/ErrorScreen.svelte';
	import LoadingScreen from '$lib/components/shared/LoadingScreen.svelte';
	import { employeeService } from '$lib/services/employeeService';
	import { roleService } from '$lib/services/roleService';
	import {
		DEFAULT_CITIZEN_ID_TYPES,
		DEFAULT_EMPLOYEE_POSITIONS,
		ERROR_COLOR,
		SUCCESS_COLOR
	} from '$lib/constants/constants';
	import { ERROR_MESSAGES, INFO_MESSAGES, loadingMessage, STRINGS } from '$lib/constants/strings';
	import { ErrorAndReload, isInteger } from '$lib/constants/utils';
	import { CreateEmployeeSchema } from '$lib/schemas/createEmployeeSchema';
	import type { Employee } from '$lib/types/employee';
	import type { Role } from '$lib/types/role';

	let isLoading = false;
	let error: string | null = null;
	let errorMessage = 'Empleado no encontrado.';
	let employee: Employee | null = null;
	let roles: Role[] = [];
	let lockedForm = false;
	let selectedRoleId: number | null = null;

	const { form, errors, isSubmitting, setErrors, setFields } = createForm({
		initialValues: {
			names: '',
			paternalSurname: '',
			maternalSurname: '',
			citizenId: '',
			citizenIdType: DEFAULT_CITIZEN_ID_TYPES[0].value,
			phone: '',
			address: '',
			birthDate: '',
			hiringDate: '',
			position: DEFAULT_EMPLOYEE_POSITIONS[0].value,
			roleId: 1,
			email: ''
		},
		extend: validator({ schema: CreateEmployeeSchema }),
		onSubmit: askBeforeUpdating
	});

	onMount(async () => {
		verifyId();
		loadRoles();
		loadEmployee(Number.parseInt($page.params.id!!));
	});

	$: pageTitle = isLoading
		? 'Cargando empleado... | LongDrink'
		: employee
			? `Modificar Empleado: ${employee.names} ${employee.paternalSurname} | LongDrink`
			: 'Modificar Empleado | LongDrink';

	$: selectedRole = roles.find((role) => role.id === selectedRoleId);

	$: if (employee && !isLoading) {
		setInitialValues();
	}

	async function loadRoles() {
		isLoading = true;
		error = null;
		try {
			let fetchedRoles = await roleService.fetchRoles({ status: 'available' });
			roles = fetchedRoles.filter(
				(role) =>
					role.name.toUpperCase() !== 'ALUMNO' &&
					role.name.toUpperCase() !== 'DOCENTE' &&
					role.name.toUpperCase() !== 'ESTUDIANTE' &&
					role.name.toUpperCase() !== 'PROFESOR'
			);
			if (roles?.length <= 0) {
				errorMessage = ERROR_MESSAGES.ROLE_LF_EMPLOYEE_C_DISABLED;
				lockedForm = true;
			}
			selectedRoleId = roles[0].id;
		} catch (err) {
			roles = [];
			errorMessage = ERROR_MESSAGES.API_CONN_ERROR;
			lockedForm = true;
		}
	}

	async function loadEmployee(id: number) {
		error = null;
		try {
			employee = await employeeService.fetchEmployee(id);
			isLoading = false;
			await tick();
			setInitialValues();
		} catch (err) {
			errorMessage = ERROR_MESSAGES.EMPLOYEE_NOT_FOUND;
			employee = null;
			goto('/dashboard/employee');
		}
	}

	async function askBeforeUpdating(values: CreateEmployeeSchema) {
		const result = await Swal.fire({
			icon: 'question',
			title: 'Confirmar Operación',
			html: INFO_MESSAGES.CONFIRM_EMPLOYEE_UPDATE,
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: 'CONTINUAR',
			cancelButtonText: 'CANCELAR',
			cancelButtonColor: ERROR_COLOR,
			confirmButtonColor: SUCCESS_COLOR
		});

		if (result.isConfirmed) {
			await updateEmployee(values);
		}
	}

	async function updateEmployee(values: CreateEmployeeSchema) {
		try {
			const response = await employeeService.updateEmployee(employee?.id!, values);
			Swal.fire(
				INFO_MESSAGES.SUCCESS_TAG,
				`Empleado actualizado correctamente. ID: ${response.id}`,
				'success'
			).then((r) => {
				if (r.isConfirmed || r.isDismissed || r.dismiss) {
					goto('/dashboard/employee');
				}
			});
		} catch (error: any) {
			if (error.citizenId) {
				setErrors({ citizenId: STRINGS.CITIZEN_ID_TAKEN });
			} else if (error.email) {
				setErrors({ email: STRINGS.EMAIL_TAKEN });
			} else {
				ErrorAndReload(ERROR_MESSAGES.ERROR_TAG, ERROR_MESSAGES.SERVER_ERROR);
			}
		}
	}

	function setInitialValues() {
		if (employee) {
			setFields('names', employee.names);
			setFields('paternalSurname', employee.paternalSurname);
			setFields('maternalSurname', employee.maternalSurname);
			setFields('citizenId', employee.citizenId);
			setFields('citizenIdType', employee.citizenIdType);
			setFields('phone', employee.phone);
			setFields('address', employee.address);
			setFields('birthDate', employee.birthDate);
			setFields('hiringDate', employee.hiringDate);
			setFields('email', employee.user?.email ?? '');
			setFields('position', employee.position);
			setFields('roleId', employee.user?.role?.id ?? 999);
			selectedRoleId = employee!!.user!!.role!!.id!!;
			if (!roles.find((r) => r.id === employee?.user?.role?.id)) {
				lockedForm = true;
				errorMessage = ERROR_MESSAGES.LOCKED_EMPLOYEE_ROLE;
			}
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

	function resetForm() {
		setInitialValues();
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>
{#if lockedForm && !isLoading}
	<ErrorScreen {errorMessage}></ErrorScreen>
{/if}
{#if isLoading}
	<LoadingScreen loadMessage={loadingMessage('formulario')}></LoadingScreen>
{:else if !isLoading && !lockedForm}
	<div class="m-0 md:m-5 md:flex md:flex-col md:items-center md:p-5">
		<div class="card w-full border bg-base-100 shadow-sm md:max-w-5xl">
			<form class="card-body" use:form>
				<h2 class="mb-2 text-start text-2xl font-light">Modificar Empleado #{employee?.id}</h2>
				<div class="cols-span-1 grid w-full md:grid-cols-3 md:gap-2">
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Nombres</legend>
						<label class="input w-full">
							<Icon icon="lucide:user" class="h-[1em] opacity-50" />
							<input type="text" name="names" placeholder="Nombres..." />
						</label>
						{#if $errors.names}
							<p class="text-sm text-error">{$errors.names[0]}</p>
						{/if}
					</fieldset>
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Apellido Paterno</legend>
						<label class="input w-full">
							<Icon icon="lucide:user" class="h-[1em] opacity-50" />
							<input type="text" name="paternalSurname" placeholder="Apellido Paterno..." />
						</label>
						{#if $errors.paternalSurname}
							<p class="text-sm text-error">{$errors.paternalSurname[0]}</p>
						{/if}
					</fieldset>
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Apellido Materno</legend>
						<label class="input w-full">
							<Icon icon="lucide:user" class="h-[1em] opacity-50" />
							<input type="text" name="maternalSurname" placeholder="Apellido Materno..." />
						</label>
						{#if $errors.maternalSurname}
							<p class="text-sm text-error">{$errors.maternalSurname[0]}</p>
						{/if}
					</fieldset>
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Doc. Identidad</legend>
						<label class="input w-full">
							<Icon icon="lucide:id-card" class="h-[1em] opacity-50" />
							<input type="text" name="citizenId" placeholder="Doc. Identidad..." />
						</label>
						{#if $errors.citizenId}
							<p class="text-sm text-error">{$errors.citizenId[0]}</p>
						{/if}
					</fieldset>
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Tipo de Doc. Identidad</legend>
						<label class="input w-full">
							<Icon icon="lucide:id-card-lanyard" class="h-[1em] opacity-50" />
							<select name="citizenIdType" class="w-full">
								{#each DEFAULT_CITIZEN_ID_TYPES as { label, value }}
									<option {value}>{label}</option>
								{/each}
							</select>
						</label>
						{#if $errors.citizenIdType}
							<p class="text-sm text-error">{$errors.citizenIdType[0]}</p>
						{/if}
					</fieldset>
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Teléfono</legend>
						<label class="input w-full">
							<Icon icon="lucide:phone" class="h-[1em] opacity-50" />
							<input type="text" name="phone" placeholder="Teléfono..." />
						</label>
						{#if $errors.phone}
							<p class="text-sm text-error">{$errors.phone[0]}</p>
						{/if}
					</fieldset>
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Dirección</legend>
						<label class="input w-full md:col-span-2">
							<Icon icon="lucide:map-pinned" class="h-[1em] opacity-50" />
							<input type="text" name="address" placeholder="Dirección..." />
						</label>
						{#if $errors.address}
							<p class="text-sm text-error">{$errors.address[0]}</p>
						{/if}
					</fieldset>
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Fecha de Nacimiento</legend>
						<label class="input w-full">
							<Icon icon="lucide:calendar-days" class="h-[1em] opacity-50" />
							<input type="date" name="birthDate" />
						</label>
						{#if $errors.birthDate}
							<p class="text-sm text-error">
								{$errors.birthDate[0].includes('date')
									? 'La fecha de nacimiento no es válida.'
									: $errors.birthDate[0]}
							</p>
						{/if}
					</fieldset>
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Fecha de Contratación</legend>
						<label class="input w-full">
							<Icon icon="lucide:calendar-days" class="h-[1em] opacity-50" />
							<input type="date" name="hiringDate" />
						</label>
						{#if $errors.hiringDate}
							<p class="text-sm text-error">
								{$errors.hiringDate[0].includes('date')
									? 'La fecha de contratación no es válida.'
									: $errors.hiringDate[0]}
							</p>
						{/if}
					</fieldset>
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Correo Electrónico</legend>
						<label class="input w-full">
							<Icon icon="lucide:mail" class="h-[1em] opacity-50" />
							<input type="email" name="email" placeholder="Correo Electrónico..." />
						</label>
						{#if $errors.email}
							<p class="text-sm text-error">{$errors.email[0]}</p>
						{/if}
					</fieldset>
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Cargo</legend>
						<label class="input w-full">
							<Icon icon="lucide:text-select" class="h-[1em] opacity-50" />
							<select name="position" class="w-full">
								{#each DEFAULT_EMPLOYEE_POSITIONS as { label, value }}
									<option {value}>{label}</option>
								{/each}
							</select>
						</label>
						{#if $errors.position}
							<p class="text-sm text-error">{$errors.position[0]}</p>
						{/if}
					</fieldset>
					<fieldset class="fieldset">
						<legend class="fieldset-legend">Rol en Sistema</legend>
						<label class="input w-full">
							<Icon icon="lucide:folder-key" class="h-[1em] opacity-50" />
							<select name="roleId" class="w-full" bind:value={selectedRoleId}>
								{#each roles as role}
									<option value={role.id}>{role.name.toUpperCase()}</option>
								{/each}
							</select>
						</label>
						{#if $errors.roleId}
							<p class="text-sm text-error">{$errors.roleId[0]}</p>
						{/if}
					</fieldset>
					<div
						class={`collapse mt-2 mb-2 border-2 ${
							(selectedRole?.abilities ?? []).length > 0 ? 'border-secondary' : 'border-error'
						} bg-base-100 shadow-md md:col-span-full`}
					>
						<input type="checkbox" />
						<div class="collapse-title text-center font-semibold">
							¿Que permisos tiene el rol seleccionado?
						</div>
						<div class="collapse-content text-sm">
							{#if (selectedRole?.abilities ?? []).length > 0}
								<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
									<table class="table border table-xs">
										<thead>
											<tr class="font-bold text-black">
												<th>Permiso</th>
												<th>Descripción</th>
											</tr>
										</thead>
										<tbody>
											{#each selectedRole!!.abilities ?? [] as ability, i}
												<tr class="hover:bg-secondary/10">
													<td class="font-medium">{ability.name}</td>
													<td>{ability.description}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							{:else}
								<h1 class="text-center text-xl font-light">
									{ERROR_MESSAGES.ROLE_WITHOUT_ABILITIES}
								</h1>
							{/if}
						</div>
					</div>
				</div>
				<div class="card-actions flex flex-col md:flex-row md:justify-end">
					<button class="btn w-full btn-success md:w-auto" type="submit" disabled={$isSubmitting}>
						{#if $isSubmitting}
							<span class="loading loading-lg loading-dots"></span>
							<span>{STRINGS.UPDATING_DOTS}</span>
						{:else}
							<Icon icon="lucide:cloud-upload" />
							<span>{STRINGS.UPDATE}</span>
						{/if}
					</button>
					<button
						class="btn w-full btn-neutral md:w-auto"
						type="button"
						disabled={$isSubmitting}
						on:click={() => resetForm()}
						><Icon icon="lucide:refresh-ccw-dot" />{STRINGS.RESET}</button
					>
					<button
						class="btn w-full btn-secondary md:w-auto"
						type="button"
						disabled={$isSubmitting}
						on:click={() => goto('/dashboard/employee')}
						><Icon icon="lucide:square-arrow-left" />{STRINGS.BACK}</button
					>
				</div>
			</form>
		</div>
	</div>
{/if}
