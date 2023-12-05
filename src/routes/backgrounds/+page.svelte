<script lang="ts">
	import background from '$lib/data/backgrounds';
	console.log(background);
</script>

<div class="container flex justify-center h-full">
	<div class="space-y-5">
		{#each background.data as bg}
			<p>{bg.name.primary}</p>
		{/each}
	</div>
</div>
