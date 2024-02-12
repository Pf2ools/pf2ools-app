<script lang="ts">
	export let entries: (string | object)[] = [];
</script>

{#each entries as entry}
	{JSON.stringify(entry)}
{/each}
