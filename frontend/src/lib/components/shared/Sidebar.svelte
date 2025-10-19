<script lang="ts">
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/authService';
	import Icon from '@iconify/svelte';

	async function logout() {
		await authService.logout();
		goto('/');
	}

	function goTo(page: string) {
		goto(page);
	}
</script>

<aside class="min-h-full w-64 border-r border-base-300 bg-base-200">
	<div class="border-b border-base-300 p-2">
		<div class="flex flex-col items-center gap-3">
			<div>
				<h2 class="text-center text-lg font-bold text-primary">Long Drink</h2>
				<p class="text-sm text-base-content/70">Sis. Gestión Estudiantil</p>
			</div>
		</div>
	</div>

	<div class="p-4">
		<ul class="menu gap-1 menu-sm">
			<li>
				<button
					type="button"
					on:click={() => goTo('/dashboard')}
					class="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-primary/50"
				>
					<Icon icon="lucide:house" class="text-lg leading-none"></Icon>
					<span class="font-medium">Inicio</span>
				</button>
			</li>

			<li>
				<button
					class="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-primary/50"
				>
					<Icon icon="lucide:notebook-pen" class="text-lg leading-none"></Icon>
					<span class="font-medium">Nueva venta</span>
				</button>
			</li>

			<li>
				<details>
					<summary
						class="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-primary/50"
					>
						<Icon icon="lucide:users-round" class="text-lg leading-none" />
						<span class="font-medium">Alumnos</span>
					</summary>
					<ul class="mt-2 ml-6 space-y-1">
						<li>
							<button type="button" class="block rounded px-3 py-1 hover:bg-primary/50"
								>Nuevo</button
							>
						</li>
						<li>
							<button
								type="button"
								on:click={() => goTo('/dashboard/student')}
								class="block rounded px-3 py-1 hover:bg-primary/50">Listado</button
							>
						</li>
					</ul>
				</details>
			</li>

			<li>
				<details>
					<summary
						class="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-primary/50"
					>
						<Icon icon="lucide:book-user" class="text-lg leading-none" />
						<span class="font-medium">Docentes</span>
					</summary>
					<ul class="mt-2 ml-6 space-y-1">
						<li>
							<button type="button" class="block rounded px-3 py-1 hover:bg-primary/50"
								>Nuevo</button
							>
						</li>
						<li>
							<button
								type="button"
								on:click={() => goTo('/dashboard/teacher')}
								class="block rounded px-3 py-1 hover:bg-primary/50">Listado</button
							>
						</li>
					</ul>
				</details>
			</li>

			<li>
				<details>
					<summary
						class="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-primary/50"
					>
						<Icon icon="lucide:person-standing" class="text-lg leading-none" />
						<span class="font-medium">Empleados</span>
					</summary>
					<ul class="mt-2 ml-6 space-y-1">
						<li>
							<button
								type="button"
								on:click={() => goTo('/dashboard/employee/new')}
								class="block rounded px-3 py-1 hover:bg-primary/50">Nuevo</button
							>
						</li>
						<li>
							<button
								type="button"
								on:click={() => goTo('/dashboard/employee')}
								class="block rounded px-3 py-1 hover:bg-primary/50">Listado</button
							>
						</li>
					</ul>
				</details>
			</li>

			<li>
				<details>
					<summary
						class="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-primary/50"
					>
						<Icon icon="lucide:package-check" class="text-lg leading-none"></Icon>
						<span class="font-medium">Secciones</span>
					</summary>
					<ul class="mt-2 ml-6 space-y-1">
						<li>
							<button type="button" class="block rounded px-3 py-1 hover:bg-primary/50"
								>Nuevo</button
							>
						</li>
						<li>
							<button type="button" class="block rounded px-3 py-1 hover:bg-primary/50"
								>Listado</button
							>
						</li>
					</ul>
				</details>
			</li>

			<li>
				<details>
					<summary
						class="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-primary/50"
					>
						<Icon icon="lucide:package-check" class="text-lg leading-none"></Icon>
						<span class="font-medium">Turnos</span>
					</summary>
					<ul class="mt-2 ml-6 space-y-1">
						<li>
							<button type="button" class="block rounded px-3 py-1 hover:bg-primary/50"
								>Nuevo</button
							>
						</li>
						<li>
							<button type="button" class="block rounded px-3 py-1 hover:bg-primary/50"
								>Listado</button
							>
						</li>
					</ul>
				</details>
			</li>

			<li>
				<details>
					<summary
						class="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-primary/50"
					>
						<Icon icon="lucide:package-check" class="text-lg leading-none"></Icon>
						<span class="font-medium">Guías de Estudio</span>
					</summary>
					<ul class="mt-2 ml-6 space-y-1">
						<li>
							<button type="button" class="block rounded px-3 py-1 hover:bg-primary/50"
								>Nuevo</button
							>
						</li>
						<li>
							<button type="button" class="block rounded px-3 py-1 hover:bg-primary/50"
								>Listado</button
							>
						</li>
					</ul>
				</details>
			</li>

			<li>
				<button
					type="button"
					class="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-primary/50"
				>
					<Icon icon="lucide:package-check" class="text-lg leading-none"></Icon>
					<span class="font-medium">Configuración</span>
				</button>
			</li>

			<li>
				<button
					type="button"
					on:click={logout}
					class="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-error/10 hover:text-error"
				>
					<Icon icon="lucide:log-out" class="h-5 w-5" />
					<span class="font-medium">Cerrar Sesión</span>
				</button>
			</li>
		</ul>
	</div>
</aside>
