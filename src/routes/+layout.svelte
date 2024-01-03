<script lang="ts">
	import '../app.postcss';
	import 'iconify-icon';
	import Navigation from '$lib/components/Navigation.svelte';
	import { onNavigate } from '$app/navigation';
	import { settings } from '$lib/settings';
	import { slide } from 'svelte/transition';

	// Modals
	import { Modal, initializeStores } from '@skeletonlabs/skeleton';
	import { modalRegistry } from '$lib/components/ModalRegistry';
	initializeStores();

	// For debugging, does nothing but adds the contentManager to the window object
	import contentManager from '$lib/data/contentManager';
	contentManager;

	// Floating UI for Popups
	import { AppShell, storePopup } from '@skeletonlabs/skeleton';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	onNavigate((navigation) => {
		if (!document.startViewTransition || navigation?.from?.route.id === navigation?.to?.route.id)
			return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	let headerElement: number = 0;
	let footerElement: number = 0;
	let windowWidth: number = 0;
	let windowHeight: number = 0;
	let slotHeight = windowHeight - headerElement - footerElement;

	$: slotHeight = windowHeight - headerElement - footerElement;
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />

<Modal components={modalRegistry} />

<AppShell>
	<svelte:fragment slot="header">
		{#if windowWidth >= 640}
			<div bind:clientHeight={headerElement}>
				<Navigation />
			</div>
		{/if}
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->

	<!-- Router Slot -->
	<div
		class="pb-1 pt-2 h-full"
		class:[&_*]:border={$settings.debug.borders}
		style="--slotHeight:calc({slotHeight}px - 1rem);"
	>
		<slot />
	</div>
	<!-- ---- / ---- -->

	<!-- (pageFooter) -->
	<svelte:fragment slot="footer">
		{#if !$settings.clearFooter}
			<div bind:clientHeight={footerElement} transition:slide>
				<div class="relative hidden md:flex justify-center items-center pb-1">
					<p class="text-gray-500 text-xs">
						<span class="text-gray-400">©</span>
						{new Date().getFullYear()} pf2ools |
						<a href="/licenses" class="anchor !text-gray-500 underline-offset-auto">
							pf2ools is not affiliated with or endorsed by Paizo, see Licenses for more information
						</a>
					</p>
					<button
						class="absolute right-2 text-xs text-gray-500 hover:underline"
						on:click={() => ($settings.clearFooter = true)}
					>
						I understand. <iconify-icon icon="mdi:arrow-down" class="text-sm align-top" />
					</button>
				</div>
			</div>
		{/if}
		{#if windowWidth <= 640}
			<div bind:clientHeight={headerElement}>
				<Navigation />
			</div>
		{/if}
	</svelte:fragment>
</AppShell>
