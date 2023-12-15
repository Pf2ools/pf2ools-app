<script lang="ts">
	import ItemList from '$lib/components/ItemList.svelte';
	import cm from '$lib/data/contentManager';
	const { background: backgrounds } = cm;

	let selected = $backgrounds[0];
</script>

<svelte:head>
	<title>Backgrounds - pf2ools</title>
</svelte:head>

<div class="container flex justify-center h-full">
	<div class="text-center w-full h-slot grid grid-cols-2 gap-2">
		<div class="overflow-y-scroll">
			<ItemList bind:selected items={$backgrounds} />
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
