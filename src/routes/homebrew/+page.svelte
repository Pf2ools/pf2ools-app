<script lang="ts">
	import { contentManager, settings } from '$lib';
	import ItemList from '$lib/components/ItemList.svelte';
	const { homebrew, homebrewIndex, fetchHomebrew } = contentManager;

	function URLtoTitle(url: string) {
		return url
			.replace(/http(s|):\/\//g, '')
			.split('/')
			.slice(1)
			.join('/');
	}

	function flatFetchHomebrew() {
		return fetchHomebrew().then((index) => {
			console.log('Original Index', index);
			// turn an array of objects into an object with same keys as its sub-objects
			const obj = {};

			index.forEach((item) => {
				Object.keys(item).forEach((key) => {
					if (key === 'source') return;
					obj[key] = { ...item[key], source: item.source };
				});
			});

			const sources = [];
			Object.keys(obj).forEach((homebrew) => {
				sources.push({
					type: 'homebrewSource',
					id: homebrew,
					title: obj[homebrew].fullTitle,
					data: obj[homebrew],
				});
			});

			return sources;
		});
	}

	let selected = null;

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
</script>

<svelte:head>
	<title>Homebrew Manager - pf2ools</title>
</svelte:head>

<div
	class="container flex justify-center h-full flex-col"
	class:container={!$settings.wideMode}
	class:px-2={$settings.wideMode}
>
	<div class="w-full mb-1">
		<button class="btn py-2 border-token">buttons</button>
		<button class="btn py-2 border-token">go</button>
		<button class="btn py-2 border-token">here</button>
	</div>
	<div
		class="w-full h-[calc(var(--slotHeight)_-_2.75rem)] grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-none gap-2"
	>
		<div style="--listHeight: calc(var(--slotHeight) - 2.75rem)">
			{#await flatFetchHomebrew()}
				<p>Loading Homebrew Indexes...</p>
			{:then items}
				<ItemList bind:selected {items} {columns} />
			{/await}
		</div>
		<div class="[&_p]:-indent-5 [&_p]:ml-5">
			<div class="p-3 pb-1.5 card">
				{#if selected}
					<h1 class="h2">{selected.title}</h1>
					<hr />
					<div>aaaaaaaaaa</div>
					<hr />
					<p>
						{JSON.stringify(selected.data)}
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>
