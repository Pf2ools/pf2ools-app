<script lang="ts">
	import { dev } from '$app/environment';
	import { getModalStore } from '@skeletonlabs/skeleton';
	export let parent: any;
	const modalStore = getModalStore();

	const filter = $modalStore[0].value;

	if (filter && dev) console.log(filter);

	function response() {
		return 'lmao';
	}
</script>

{#if $modalStore[0]}
	<div
		class="w-modal-wide {parent.background} p-3 rounded-container-token space-y-2 drop-shadow-lg"
	>
		<div id="body" class="">lol test</div>
		<hr />
		<div id="footer" class="{parent.regionFooter} justify-center">
			<button
				class="btn btn-primary border-token border-surface-500-400-token variant-ghost-warning"
				on:click={() => {
					$modalStore[0].response?.(response());
					modalStore.close();
				}}
			>
				Save
			</button>
			<button
				class="btn btn-primary border-token border-surface-500-400-token variant-ghost-surface"
				on:click={() => modalStore.close()}
			>
				Cancel
			</button>
		</div>
	</div>
{/if}
