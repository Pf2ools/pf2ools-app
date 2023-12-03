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
	const debounce = (value: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			headline = value;
		}, 100);
	};

	const anchors = [
		{
			name: 'Rules',
			pages: [
				{ name: 'Quick Reference', href: '/quickref' },
				{ name: 'Variant Rules', href: '/variant-rules' },
				{ name: 'Tables', href: '/tables' },
			],
		},
		{
			name: 'Character',
			pages: [
				{ name: 'Ancestries', href: '/ancestries' },
				{ name: 'Backgrounds', href: '/backgrounds' },
				{ name: 'Classes', href: '/classes' },
				{ name: 'Archetypes', href: '/archetypes' },
				{ name: 'Feats', href: '/feats' },
				{ name: 'Companions', href: '/companions' },
				{ name: 'Optional Features', href: '/optional-features' },
			],
		},
		{
			name: 'Game Master',
			pages: [
				{ name: 'GM Screen', href: '/gm-screen' },
				{ name: 'Events', href: '/events ' },
				{ name: 'Hazards', href: '/hazards' },
				{ name: 'Relic Gifts', href: '/relic-gifts' },
			],
		},
		{ name: 'Search', search: true },
		{
			name: 'References',
			pages: [
				{ name: 'Actions', href: '/actions' },
				{ name: 'Bestiary', href: '/bestiary' },
				{ name: 'Conditions', href: '/conditions' },
				{ name: 'Items', href: '/items' },
				{ name: 'Spells', href: '/spells' },
				{ name: 'Afflictions', href: '/afflictions' },
				{ name: 'Rituals', href: '/rituals' },
				{ name: 'Vehicles', href: '/vehicles' },
				{ name: 'Deities', href: '/deities' },
				{ name: 'Languages', href: '/languages' },
				{ name: 'Places', href: '/places' },
				{ name: 'Organizations', href: '/organizations' },
				{ name: 'Creature Abilities', href: '/creature-abilities' },
				{ name: 'Creature Templates', href: '/creature-templates' },
				{ name: 'Traits', href: '/traits' },
			],
		},
		{
			name: 'Utilities',
			pages: [
				{ name: 'Homebrew Manager', href: '/homebrew-manager' },
				{ name: 'Renderer Demo', href: '/renderer-demo' },
				{ name: 'Homebrew Maker', href: '/homebrew-maker' },
				{ name: 'Changelog', href: '/changelog' },
				{ name: 'Privacy Policy', href: '/privacy-policy' },
				{ name: 'Licenses', href: '/licenses' },
			],
		},
		{ name: 'Settings', settings: true },
	];
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
						hover="hover:variant-soft-primary"
						flex="flex-1 lg:flex-none"
						rounded=""
						border=""
						class="active-bg"
					>
						{#each anchors as { name, pages, search, settings }, i}
							{#if search}
								<TabAnchor
									class="w-24 h-16 text-xs"
									padding="py-2"
									on:mouseover={() => debounce(true)}
									on:mouseleave={() => debounce(false)}
								>
									<svelte:fragment slot="lead">(ico)</svelte:fragment>
									<span>(search)</span>
								</TabAnchor>
							{:else if settings}
								<TabAnchor
									class="w-24 h-16 text-xs"
									padding="py-2"
									on:mouseover={() => debounce(true)}
									on:mouseleave={() => debounce(false)}
								>
									<svelte:fragment slot="lead">(ico)</svelte:fragment>
									<span>(settings)</span>
								</TabAnchor>
							{:else}
								<TabAnchor
									class="w-24 h-16 text-xs"
									padding="py-2"
									on:mouseover={() => debounce(pages)}
									on:mouseleave={() => debounce(false)}
								>
									<svelte:fragment slot="lead">(ico)</svelte:fragment>
									<span>{name}</span>
								</TabAnchor>
							{/if}
						{/each}
						<!-- <TabAnchor
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
						</TabAnchor> -->
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
