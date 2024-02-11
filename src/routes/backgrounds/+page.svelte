<script lang="ts">
	import { backgrounds as data } from '$lib/data/backgrounds';
	import ItemList from '$lib/ui/ItemList.svelte';
	import { settings } from '$lib/settings';
	import { writable, get, type Readable } from 'svelte/store';
	import { columns } from './columns';
	import { getContext } from 'svelte';
	import { dev } from '$app/environment';
	import Background from '$lib/renderer/components/background.svelte';

	const backgrounds = data.store;
	let selected = $backgrounds[0];
	if (dev) console.log('Backgrounds Data', data);

	let listHeight = 0;
	let listHeightStore = writable(0);
	const slotHeightStore: Readable<number> = getContext('slotHeight');

	listHeightStore.subscribe((value) => {
		if (value > get(slotHeightStore)) listHeight = value;
		if (value < get(slotHeightStore)) listHeight = get(slotHeightStore) - 20;
	});
</script>

<svelte:head>
	<title>{selected ? selected.label : 'Backgrounds'} - pf2ools</title>
</svelte:head>

<div
	class="flex justify-center h-full"
	class:container={!$settings.wideMode}
	class:px-2={$settings.wideMode}
	style="--listHeight: {listHeight}px"
>
	<div class="w-full h-slot grid grid-rows-2 lg:grid-cols-5 lg:grid-rows-none gap-4">
		<ItemList bind:selected items={$backgrounds} {columns} classes="lg:col-span-3" />
		<div class="[&_p]:-indent-5 [&_p]:ml-5 lg:col-span-2">
			<div bind:clientHeight={$listHeightStore}>
				<Background data={selected} />
			</div>
		</div>
	</div>
</div>
