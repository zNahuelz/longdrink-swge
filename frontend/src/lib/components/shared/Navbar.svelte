
<div class="navbar bg-base-100 border-b border-base-300 px-4 lg:px-6">
    <div class="navbar-start">
        <label for="drawer-toggle" class="btn btn-ghost btn-circle lg:hidden">
            <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
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
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                <div class="indicator">
                    <i class="bi bi-bell h-5 w-5"></i>
                    <span class="badge badge-sm indicator-item badge-primary"
                        >3</span
                    >
                </div>
            </div>
            <div
                class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-80 shadow-lg"
            >
                <div class="card-body">
                    <h3 class="font-bold text-lg">Notificaciones</h3>
                    <div class="space-y-2">
                        <div class="p-2 hover:bg-base-200 rounded">
                            <p class="text-sm font-medium">
                                Nueva cita programada
                            </p>
                            <p class="text-xs text-base-content/70">
                                Hace 5 minutos
                            </p>
                        </div>
                        <div class="p-2 hover:bg-base-200 rounded">
                            <p class="text-sm font-medium">Pago recibido</p>
                            <p class="text-xs text-base-content/70">
                                Hace 10 minutos
                            </p>
                        </div>
                        <div class="p-2 hover:bg-base-200 rounded">
                            <p class="text-sm font-medium">
                                Nuevo paciente registrado
                            </p>
                            <p class="text-xs text-base-content/70">
                                Hace 1 hora
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <button class="btn btn-primary btn-wide"
                            >Ver todas</button
                        >
                    </div>
                </div>
            </div>
        </div>

        <!-- User Profile -->
        <div class="dropdown dropdown-end">
            <div
                tabindex="0"
                role="button"
                class="btn btn-ghost btn-circle avatar"
            >
                <div class="w-10 rounded-full">
                    <img alt="Profile Picture" src="#" />
                </div>
            </div>
            <ul
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
            >
                <li>
                    <a class="justify-between" href="#"> USERNAME...! </a>
                </li>
                <li><a href="#">Configuración</a></li>
            </ul>
        </div>
    </div>
</div>
