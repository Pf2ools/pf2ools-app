<script lang="ts">
	import cm from '$lib/data/contentManager';
	const { backgrounds } = cm;
</script>

<svelte:head>
	<title>Backgrounds - pf2ools</title>
</svelte:head>

<div class="container flex justify-center h-full">
	<div class="text-center border w-full h-slot overflow-scroll">
		{#each $backgrounds as bg}
			<p>{bg.name.primary} from {bg.source.ID}</p>
		{/each}
	</div>
</div>
