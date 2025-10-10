<script lang="ts">
	import { authService } from '$lib/services/authService';
	import { goto } from '$app/navigation';
	import loginIcon from '$lib/assets/images/login_icon_black.png';
	import { loginSchema, type LoginSchema } from '$lib/schemas/loginSchema';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	let error = '';

	async function login(values: LoginSchema) {
		error = '';
		try {
			await authService.login(values.username, values.password, values.rememberMe);
			goto('/dashboard', { state: { welcome: true } });
		} catch (err) {
			error = err instanceof Error ? err.message : '';
			reset();
		}
	}

	const { form, errors, isSubmitting, reset } = createForm({
		initialValues: { username: '', password: '', rememberMe: false },
		extend: validator({ schema: loginSchema }),
		onSubmit: login
	});
</script>

<svelte:head>
	<title>Inicio de Sesión | LongDrink</title>
	<meta name="description" content="Sistema de Gestión Estudiantil - LongDrink" />
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center bg-secondary/10">
	<div class="card w-100 bg-base-100 p-6 shadow-xl">
		<h1 class="text-center text-xl font-bold">Inicio de Sesión</h1>
		<div class="mt-2 flex flex-col items-center">
			<img alt="LongDrink Logo" src={loginIcon} class="h-30 w-20" on:contextmenu|preventDefault />
			<i class="bi bi-shop text-dark mb-4 text-[100px]"></i>
		</div>
		<form class="space-y-3" use:form on:submit|preventDefault>
			<label class="input-bordered input w-full {$errors.username ? 'input-error' : ''}">
				<i class="bi bi-envelope text-xl opacity-50"></i>
				<input type="text" name="username" placeholder="Nombre de Usuario" class="grow" />
			</label>
			{#if $errors.username}
				<p class="text-sm text-error">{$errors.username}</p>
			{/if}
			<label class="input-bordered input w-full {$errors.password ? 'input-error' : ''}">
				<i class="bi bi-key text-xl opacity-50"></i>
				<input type="password" name="password" placeholder="Contraseña" class="grow" />
			</label>
			{#if $errors.password}
				<p class="text-sm text-error">{$errors.password}</p>
			{/if}
			<label class="label">
				<input type="checkbox" name="rememberMe" class="checkbox checkbox-sm checkbox-primary" />
				Recuérdame
			</label>
			<p class="mb-3 text-center text-sm">
				¿Olvidaste tu contraseña?
				<span class="font-bold text-primary/50 hover:text-primary">Click aquí</span>
			</p>
			<div class="flex flex-col items-center">
				<button class="btn w-40 btn-md btn-primary" type="submit" disabled={$isSubmitting}>
					{#if $isSubmitting}
						<span class="loading loading-lg loading-dots"></span>
						<span>Ingresando</span>
					{:else}
						<span>Iniciar Sesión</span>
					{/if}
				</button>
			</div>
			{#if error}
				<p class="text-center text-sm text-error">{error}</p>
			{/if}
		</form>
	</div>
</div>
