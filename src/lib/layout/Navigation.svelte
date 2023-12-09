<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { get } from 'svelte/store';

	type anchor = {
		name: string;
		pages?: anchor[];
		href?: string;
		search?: true;
		settings?: true;
		active?: boolean;
	};
	const anchors: anchor[] = [
		{
			name: 'Rules',
			get active() {
				return this.pages?.some((anchor) => anchor.href === get(page).url.pathname) || false;
			},
			pages: [
				{ name: 'Quick Reference', href: '/quickref' },
				{ name: 'Variant Rules', href: '/variant-rules' },
				{ name: 'Tables', href: '/tables' },
			],
		},
		{
			name: 'Character',
			get active() {
				return this.pages?.some((anchor) => anchor.href === get(page).url.pathname) || false;
			},
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
			get active() {
				return this.pages?.some((anchor) => anchor.href === get(page).url.pathname) || false;
			},
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
			get active() {
				return this.pages?.some((anchor) => anchor.href === get(page).url.pathname) || false;
			},
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
			get active() {
				return this.pages?.some((anchor) => anchor.href === get(page).url.pathname) || false;
			},
			pages: [
				{ name: 'Homebrew Manager', href: '/homebrew-manager' },
				{ name: 'Renderer Demo', href: '/renderer-demo' },
				{ name: 'Homebrew Maker', href: '/homebrew-maker' },
				{ name: 'Changelog', href: '/changelog' },
				{ name: 'Privacy Policy', href: '/privacy-policy' },
				{ name: 'Licenses', href: '/licenses' },
			],
		},
		{ name: 'Settings', href: '/settings' },
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

<div class="hidden lg:flex w-full h-10 px-8 p-1 bg-surface-100-800-token flex-row" id="title">
	<div class="">
		<h2 class="h2 inline leading-snug"><span class="text-primary-400">pf2</span>ools.</h2>
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
	gap="gap-8"
	padding="px-8 p-1"
	spacing=""
	gridColumns=""
	class="hidden sm:block w-full h-10"
	slotDefault="place-self-center"
>
	<!-- <svelte:fragment slot="lead"></svelte:fragment> -->

	<TabGroup
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		rounded=""
		border=""
		class="bg-surface-100-800-token"
	>
		{#each anchors as anchor}
			<TabAnchor class="border-next text-sm {anchor.search ? 'hidden lg:block' : ''}">
				<!-- <svelte:fragment slot="lead"></svelte:fragment> -->
				<span>{anchor.name}</span>
			</TabAnchor>
		{/each}
	</TabGroup>

	<svelte:fragment slot="headline">
		<TabAnchor id={`tab-Search`} class="border-next text-sm lg:hidden">
			<!-- <svelte:fragment slot="lead"></svelte:fragment> -->
			<span>Search</span>
		</TabAnchor>
	</svelte:fragment>
</AppBar>

<button
	id="mobile-sidebar-button"
	class="absolute bottom-0 leading-none sm:hidden bg-primary-200-700-token rounded-tr-md w-12 btn-icon-sm"
	on:click={openSideBar}
>
	<iconify-icon icon="pajamas:hamburger" class="text-4xl px-1" />
</button>
