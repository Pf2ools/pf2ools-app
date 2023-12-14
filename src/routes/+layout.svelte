<script lang="ts">
	import '../app.postcss';
	import Navigation from '$lib/layout/Navigation.svelte';
	import { onNavigate } from '$app/navigation';
	import { settings } from '$lib';
	import 'iconify-icon';

	// Floating UI for Popups
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { AppShell, storePopup } from '@skeletonlabs/skeleton';
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
	let windowHeight: number = 0;
	let slotHeight = windowHeight - headerElement - footerElement;

	$: slotHeight = windowHeight - headerElement - footerElement;
</script>

<svelte:window bind:innerHeight={windowHeight} />

<AppShell>
	<svelte:fragment slot="header">
		<div bind:clientHeight={headerElement}>
			<Navigation />
		</div>
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->

	<!-- Router Slot -->
	<div
		class="pb-1 pt-4 lg:pt-6 h-full"
		class:[&_*]:border={$settings.debug.borders}
		style="--slotHeight:calc({slotHeight}px - 1.75rem);"
	>
		<slot />
	</div>
	<!-- ---- / ---- -->

	<!-- (pageFooter) -->
	<svelte:fragment slot="footer">
		<div bind:clientHeight={footerElement}>
			<div class="hidden md:flex justify-center items-center pb-1">
				<p class="text-gray-500 text-xs">
					<span class="text-gray-400">©</span>
					{new Date().getFullYear()} pf2ools |
					<a href="/licenses" class="anchor !text-gray-500 underline-offset-auto">
						pf2ools is not affiliated with or endorsed by Paizo, see Licenses for more information
					</a>
				</p>
			</div>
		</div>
	</svelte:fragment>
</AppShell>
