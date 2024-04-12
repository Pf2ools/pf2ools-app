<script lang="ts">
	import { LightSwitch, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { settings } from '$lib/settings';
</script>

<svelte:head>
	<title>Settings - pf2ools</title>
</svelte:head>

<div class="container flex h-full justify-center">
	<div class="space-y-1">
		<LightSwitch />
		<div class="card flex items-center space-x-2 p-2">
			<label class="" for="clearFooter">Hide Footer</label>
			<input
				class="checkbox"
				type="checkbox"
				id="clearFooter"
				bind:checked={$settings.clearFooter}
			/>
		</div>
		<div class="card flex items-center space-x-2 p-2">
			<label class="" for="wideMode">Wide Mode</label>
			<input class="checkbox" type="checkbox" id="wideMode" bind:checked={$settings.wideMode} />
		</div>

		<div class="card flex-row space-y-2 p-2">
			<div class="border-b border-dashed border-surface-500 pb-1 text-center">Size of Lists</div>
			<ListBox labelledby="listSize" active="variant-soft-primary">
				<ListBoxItem bind:group={$settings.listSize} name="listSize" value="text-xs">
					Tiny
				</ListBoxItem>
				<ListBoxItem bind:group={$settings.listSize} name="listSize" value="text-sm">
					Small
				</ListBoxItem>
				<ListBoxItem bind:group={$settings.listSize} name="listSize" value="text-base">
					Medium
				</ListBoxItem>
				<ListBoxItem bind:group={$settings.listSize} name="listSize" value="text-lg">
					Large
				</ListBoxItem>
			</ListBox>
		</div>

		<div class="card flex-row space-y-2 p-2">
			<div class="border-b border-dashed border-surface-500 pb-1 text-center">Themes</div>
			<ListBox labelledby="theme" active="variant-soft-primary">
				<ListBoxItem bind:group={$settings.theme} name="theme" value="CoreRed">
					Core Red
				</ListBoxItem>
				<ListBoxItem bind:group={$settings.theme} name="theme" value="RemasterGreen">
					Remaster Green
				</ListBoxItem>
			</ListBox>
		</div>
	</div>
</div>
