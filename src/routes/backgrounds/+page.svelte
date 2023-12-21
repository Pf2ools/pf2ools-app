<script lang="ts">
	import type bg from '$lib/data/backgroundClass';
	import { settings } from '$lib';
	import ItemList from '$lib/components/ItemList.svelte';
	import cm from '$lib/data/contentManager';
	import { objBoolsToArray } from '$lib/utils';
	const { background: backgrounds } = cm;
	import { dev } from '$app/environment';

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
			key: 'sourceShort',
			sortable: (a: bg, b: bg) => a.sourceShort.localeCompare(b.sourceShort),
			parser: (item: bg) => item.sourceShort,
			classes: 'text-center',
			span: 3,
		},
		{
			enabled: true,
			order: 2,
			label: 'Count',
			key: 'tags.abilityBoosts.count',
			sortable: (a: bg, b: bg) =>
				(a?.tags?.abilityBoosts?.count ?? 0) - (b?.tags?.abilityBoosts?.count ?? 0),
			parser: (item: bg) => item?.tags?.abilityBoosts?.count ?? 0,
			classes: 'text-center',
			span: 3,
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
			span: 10,
		},
	];

	$: if (dev) console.log(selected);
</script>

<svelte:head>
	<title>{selected ? selected.title : 'Backgrounds'} - pf2ools</title>
</svelte:head>

<div
	class="flex justify-center h-full"
	class:container={!$settings.wideMode}
	class:px-2={$settings.wideMode}
>
	<div class="w-full h-slot grid grid-cols-2 gap-4">
		<ItemList bind:selected items={$backgrounds} {columns} />
		<div class="[&_p]:-indent-5 [&_p]:ml-5">
			<div class="p-3 pb-1.5 card">
				{#if selected}
					<h1 class="h2">{selected.title}</h1>
					<hr />
					<div>
						{#each selected.data.entries as entry}
							<p>{entry}</p>
						{/each}
					</div>
					<hr />
					<p class="text-right"><b>Source:</b> {selected.sourceFull}</p>
				{/if}
			</div>
		</div>
	</div>
</div>
