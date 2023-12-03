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
	import { AppBar, AppShell, TabAnchor, TabGroup, storePopup } from '@skeletonlabs/skeleton';
	import { slide } from 'svelte/transition';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let headline = false;

	let timer: NodeJS.Timeout | undefined;
	const debounce = (value: boolean) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			headline = value;
		}, 100);
	};
</script>

<svelte:head>
	<title>pf2ools</title>
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar shadow="shadow-2xl" gap="gap-8" padding="px-8" spacing="">
			<svelte:fragment slot="lead">
				<div class="absolute py-5 hidden sm:flex">
					<img src="icons/source/pf2e.svg" alt="pf2ools logo" class="w-8 scale-200" />
					<div class="pl-8 pt-1">pf2ools</div>
				</div>
			</svelte:fragment>

			<div class="flex">
				<div class="mx-auto" aria-level="0">
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
							class="w-24 h-16 text-xs"
							padding="py-2"
							on:mouseover={() => debounce(true)}
							on:mouseleave={() => debounce(false)}
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>(rules)</span>
						</TabAnchor>
						<TabAnchor
							class="w-24 h-16 text-xs"
							padding="py-2"
							on:mouseover={() => debounce(true)}
							on:mouseleave={() => debounce(false)}
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>(player)</span>
						</TabAnchor>
						<TabAnchor
							class="w-24 h-16 text-xs"
							padding="py-2"
							on:mouseover={() => debounce(true)}
							on:mouseleave={() => debounce(false)}
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>(game master)</span>
						</TabAnchor>
						<TabAnchor
							class="w-24 h-16 text-xs"
							padding="py-2"
							on:mouseover={() => debounce(true)}
							on:mouseleave={() => debounce(false)}
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>(search)</span>
						</TabAnchor>
						<TabAnchor
							class="w-24 h-16 text-xs"
							padding="py-2"
							on:mouseover={() => debounce(true)}
							on:mouseleave={() => debounce(false)}
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>(references)</span>
						</TabAnchor>
						<TabAnchor
							class="w-24 h-16 text-xs"
							padding="py-2"
							on:mouseover={() => debounce(true)}
							on:mouseleave={() => debounce(false)}
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>(utilities)</span>
						</TabAnchor>
						<TabAnchor
							class="w-24 h-16 text-xs"
							padding="py-2"
							on:mouseover={() => debounce(true)}
							on:mouseleave={() => debounce(false)}
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>(settings)</span>
						</TabAnchor>
					</TabGroup>
				</div>
			</div>
			<svelte:fragment slot="headline">
				{#if headline}
					<div
						class="flex absolute w-full bg-surface-100-800-token -mx-8"
						in:slide={{ duration: 300 }}
						out:slide={{ duration: 300, delay: 500 }}
						role="heading"
						aria-level="1"
						aria-label="Headline"
						on:mouseover={() => debounce(true)}
						on:mouseleave={() => debounce(false)}
						on:focus={() => debounce(true)}
						on:blur={() => debounce(false)}
					>
						<div class="mx-auto">(headline)</div>
					</div>
				{/if}
			</svelte:fragment>
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
