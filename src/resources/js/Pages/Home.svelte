<script>
    import Layout from "@/Layouts/AppLayout.svelte";
    import AppLayout from "../Layouts/AppLayout.svelte";
    $: document.title = `LongDrink --- Dev.`;
</script>

<AppLayout>
    <h1>Hello World!</h1>
    <div class="p-6 space-y-4 text-center">
        <h2 class="text-lg font-bold">Iconify Test</h2>
    </div>
</AppLayout>
