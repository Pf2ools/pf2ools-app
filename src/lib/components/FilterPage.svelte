<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	if ($modalStore[0]) console.log($modalStore[0]);
</script>

{#if $modalStore[0]}
	<div
		class="w-modal-wide bg-surface-100-800-token p-2 rounded-container-token space-y-2 drop-shadow-lg"
	>
		<div id="body" class="">lol test</div>
		<hr />
		<div id="footer" class="flex justify-center space-x-2">
			<button
				class="btn btn-primary border-token border-surface-500-400-token variant-ghost-warning"
				on:click={() => {
					$modalStore[0].response?.({ foo: 'bar' });
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
