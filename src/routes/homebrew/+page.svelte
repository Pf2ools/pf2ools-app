<script lang="ts">
	import { dev } from '$app/environment';
	import ItemList, { type columnType } from '$lib/ui/ItemList.svelte';
	import type HomebrewSource from '$lib/data/classes/homebrewSourceClass';
	import contentManager from '$lib/data/contentManager';
	import { settings } from '$lib/settings';
	import { dateConvert, joinConjunct } from '$lib/utils';
	import { onMount } from 'svelte';
	import { readable } from 'svelte/store';
	const { homebrewSources } = contentManager;

	let selected: HomebrewSource;
	let isInstalled = readable(false);
	let isThereNewerVersion = readable(false);

	type T = HomebrewSource;
	let columns = [
		{
			enabled: true,
			order: 1,
			label: 'Name',
			hover: 'Name',
			key: 'label',
			sortable: (a: T, b: T) => a.label.localeCompare(b.label),
			parser: (item: T) => item.label,
			classes: 'text-left',
			span: -1, // -1 = fill remaining space, split between all -1s
		},
		{
			enabled: true,
			order: 1,
			label: 'U.',
			hover: 'Update Available',
			key: 'updateAvailable',
			sortable: (a: T, b: T) => Number(a.updateAvailable) - Number(b.updateAvailable),
			parser: (item: T) => (item.updateAvailable ? '⚠️' : ''),
			classes: 'text-center',
			span: 1,
			sorted: -1,
			sortedHidden: true,
		},
		{
			enabled: true,
			order: 1,
			label: 'I.',
			hover: 'Installed',
			key: 'isInstalled',
			sortable: (a: T, b: T) => Number(a._isInstalled) - Number(b._isInstalled),
			parser: (item: T) => (item._isInstalled ? '✅' : ''),
			classes: 'text-center',
			span: 1,
			sorted: -1,
			sortedHidden: true,
		},
		{
			enabled: true,
			order: 1,
			label: 'Modified',
			hover: 'Modified',
			key: 'modifier',
			sortable: (a: T, b: T) => dateConvert(a.modified) > dateConvert(b.modified),
			parser: (item: T) => item.modified,
			classes: 'text-center',
			span: 5,
			sorted: 1,
		},
		{
			enabled: true,
			order: 1,
			label: 'ID',
			hover: 'ID',
			key: 'ID',
			sortable: (a: T, b: T) => a.ID.localeCompare(b.ID),
			parser: (item: T) => item.ID,
			classes: 'text-center',
			span: 4,
		},
	] as columnType<T>[];

	onMount(async () => {
		if ($homebrewSources.length === 0) await contentManager.fetchHomebrewIndex();
	});

	$: if (dev) console.log(selected);
	$: if (selected) ({ isInstalled, isThereNewerVersion } = selected);
	$: selected, (columns = columns);

	function dblClick(item: T) {
		item.addToHomebrew().then(() => (selected = item));
	}
</script>

<svelte:head>
	<title>Homebrew Manager - pf2ools</title>
</svelte:head>

<div
	class="container flex h-full flex-col justify-center"
	class:container={!$settings.wideMode}
	class:px-2={$settings.wideMode}
>
	<!--

	<div class="w-full mb-1">
		<button class="btn py-2 border-token">buttons</button>
		<button class="btn py-2 border-token">go</button>
		<button class="btn py-2 border-token">here</button>
		<button class="btn py-2 border-token">and</button>
		<button class="btn py-2 border-token">I</button>
		<button class="btn py-2 border-token">honestly</button>
		<button class="btn py-2 border-token">forgot</button>
		<button class="btn py-2 border-token">what</button>
		<button class="btn py-2 border-token">would</button>
		<button class="btn py-2 border-token">these</button>
		<button class="btn py-2 border-token">be</button>
		<button class="btn py-2 border-token">for</button>
	</div>

		h-[calc(var(--slotHeight)_-_2.75rem)]
	-->

	<div class="grid h-slot w-full grid-rows-2 gap-2 lg:grid-cols-2 lg:grid-rows-none">
		<!-- <div style="--listHeight: calc(var(--slotHeight) - 2.75rem)"> -->
		<ItemList
			bind:selected
			items={$homebrewSources}
			{columns}
			{dblClick}
			title="Double Click to immediately download."
		/>
		<!-- </div> -->
		<div>
			<div class="card space-y-1 p-3 pb-1.5">
				{#if selected}
					<h3 class="h3">{selected.label}</h3>
					<hr />
					<div class="grid grid-cols-3 text-center">
						<div class="border-r-next p-1"><b>Released:</b> {selected.released}</div>
						<div class="border-r-next p-1"><b>Added:</b> {selected.added}</div>
						<div class="border-r-next p-1"><b>Updated:</b> {selected.modified}</div>
					</div>
					<hr />
					<div>
						<p>
							<b>Contains:</b>
							{joinConjunct(selected.datatypes)}
						</p>
						<p>
							<b>Author(s):</b>
							{selected.publisherAuthors}
						</p>
					</div>
					<div class="grid grid-cols-6 gap-1 text-center">
						<button
							class="generic-disabled border-surface-500-400-token btn-sm col-span-2 border-token rounded-token"
							on:click={async () => {
								await selected.addToHomebrew();
								selected = selected;
							}}
							disabled={!$isThereNewerVersion}
						>
							<iconify-icon icon="mdi:download" class="align-text-bottom text-lg" />
							{$isInstalled && $isThereNewerVersion ? 'Update' : 'Download'}
						</button>
						<button
							class="generic-disabled border-surface-500-400-token btn-sm col-span-2 border-token rounded-token"
							disabled={!$isInstalled}
							class:variant-soft-error={$isInstalled}
							on:click={() => (selected = selected) && selected.deleteFromHomebrew()}
						>
							<iconify-icon icon="mdi:trash-can" class="align-text-bottom text-lg" /> Delete
						</button>
						<a
							href={selected.URL}
							target="_blank"
							rel="noopener noreferrer"
							class="border-surface-500-400-token btn-sm flex items-center justify-center border-token rounded-token"
						>
							Source <iconify-icon icon="mdi:open-in-new" class="pl-1" />
						</a>
						<a
							href={selected.downloadURL}
							target="_blank"
							rel="noopener noreferrer"
							class="border-surface-500-400-token btn-sm flex items-center justify-center border-token rounded-token"
						>
							Code <iconify-icon icon="mdi:open-in-new" class="pl-1" />
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
