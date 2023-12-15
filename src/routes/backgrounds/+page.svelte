<script lang="ts">
	import cm from '$lib/data/contentManager';
	const { background: backgrounds } = cm;

	let selected = $backgrounds[0];
</script>

<svelte:head>
	<title>Backgrounds - pf2ools</title>
</svelte:head>

<div class="container flex justify-center h-full">
	<div class="text-center border w-full h-slot grid grid-cols-2">
		<div class="overflow-scroll flex flex-col">
			{#each $backgrounds as bg}
				<button on:click={() => (selected = bg)}>{bg.name.primary} from {bg.source.ID}</button>
			{/each}
		</div>
		<div class="overflow-scroll flex flex-col">
			<div class="pt-2">
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
