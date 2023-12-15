<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { settings } from '$lib';
</script>

<svelte:head>
	<title>Settings - pf2ools</title>
</svelte:head>

<div class="container flex justify-center h-full">
	<div class="space-y-5">
		<LightSwitch />
		<div class="flex items-center space-x-2">
			<label class="" for="clearFooter">Hide Footer</label>
			<input
				class="checkbox"
				type="checkbox"
				id="clearFooter"
				bind:checked={$settings.clearFooter}
			/>
		</div>
		<div class="flex items-center space-x-2">
			<label class="" for="wideMode">Wide Mode</label>
			<input class="checkbox" type="checkbox" id="wideMode" bind:checked={$settings.wideMode} />
		</div>
	</div>
</div>
