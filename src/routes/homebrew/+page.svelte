<script lang="ts">
	import cm from '$lib/data/contentManager';
	const { homebrew, background } = cm;

	let homebrewString = JSON.stringify($homebrew, null, 2);

	$: {
		try {
			$homebrew = JSON.parse(homebrewString);
		} catch (err) {
			console.error(err);
		}
	}
</script>

<svelte:head>
	<title>Backgrounds - pf2ools</title>
</svelte:head>

<div class="container flex justify-center h-full">
	<div class="w-full grid grid-cols-2">
		<div class="space-y-5">
			{#each $homebrew as homebrews}
				<p>
					"{homebrews?.source?.ID}" homebrew with {homebrews?.background?.length} background(s)
				</p>
			{/each}
			<p>All in addition to the {cm.core.background.length} backgrounds from Core sources</p>
		</div>
		<textarea class="textarea" bind:value={homebrewString}></textarea>
	</div>
</div>
