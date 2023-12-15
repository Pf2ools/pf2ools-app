<script lang="ts">
	import { settings } from '$lib';
	import ItemList from '$lib/components/ItemList.svelte';
	import cm, { type dataTypes } from '$lib/data/contentManager';
	import { objBoolsToArray } from '$lib/utils';
	const { background: backgrounds } = cm;
	type bg = dataTypes['background'];

	let selected = $backgrounds[0];

	const columns = [
		{
			enabled: true,
			order: 1,
			label: 'Name',
			key: 'name.primary',
			sortable: (a: bg, b: bg) => a.name.primary.localeCompare(b.name.primary),
			parser: (item: bg) => item.name.primary,
			classes: 'text-left',
			span: -1, // -1 = fill remaining space, split between all -1s
		},
		{
			enabled: true,
			order: -1,
			label: 'Source',
			key: 'source.ID',
			sortable: (a: bg, b: bg) => a.source.ID.localeCompare(b.source.ID),
			parser: (item: bg) => item.source.ID,
			classes: 'text-center',
			span: 1,
		},
		// Custom
		{
			enabled: true,
			order: 2,
			label: 'AB Count',
			key: 'tags.abilityBoosts.count',
			sortable: (a: bg, b: bg) =>
				(a?.tags?.abilityBoosts?.count ?? 0) - (b?.tags?.abilityBoosts?.count ?? 0),
			parser: (item: bg) => item?.tags?.abilityBoosts?.count ?? 0,
			classes: 'text-left',
			span: 1,
		},
		{
			enabled: true,
			order: 3,
			label: 'Ability Boosts',
			key: 'tags.abilityBoosts.abilities',
			parser: (item: bg) => objBoolsToArray(item?.tags?.abilityBoosts?.abilities ?? {}).join(', '),
			sortable: (a: bg, b: bg) =>
				(a?.tags?.abilityBoosts?.count ?? 0) - (b?.tags?.abilityBoosts?.count ?? 0),
			classes: 'text-left',
			span: 5,
		},
	];

	$: console.log(selected);
</script>

<svelte:head>
	<title>Backgrounds - pf2ools</title>
</svelte:head>

<div
	class="flex justify-center h-full"
	class:container={!$settings.wideMode}
	class:px-2={$settings.wideMode}
>
	<div class="text-center w-full h-slot grid grid-cols-2 gap-2">
		<div class="overflow-y-scroll">
			<ItemList bind:selected items={$backgrounds} {columns} />
		</div>
		<div class="overflow-y-scroll">
			<div class="p-3 card">
				{#if selected}
					<h1 class="h2">{selected.name.primary}</h1>
					<p>Source: {selected.source.ID}</p>
					<div>
						{#each selected.data.entries as entry}
							<p>{entry}</p>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
