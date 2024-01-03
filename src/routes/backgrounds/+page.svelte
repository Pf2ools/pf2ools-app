<script lang="ts">
	import ItemList from '$lib/components/ItemList.svelte';
	import cm from '$lib/data/contentManager';
	import { settings } from '$lib/settings';
	import { columns } from './columns';

	const { background: backgrounds } = cm;
	let selected = $backgrounds[0];
</script>

<svelte:head>
	<title>{selected ? selected.label : 'Backgrounds'} - pf2ools</title>
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
					<h1 class="h2">{selected.label}</h1>
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
