<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { AppShell, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import Navigation from '$lib/layout/Navigation.svelte';
	import { onNavigate } from '$app/navigation';
	import { settings } from '$lib';
	import 'iconify-icon';

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
</script>

<AppShell>
	<svelte:fragment slot="header">
		<Navigation />
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->

	<!-- Router Slot -->
	<div class="pt-4 lg:pt-6" class:[&_*]:border={$settings.debug.borders}>
		<slot />
	</div>
	<!-- ---- / ---- -->

	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
