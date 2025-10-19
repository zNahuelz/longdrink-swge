<script lang="ts">
  import { page } from '$app/stores';

  $: id = $page.params.id;
</script>

<h1>Detalle de empleado de ID: {id}</h1>