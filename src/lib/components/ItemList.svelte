<script lang="ts">
	import type { dataTypes } from '$lib';
	// TODO: replace background with "content" type
	export let items: dataTypes['background'][] = [];
	type itemType = (typeof items)[number];
	export let selected = items[0];
	export let columns = [
		{
			enabled: true,
			order: 0,
			label: 'Name',
			key: 'name.primary',
			sortable: (a: itemType, b: itemType) => a.name.primary.localeCompare(b.name.primary),
			classes: 'text-left',
			span: 0, // 0 = whatever remains to a minimum of 2
		},
		{
			enabled: true,
			order: -1,
			label: 'Source',
			key: 'source.ID',
			sortable: (a: itemType, b: itemType) => a.source.ID.localeCompare(b.source.ID),
			classes: 'text-center',
			span: 1,
		},
	];

	let remainingSpan = Math.max(
		2,
		columns.filter((col) => col.enabled).reduce((a, b) => a - b.span, 12)
	);

	$: console.log(remainingSpan);
</script>

<div class="card flex flex-col pt-1">
	{#each items as item}
		<button
			class="px-2 border-b-next gap-x-2 grid grid-cols-12 w-full"
			class:variant-soft-primary={selected === item}
			on:click={() => (selected = item)}
		>
			{#each columns
				.filter((col) => col.enabled)
				.sort((a, b) => b.order - a.order) as { classes, key, span }}
				<div
					class={classes}
					style="grid-column: span {span || remainingSpan} / span {span || remainingSpan}"
				>
					{key.split('.').reduce((a, b) => a?.[b], item)}
				</div>
			{/each}
		</button>
	{/each}
</div>
