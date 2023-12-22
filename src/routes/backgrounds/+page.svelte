<script lang="ts">
	import type bg from '$lib/data/backgroundClass';
	import { settings } from '$lib';
	import ItemList from '$lib/components/ItemList.svelte';
	import cm from '$lib/data/contentManager';
	import type { columnType } from '$lib/components/ItemList.svelte';
	const { background: backgrounds } = cm;
	import { dev } from '$app/environment';

	let selected = $backgrounds[0];

	const columns = [
		{
			enabled: true,
			order: 1,
			label: 'Name',
			hover: 'Name',
			key: 'title',
			sortable: (a: bg, b: bg) => a.title.localeCompare(b.title),
			parser: (item: bg) => item.title,
			classes: 'text-left',
			span: -1, // -1 = fill remaining space, split between all -1s
		},
		{
			enabled: true,
			order: -1,
			label: 'Src.',
			hover: 'Source',
			key: 'sourceShort',
			sortable: (a: bg, b: bg) => a.sourceShort.localeCompare(b.sourceShort),
			parser: (item: bg) => item.sourceShort,
			classes: 'text-center',
			span: 2,
		},
		{
			enabled: true,
			order: 2,
			label: 'C.',
			hover: 'Count',
			key: 'abilityBoosts.count',
			sortable: (a: bg, b: bg) => (a?.abilityBoosts?.count ?? 0) - (b?.abilityBoosts?.count ?? 0),
			parser: (item: bg) => item?.abilityBoosts?.count ?? 0,
			classes: 'text-center',
			span: 1,
		},
		{
			enabled: true,
			order: 3,
			label: 'Ability Boosts',
			hover: 'Ability Boosts',
			key: 'abilityBoosts.array',
			parser: (item: bg) => item.abilityBoosts.array.join(', '),
			sortable: (a: bg, b: bg) => {
				// sort an array of strings including Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma, and Free in that order
				const order = [
					'Strength',
					'Dexterity',
					'Constitution',
					'Intelligence',
					'Wisdom',
					'Charisma',
					'Free',
				];
				const aBoosts = a.abilityBoosts.array;
				const bBoosts = b.abilityBoosts.array;
				for (let i = 0; i < Math.min(aBoosts.length, bBoosts.length); i++) {
					const aIndex = order.indexOf(aBoosts[i]);
					const bIndex = order.indexOf(bBoosts[i]);
					if (aIndex !== bIndex) return aIndex - bIndex;
				}
			},
			classes: 'text-left',
			span: 10,
		},
	] as columnType<bg>[];

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
	<div class="w-full h-slot grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-none gap-4">
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
