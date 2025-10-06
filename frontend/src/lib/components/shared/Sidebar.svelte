<script lang="ts">
    import Icon from "@iconify/svelte";
</script>

<aside class="min-h-full w-64 bg-base-200 border-r border-base-300">
    <!-- Logo Section -->
    <div class="p-2 border-b border-base-300">
        <div class="flex flex-col items-center gap-3">
            <div>
                <h2 class="font-bold text-lg text-primary text-center">
                    Long Drink
                </h2>
                <p class="text-sm text-base-content/70">
                    Sis. Gestión Estudiantil
                </p>
            </div>
        </div>
    </div>

    <!-- Navigation Menu -->
    <div class="p-4">
        <ul class="menu menu-sm gap-1">
            <!-- Dashboard -->
            <li>
                <button
                    type="button"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-primary/50"
                >
                    <Icon icon="lucide:house" class="text-lg leading-none"
                    ></Icon>
                    <span class="font-medium">Inicio</span>
                </button>
            </li>

            <!-- Nueva Venta -->
            <li>
                <a
                    href="#"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-primary/50"
                >
                    <Icon
                        icon="lucide:notebook-pen"
                        class="text-lg leading-none"
                    ></Icon>
                    <span class="font-medium">Nueva venta</span>
                </a>
            </li>

            <!-- Productos Dropdown -->
            <li>
                <details>
                    <summary
                        class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-primary/50"
                    >
                        <Icon
                            icon="lucide:package-check"
                            class="text-lg leading-none"
                        ></Icon>
                        <span class="font-medium">Alumnos</span>
                    </summary>
                    <ul class="ml-6 mt-2 space-y-1">
                        <li>
                            <a
                                href="#"
                                class="block px-3 py-1 rounded hover:bg-primary/50"
                                >Nuevo</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block px-3 py-1 rounded hover:bg-primary/50"
                                >Listado</a
                            >
                        </li>
                    </ul>
                </details>
            </li>

            <li>
                <details>
                    <summary
                        class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-primary/50"
                    >
                        <Icon
                            icon="lucide:package-check"
                            class="text-lg leading-none"
                        ></Icon>
                        <span class="font-medium">Docentes</span>
                    </summary>
                    <ul class="ml-6 mt-2 space-y-1">
                        <li>
                            <a
                                href="#"
                                class="block px-3 py-1 rounded hover:bg-primary/50"
                                >Nuevo</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block px-3 py-1 rounded hover:bg-primary/50"
                                >Listado</a
                            >
                        </li>
                    </ul>
                </details>
            </li>

            <li>
                <details>
                    <summary
                        class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-primary/50"
                    >
                        <Icon
                            icon="lucide:package-check"
                            class="text-lg leading-none"
                        ></Icon>
                        <span class="font-medium">Secciones</span>
                    </summary>
                    <ul class="ml-6 mt-2 space-y-1">
                        <li>
                            <a
                                href="#"
                                class="block px-3 py-1 rounded hover:bg-primary/50"
                                >Nuevo</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block px-3 py-1 rounded hover:bg-primary/50"
                                >Listado</a
                            >
                        </li>
                    </ul>
                </details>
            </li>

            <li>
                <details>
                    <summary
                        class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-primary/50"
                    >
                        <Icon
                            icon="lucide:package-check"
                            class="text-lg leading-none"
                        ></Icon>
                        <span class="font-medium">Turnos</span>
                    </summary>
                    <ul class="ml-6 mt-2 space-y-1">
                        <li>
                            <a
                                href="#"
                                class="block px-3 py-1 rounded hover:bg-primary/50"
                                >Nuevo</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block px-3 py-1 rounded hover:bg-primary/50"
                                >Listado</a
                            >
                        </li>
                    </ul>
                </details>
            </li>

            <li>
                <details>
                    <summary
                        class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-primary/50"
                    >
                        <Icon
                            icon="lucide:package-check"
                            class="text-lg leading-none"
                        ></Icon>
                        <span class="font-medium">Guías de Estudio</span>
                    </summary>
                    <ul class="ml-6 mt-2 space-y-1">
                        <li>
                            <a
                                href="#"
                                class="block px-3 py-1 rounded hover:bg-primary/50"
                                >Nuevo</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block px-3 py-1 rounded hover:bg-primary/50"
                                >Listado</a
                            >
                        </li>
                    </ul>
                </details>
            </li>

            <!-- Settings -->
            <li>
                <a
                    href="#"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-primary/50"
                >
                    <Icon
                        icon="lucide:package-check"
                        class="text-lg leading-none"
                    ></Icon>
                    <span class="font-medium">Configuración</span>
                </a>
            </li>

            <!-- Logout -->
            <li>
                <a
                    href="#"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-error/10 text-error"
                >
                    <Icon icon="lucide:package-check" class="w-5 h-5"></Icon>
                    <span class="font-medium">Cerrar Sesión</span>
                </a>
            </li>
        </ul>
    </div>
</aside>
