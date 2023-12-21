<script lang="ts">
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { AppBar, LightSwitch, popup } from '@skeletonlabs/skeleton';
	import { get } from 'svelte/store';

	// TODO: Remove disabled as things become available
	type anchor = {
		disabled: true | false;
		name: string;
		icon: string;
		pages: { name: string; href: string; disabled?: true | false }[];
		href?: string;
		search?: true;
		settings?: true;
	};
	const anchors: anchor[] = [
		{
			name: 'Home',
			icon: 'mdi:home',
			disabled: false,
			href: '/',
			pages: [],
		},
		{
			name: 'Rules',
			icon: 'mdi:book-alphabet',
			disabled: true,
			pages: [
				{ name: 'Quick Reference', href: '/quickref' },
				{ name: 'Variant Rules', href: '/variant-rules' },
				{ name: 'Tables', href: '/tables' },
			],
		},
		{
			name: 'Player',
			icon: 'mdi:account',
			disabled: false,
			pages: [
				{ disabled: true, name: 'Ancestries', href: '/ancestries' },
				{ disabled: false, name: 'Backgrounds', href: '/backgrounds' },
				{ disabled: true, name: 'Classes', href: '/classes' },
				{ disabled: true, name: 'Archetypes', href: '/archetypes' },
				{ disabled: true, name: 'Feats', href: '/feats' },
				{ disabled: true, name: 'Companions', href: '/companions' },
				{ disabled: true, name: 'Optional Features', href: '/optional-features' },
			],
		},
		{
			name: 'Game Master',
			icon: 'mdi:notebook',
			disabled: true,
			pages: [
				{ disabled: true, name: 'GM Screen', href: '/gm-screen' },
				{ disabled: true, name: 'Afflictions', href: '/afflictions' },
				{ disabled: true, name: 'Events', href: '/events ' },
				{ disabled: true, name: 'Hazards', href: '/hazards' },
				{ disabled: true, name: 'Relic Gifts', href: '/relic-gifts' },
				{ disabled: true, name: 'Creature Abilities', href: '/creature-abilities' },
				{ disabled: true, name: 'Creature Templates', href: '/creature-templates' },
			],
		},
		{
			disabled: true,
			name: 'References',
			icon: 'mdi:book-open-page-variant',
			pages: [
				{ disabled: true, name: 'Actions', href: '/actions' },
				{ disabled: true, name: 'Bestiary', href: '/bestiary' },
				{ disabled: true, name: 'Conditions', href: '/conditions' },
				{ disabled: true, name: 'Items', href: '/items' },
				{ disabled: true, name: 'Spells', href: '/spells' },
				{ disabled: true, name: 'Rituals', href: '/rituals' },
				{ disabled: true, name: 'Vehicles', href: '/vehicles' },
				{ disabled: true, name: 'Deities', href: '/deities' },
				{ disabled: true, name: 'Languages', href: '/languages' },
				{ disabled: true, name: 'Places', href: '/places' },
				{ disabled: true, name: 'Organizations', href: '/organizations' },
				{ disabled: true, name: 'Traits', href: '/traits' },
			],
		},
		{
			disabled: false,
			name: 'Utilities',
			icon: 'mdi:tools',
			pages: [
				{ disabled: false, name: 'Homebrew Management', href: '/homebrew' },
				{ disabled: true, name: 'Renderer Demo', href: '/renderer-demo' },
				{ disabled: true, name: 'Changelog', href: '/changelog' },
				{ disabled: true, name: 'Privacy Policy', href: '/privacy-policy' },
				{ disabled: true, name: 'Licenses', href: '/licenses' },
			],
		},
		{ disabled: false, name: 'Settings', icon: 'mdi:cog', href: '/settings', pages: [] },
	] as const;

	let mobileSearch = false;
</script>

<div
	class="hidden lg:flex w-full h-10 px-8 p-1 bg-surface-100-800-token flex-row underline underline-offset-1 decoration-primary-500-400-token"
	id="title"
>
	<div class="">
		<h2 class="h2 inline leading-snug">
			<span class="text-primary-400">pf2</span>ools.
		</h2>
		<p class="inline">A suite of tools and information for Pathfinder 2nd Edition.</p>
	</div>
	<div class="ml-auto py-1">
		<a class="chip variant-soft hover:variant-filled" href="https://github.com/Pf2ools">
			<iconify-icon icon="mdi:github" class="text-xl" />
			<span>Github</span>
		</a>
	</div>
