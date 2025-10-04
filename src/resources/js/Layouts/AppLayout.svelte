<script>
    import Navbar from "@/Components/Shared/Navbar.svelte";
    import Sidebar from "@/Components/Shared/Sidebar.svelte";
</script>

<div class="drawer lg:drawer-open min-h-screen bg-base-100">
    <!-- Hidden checkbox for mobile toggle -->
    <input id="drawer-toggle" type="checkbox" class="drawer-toggle" />
    <!-- Sidebar -->
    <div class="drawer-side z-40">
        <label for="drawer-toggle" class="drawer-overlay"></label>
        <Sidebar />
    </div>
    <!-- Main content area -->
    <div class="drawer-content flex flex-col">
        <!-- Navbar -->
        <Navbar />
        <!-- Page content -->
        <main class="flex-1 overflow-x-hidden p-6">
            <slot />
        </main>
    </div>
</div>
