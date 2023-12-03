<script lang="ts">
	import '../app.postcss';

	import { onNavigate } from '$app/navigation';

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

	// Floating UI for Popups
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { AppBar, storePopup, AppShell, TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { page } from '$app/stores';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar shadow="shadow-2xl" gap="gap-8" padding="px-8">
			<svelte:fragment slot="lead">
				<img src="icons/source/pf2e.svg" alt="pf2ools logo" class="h-8 scale-200" />
			</svelte:fragment>

			<div class="flex">
				<div class="absolute py-5 hidden sm:block">pf2ools</div>
				<div class="mx-auto">
					<TabGroup
						justify="justify-center"
						active="variant-filled-primary"
						hover="hover:variant-soft-primary"
						flex="flex-1 lg:flex-none"
						rounded=""
						border=""
						class=""
					>
						<TabAnchor
							class="w-16 h-16 text-xs"
							padding="py-2"
							href="/players"
							selected={$page.url.pathname === '/players'}
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>(players)</span>
						</TabAnchor>
						<TabAnchor
							class="w-16 h-16 text-xs"
							padding="py-2"
							href="/gm"
							selected={$page.url.pathname === '/gm'}
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>(gm)</span>
						</TabAnchor>
						<TabAnchor
							class="w-16 h-16 text-xs"
							padding="py-2"
							href="/"
							selected={$page.url.pathname === '/'}
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>(search)</span>
						</TabAnchor>
						<TabAnchor
							class="w-16 h-16 text-xs"
							padding="py-2"
							href="/index"
							selected={$page.url.pathname === '/index'}
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>(index)</span>
						</TabAnchor>
						<TabAnchor
							class="w-16 h-16 text-xs"
							padding="py-2"
							href="/settings"
							selected={$page.url.pathname === '/settings'}
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>(settings)</span>
						</TabAnchor>
					</TabGroup>
				</div>
			</div>
			<!-- <svelte:fragment slot="headline">(headline)</svelte:fragment> -->
		</AppBar>
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