</div>

{#if mobileSearch}
	<div
		transition:slide
		class="mx-auto w-64 input-group input-group-divider grid-cols-[auto_1fr_auto] h-9 [&>*]:h-9 rounded-none sm:hidden absolute bottom-9 right-0"
	>
		<input type="text" placeholder="Search Anything..." />
		<a class="rounded-none variant-filled-surface" href="/search">
			<iconify-icon icon="mdi:search" class="text-2xl" />
		</a>
	</div>
{/if}

<AppBar
	shadow="shadow-2xl"
	padding=""
	spacing=""
	gridColumns=""
	class="w-full"
	slotDefault="place-self-center relative w-full flex"
>
	<!-- <svelte:fragment slot="lead"></svelte:fragment> -->

	<div class="mx-auto space-y-4">
		<div class="flex flex-row overflow-x-auto hide-scrollbar justify-start">
			{#each anchors as anchor}
				{#if !anchor.href}
					<button
						class="generic-disabled border-r-next tab-anchor text-center cursor-pointer transition-colors duration-100 flex-none px-2 md:px-4 py-2 hover:variant-ghost-primary text-sm rounded-none"
						class:variant-filled-primary={$page.url.pathname === anchor.href ||
							anchor.pages?.some((anchor) => get(page).url.pathname === anchor.href)}
						disabled={anchor.disabled}
						use:popup={{
							event: 'click',
							placement: 'bottom-start',
							target: anchor.name,
							middleware: { offset: 0, flip: {} },
						}}
					>
						<iconify-icon icon={anchor.icon} class="block md:hidden text-xl" />
						<span class="hidden md:block">{anchor.name}</span>
					</button>
					<div data-popup={anchor.name}>
						<div
							class="card flex flex-col
							rounded-bl-none [&_a:first-child]:rounded-bl-none
							sm:rounded-tl-none [&_a:first-child]:sm:rounded-tl-none sm:rounded-bl-token
							[&_a:not(:last-child)]:border-b"
						>
							{#each anchor.pages.filter((anc) => !anc.disabled) as subAnchor}
								<a
									class="rounded-token border-surface-300-600-token border-dashed text-center cursor-pointer transition-colors duration-100 flex-none px-4 py-2 hover:variant-ghost-primary text-sm"
									href={subAnchor.href}
									class:variant-filled-primary={$page.url.pathname === subAnchor.href}
									use:popup={{
										event: 'click',
										placement: 'bottom-start',
										target: subAnchor.name,
										middleware: { offset: 0, flip: { mainAxis: 'y' } },
									}}
								>
									<!-- <svelte:fragment slot="lead"></svelte:fragment> -->
									<span>{subAnchor.name}</span>
								</a>
							{/each}
						</div>
					</div>
				{:else}
					<a
						class="border-r-next tab-anchor text-center cursor-pointer transition-colors duration-100 flex-none px-2 md:px-4 py-2 hover:variant-ghost-primary text-sm"
						class:variant-filled-primary={$page.url.pathname === anchor.href ||
							anchor.pages?.some((anchor) => get(page).url.pathname === anchor.href)}
						href={anchor.href ?? undefined}
					>
						<iconify-icon icon={anchor.icon} class="block md:hidden text-xl" />
						<span class="hidden md:block">{anchor.name}</span>
					</a>
				{/if}
			{/each}
			<div
				class="input-group input-group-divider grid-cols-[auto_1fr_auto] h-9 [&>*]:h-9 rounded-none hidden sm:flex"
			>
				<input type="text" placeholder="Search Anything..." />
				<a class="rounded-none variant-filled-surface !p-2" href="/search">
					<iconify-icon icon="mdi:search" class="text-2xl" />
				</a>
			</div>
			<button
				class="generic-disabled border-r-next tab-anchor text-center cursor-pointer transition-colors duration-100 flex-none px-2 md:px-4 py-2 hover:variant-ghost-primary text-sm rounded-none"
				on:click={() => (mobileSearch = !mobileSearch)}
			>
				<iconify-icon icon="mdi:search" class="text-xl block" />
			</button>
		</div>
	</div>

	<LightSwitch class="absolute right-0 top-0 mt-1 hidden lg:block" />
</AppBar>
