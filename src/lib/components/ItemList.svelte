<script lang="ts">
	import type { dataTypes } from '$lib';
	// TODO: replace background with "content" type
	export let items: dataTypes['background'][] = [];
	export let selected = items[0];
</script>

<div class="card flex flex-col pt-1">
	{#each items as item}
		<button
			class="px-2 border-b-next grid grid-cols-12 gap-x-2"
			class:variant-soft-primary={selected === item}
			on:click={() => (selected = item)}
		>
			<div class="text-left col-span-10">{item.name.primary}</div>
			<div class="text-center col-span-2">{item.source.ID}</div>
		</button>
	{/each}
</div>
