<script lang="ts">
	import { authService } from '$lib/services/authService.js';

</script>

<h1>Dashboard</h1>
<p>Your JWT: {authService.getToken()}</p>