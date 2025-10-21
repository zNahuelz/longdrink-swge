<script lang="ts">
	import Icon from '@iconify/svelte';
	export let label: string = 'Elemento';
	export let iconifyIcon: string = 'lucide:user';
	export let value: string | any = 'N/A';
	export let colSpan: string = '1';
	export let textColor: string = '';
	export let fontWeight: string = '';
</script>

<fieldset class="fieldset col-span-{colSpan}">
	<legend class="fieldset-legend">{label}</legend>
	<label class="input w-full">
		<Icon icon={iconifyIcon} class="h-[1em] opacity-50" />
		<input
			type="text"
			name="paternalSurname"
			readonly
			{value}
			class="text-{textColor} font-{fontWeight}"
		/>
	</label>
</fieldset>
