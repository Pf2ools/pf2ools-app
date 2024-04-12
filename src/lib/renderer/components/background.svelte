<script lang="ts">
	import backgroundClass from '$lib/data/classes/backgroundClass';
	export let data: backgroundClass;
</script>

<div class="card p-3 pb-1.5">
	<h1 class="h2">{data.label}</h1>
	<hr />
	<div>
		{#each data.data.entries as entry}
			<p>{entry}</p>
		{/each}
	</div>
	<hr />
	<p class="text-right"><b>Source:</b> {data.sourceFull}</p>
</div>
