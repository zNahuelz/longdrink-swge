<script lang="ts">
	import { goto } from '$app/navigation';
	import LoadingScreen from '$lib/components/shared/LoadingScreen.svelte';
	import { DEFAULT_CITIZEN_ID_TYPES, DEFAULT_EMPLOYEE_POSITIONS } from '$lib/constants/constants';
	import { ERROR_MESSAGES, INFO_MESSAGES, loadingMessage, STRINGS } from '$lib/constants/strings';
	import { ErrorAndReload, SuccessAndReload } from '$lib/constants/utils';
	import { CreateEmployeeSchema } from '$lib/schemas/createEmployeeSchema';
	import { employeeService } from '$lib/services/employeeService';
	import { roleService } from '$lib/services/roleService';
	import type { Role } from '$lib/types/role';
	import { validator } from '@felte/validator-zod';
	import Icon from '@iconify/svelte';
	import { createForm } from 'felte';
	import { onMount } from 'svelte';
	import ErrorScreen from '$lib/components/shared/ErrorScreen.svelte';

	let isLoading = false;
	let error: string | null = null;
	let roles: Role[] = [];
	let errorMessage = ERROR_MESSAGES.ROLE_LF_EMPLOYEE_C_DISABLED;
	let lockedForm = false;
	let selectedRoleId: number | null = null;

	$: selectedRole = roles.find((role) => role.id === selectedRoleId);

	const { form, errors, isSubmitting, reset, setErrors } = createForm({
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
		onSubmit: createEmployee
	});

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
		} finally {
			isLoading = false;
		}
	}

	async function createEmployee(values: CreateEmployeeSchema) {
		try {
			const response = await employeeService.createEmployee(values);
			SuccessAndReload(
				INFO_MESSAGES.SUCCESS_TAG,
				`Empleado registrado correctamente. Asignado ID: ${response.id}`
			);
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

	onMount(() => {
		loadRoles();
	});
</script>

<svelte:head>
	<title>Registro de Empleado | LongDrink</title>
</svelte:head>
{#if lockedForm && !isLoading}
	<ErrorScreen errorMessage={ERROR_MESSAGES.ROLE_LF_EMPLOYEE_C_DISABLED}></ErrorScreen>
{/if}
{#if isLoading}
	<LoadingScreen loadMessage={loadingMessage('formulario')}></LoadingScreen>
{:else if !isLoading && !lockedForm}
	<div class="m-0 md:m-5 md:flex md:flex-col md:items-center md:p-5">
		<div class="card w-full border bg-base-100 shadow-sm md:max-w-5xl">
			<form class="card-body" use:form>
				<h2 class="mb-2 text-start text-2xl font-light">Registro de Empleado</h2>
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
							<span>{STRINGS.SAVING_DOTS}</span>
						{:else}
							<Icon icon="lucide:save" />
							<span>{STRINGS.SAVE}</span>
						{/if}
					</button>
					<button class="btn w-full btn-neutral md:w-auto" type="reset" disabled={$isSubmitting}
						><Icon icon="lucide:delete" />{STRINGS.CLEAR}</button
					>
					<button
						class="btn w-full btn-error md:w-auto"
						type="button"
						disabled={$isSubmitting}
						on:click={() => goto('/dashboard/employee')}
						><Icon icon="lucide:x" />{STRINGS.CANCEL}</button
					>
				</div>
			</form>
		</div>
	</div>
{/if}
