<script lang="ts">
	export let label = '';
	export let onClick = () => {};
	export let classes = '';
</script>

<button
	on:click={onClick}
	class="chip px-0.5 py-px bg-interact-700 hover:bg-error-800 hover:line-through {classes} min-w-5"
>
	{label}
	<slot name="inside" />
</button>

<slot name="outside" />
