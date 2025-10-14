<script lang="ts">
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/authService';
	import { get } from 'svelte/store';
	import { authStore } from '../../../stores/userStore';

	async function logout() {
		await authService.logout();
		goto('/');
	}
</script>

<div class="navbar border-b border-base-300 bg-base-100 px-4 lg:px-6">
	<div class="navbar-start">
		<label for="drawer-toggle" class="btn btn-circle btn-ghost lg:hidden">
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				></path>
			</svg>
		</label>
	</div>

	<!-- Center - can add breadcrumbs or search here -->
	<div class="navbar-center hidden lg:flex">
		<!-- Optional: Add search or breadcrumbs -->
	</div>

	<!-- Right side -->
	<div class="navbar-end gap-2">
		<!-- Notifications -->
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-circle btn-ghost">
				<div class="indicator">
					<i class="bi bi-bell h-5 w-5"></i>
					<span class="indicator-item badge badge-sm badge-primary">3</span>
				</div>
			</div>
			<div class="card-compact dropdown-content card z-[1] mt-3 w-80 bg-base-100 shadow-lg">
				<div class="card-body">
					<h3 class="text-lg font-bold">Notificaciones</h3>
					<div class="space-y-2">
						<div class="rounded p-2 hover:bg-base-200">
							<p class="text-sm font-medium">Nueva cita programada</p>
							<p class="text-xs text-base-content/70">Hace 5 minutos</p>
						</div>
						<div class="rounded p-2 hover:bg-base-200">
							<p class="text-sm font-medium">Pago recibido</p>
							<p class="text-xs text-base-content/70">Hace 10 minutos</p>
						</div>
						<div class="rounded p-2 hover:bg-base-200">
							<p class="text-sm font-medium">Nuevo paciente registrado</p>
							<p class="text-xs text-base-content/70">Hace 1 hora</p>
						</div>
					</div>
					<div class="flex flex-col items-center">
						<button class="btn btn-wide btn-primary">Ver todas</button>
					</div>
				</div>
			</div>
		</div>

		<!-- User Profile -->
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn avatar btn-circle btn-ghost">
				<div class="w-10 rounded-full">
					<img alt="User Avatar" src="#" />
				</div>
			</div>
			<ul
				class="dropdown-content menu z-[1] mt-3 w-52 menu-sm rounded-box bg-base-100 p-2 shadow-lg"
			>
				<li>
					<button type="button" class="justify-between">
						{#if $authStore.user}
							{$authStore.user.username}
						{/if}</button
					>
				</li>
				<li><button type="button">Configuración</button></li>
				<li><button type="button" on:click={logout}>Cerrar Sesión</button></li>
			</ul>
		</div>
	</div>
</div>
