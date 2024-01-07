<script lang="ts">
	export let label = '';
	export let onClick = () => {};
	export let classes = '';
</script>

<button
	on:click={onClick}
	class="chip border-surface-400 border-token rounded-token px-0.5 py-px bg-interact-900 hover:bg-error-900 hover:line-through {classes}"
>
	{label}
	<slot name="inside" />
</button>

<slot name="outside" />
