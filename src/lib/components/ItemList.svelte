<script lang="ts">
	import type { dataTypes } from '$lib';
	// TODO: replace background with "content" type
	export let items: dataTypes['background'][] = [];
	type itemType = dataTypes['background'];
	export let selected = items[0];
	export let columns: columnType<itemType>[] = [];

	type columnType<T> = {
		enabled: boolean;
		order: number;
		label: string;
		key: string;
		sortable: (a: T, b: T) => number;
		parser: (item: T) => string;
		classes: string;
		span: number;
	};

	columns ??= [
		{
			enabled: true,
			order: 1,
			label: 'Name',
			key: 'name.primary',
			sortable: (a: itemType, b: itemType) => a.name.primary.localeCompare(b.name.primary),
			parser: (item: itemType) => item.name.primary,
			classes: 'text-left',
			span: -1, // -1 = fill remaining space
		},
		{
			enabled: true,
			order: -1,
			label: 'Source',
			key: 'source.ID',
			sortable: (a: itemType, b: itemType) => a.source.ID.localeCompare(b.source.ID),
			parser: (item: itemType) => item.source.ID,
			classes: 'text-center',
			span: 1,
		},
	];

	let remainingSpan = Math.max(
		1,
		columns.filter((col) => col.enabled).reduce((a, b) => Math.max(a, 0) - Math.max(b.span, 0), 12)
	);
</script>

<div class="card flex flex-col pt-1">
	{#each items as item}
		<button
			class="px-2 border-b-next gap-x-1 grid grid-cols-12 w-full text-sm"
			class:variant-soft-primary={selected === item}
			on:click={() => (selected = item)}
		>
			{#each columns
				.filter((col) => col.enabled)
				.sort( (a, b) => (a.order === -1 ? 1 : b.order === -1 ? -1 : a.order - b.order) ) as { classes, span, parser }}
				<div class="span-var {classes}" style="--span: {span === -1 ? remainingSpan : span}">
					{parser(item)}
				</div>
			{/each}
		</button>
	{/each}
</div>

<style>
	.span-var {
		grid-column: span var(--span) / span var(--span);
	}
</style>
