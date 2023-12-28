<script lang="ts">
	import { settings } from '$lib/settings';
	import contentManager, { type classTypes } from '$lib/data/contentManager';
	import ItemList from '$lib/components/ItemList.svelte';
	import { joinConjunct } from '$lib/utils';
	import { onMount } from 'svelte';
	import type HomebrewSource from '$lib/data/classes/homebrewSourceClass';
	import { dev } from '$app/environment';
	import { readable, type Readable } from 'svelte/store';
	const { homebrew, homebrewSources } = contentManager;

	let selected: HomebrewSource;
	let isInstalled = readable(false);

	const columns = [
		{
			enabled: true,
			order: 1,
			label: 'Name',
			hover: 'Name',
			key: 'title',
			sortable: (a: any, b: any) => a.title.localeCompare(b.title),
			parser: (item: any) => item.title,
			classes: 'text-left',
			span: -1, // -1 = fill remaining space, split between all -1s
		},
	];

	onMount(async () => {
		if ($homebrewSources.length === 0) await contentManager.fetchHomebrewIndex();
	});

	$: if (dev) console.log(selected);
	$: if (selected) ({ isInstalled } = selected);
</script>

<svelte:head>
	<title>Homebrew Manager - pf2ools</title>
</svelte:head>

<div
	class="container flex justify-center h-full flex-col"
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

	<div class="w-full h-slot grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-none gap-2">
		<!-- <div style="--listHeight: calc(var(--slotHeight) - 2.75rem)"> -->
		<ItemList bind:selected items={$homebrewSources} {columns} />
		<!-- </div> -->
		<div>
			<div class="p-3 pb-1.5 card space-y-1">
				{#if selected}
					<h3 class="h3">{selected.title}</h3>
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
					<div class="grid grid-cols-3 gap-1 text-center">
						<button
							class="btn-sm rounded-token border-token border-surface-500-400-token"
							on:click={() => selected.addToHomebrew()}
						>
							Download / Update
						</button>
						<button
							class="btn-sm rounded-token border-token border-surface-500-400-token disabled:opacity-50"
							disabled={!$isInstalled}
							class:variant-soft-error={$isInstalled}
							on:click={() => (selected = selected) && selected.deleteFromHomebrew()}
						>
							Delete
						</button>
						<a
							href={selected.URL}
							target="_blank"
							class="btn-sm rounded-token border-token border-surface-500-400-token flex items-center justify-center"
						>
							See Code <iconify-icon icon="mdi:open-in-new" class="pl-1" />
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
