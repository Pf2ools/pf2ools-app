<script lang="ts">
	import { settings } from '$lib';
	import { page } from '$app/stores';
	import { AppBar, LightSwitch, TabAnchor, TabGroup, popup } from '@skeletonlabs/skeleton';
	import { get } from 'svelte/store';

	type anchor = {
		name: string;
		pages: { name: string; href: string }[];
		href?: string;
		search?: true;
		settings?: true;
	};
	const anchors: anchor[] = [
		{
			name: 'Home',
			href: '/',
			pages: [],
		},
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
				{ name: 'Homebrew Management', href: '/homebrew' },
				{ name: 'Renderer Demo', href: '/renderer-demo' },
				{ name: 'Changelog', href: '/changelog' },
				{ name: 'Privacy Policy', href: '/privacy-policy' },
				{ name: 'Licenses', href: '/licenses' },
			],
		},
		{
			name: 'Settings',
			href: '/settings',
			pages: [],
		},
	] as const;

	let headline: anchor = anchors[3];

	let timer: NodeJS.Timeout | undefined;
	const debounce = (value: any, event: Event) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			headline = value;
		}, 50);
	};

	function moveFocus(e: KeyboardEvent, group?: string) {
		if (e.key === 'ArrowDown' || e.key === 'Enter') {
			e.preventDefault();
			(document.querySelector('#headline')?.firstChild?.firstChild as HTMLElement)?.focus?.();
		}
		if (group && (e.key === 'ArrowUp' || e.key === 'Backspace')) {
			e.preventDefault();
			(document.getElementById(`tab-${group}`) as HTMLElement)?.focus?.();
		}
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			((e.target as HTMLElement).previousElementSibling as HTMLElement)?.focus?.();
		}
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			((e.target as HTMLElement).nextElementSibling as HTMLElement)?.focus?.();
		}
	}

	function openSideBar() {
		console.log('open');
	}
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

<AppBar
	shadow="shadow-2xl"
	padding="px-8 p-1"
	spacing=""
	gridColumns=""
	class="hidden sm:block w-full h-10"
	slotDefault="place-self-center relative w-full flex"
>
	<!-- <svelte:fragment slot="lead"></svelte:fragment> -->

	<div class="mx-auto space-y-4">
		<div class="flex overflow-x-auto hide-scrollbar justify-start">
			{#each anchors as anchor}
				<a
					class="border-next tab-anchor text-center cursor-pointer transition-colors duration-100 flex-none px-4 py-2 hover:variant-ghost-primary text-sm"
					href={anchor.href || ''}
					class:variant-filled-primary={$page.url.pathname === anchor.href ||
						anchor.pages?.some((anchor) => get(page).url.pathname === anchor.href)}
					use:popup={{
						event: 'click',
						placement: 'bottom-start',
						target: anchor.name,
						middleware: { offset: 0 },
					}}
				>
					{#if anchor.href === '/settings'}
						<iconify-icon icon="mdi:cog" class="block md:hidden text-xl" />
						<span class="hidden md:block">{anchor.name}</span>
					{:else if anchor.href === '/'}
						<iconify-icon icon="mdi:home" class="block md:hidden text-xl" />
						<span class="hidden md:block">{anchor.name}</span>
					{:else}
						<span>{anchor.name}</span>
					{/if}
				</a>
				{#if !anchor.href}
					<div data-popup={anchor.name}>
						<div class="card flex flex-col rounded-tl-none">
							{#each anchor.pages as subAnchor}
								<a
									class="text-center cursor-pointer transition-colors duration-100 flex-none px-4 py-2 hover:variant-ghost-primary text-sm"
									href={subAnchor.href || ''}
									class:variant-filled-primary={$page.url.pathname === subAnchor.href}
									use:popup={{
										event: 'click',
										placement: 'bottom-start',
										target: subAnchor.name,
										middleware: { offset: 0 },
									}}
								>
									<!-- <svelte:fragment slot="lead"></svelte:fragment> -->
									<span>{subAnchor.name}</span>
								</a>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<LightSwitch class="absolute right-0 top-0 mt-1 hidden md:block" />

	<svelte:fragment slot="headline">
		<div class="text-sm flex">
			<!-- <svelte:fragment slot="lead"></svelte:fragment> -->
			<span class="mx-auto p-1 bg-surface-200-700-token">Search Bar Here >:(</span>
		</div>
	</svelte:fragment>
</AppBar>

<button
	id="mobile-sidebar-button"
	class="absolute bottom-0 leading-none sm:hidden bg-primary-200-700-token rounded-tr-md w-12 btn-icon-sm"
	on:click={openSideBar}
>
	<iconify-icon icon="pajamas:hamburger" class="text-4xl px-1" />
</button>
