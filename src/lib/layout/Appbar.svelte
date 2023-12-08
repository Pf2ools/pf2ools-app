<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { slide } from 'svelte/transition';

	type anchor = {
		name: string;
		pages?: anchor[];
		href?: string;
		search?: true;
		settings?: true;
	};
	const anchors: anchor[] = [
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
</script>

<AppBar shadow="shadow-2xl" gap="gap-8" padding="px-8" spacing="">
	<svelte:fragment slot="lead">
		<div class="absolute py-5 hidden lg:flex">
			<img src="icons/source/pf2e.svg" alt="pf2ools logo" class="w-8 scale-200" />
			<a href="/" class="ml-8 py-1">pf2ools</a>
		</div>
	</svelte:fragment>

	<TabGroup
		justify="justify-center"
		hover="hover:variant-soft-primary"
		flex="flex-1 lg:flex-none"
		rounded=""
		border=""
		class="active-bg"
	>
		{#each anchors as { name, pages, search, settings }}
			{#if search}
				<TabAnchor
					id="tab-{name}"
					class="w-24 h-16 text-xs border-token border-surface-200-700-token"
					padding="py-2"
					on:focus={(e) => debounce({ name, search }, e)}
					on:click={(e) => (headline?.search ? debounce(false, e) : debounce({ name, search }, e))}
					on:keydown={moveFocus}
					tabIndex="0"
					active="variant-soft-primary"
					selected={headline.name === name}
				>
					<svelte:fragment slot="lead">(ico)</svelte:fragment>
					<span>(search)</span>
				</TabAnchor>
			{:else if settings}
				<TabAnchor
					id="tab-{name}"
					class="w-24 h-16 text-xs border-token border-surface-200-700-token"
					padding="py-2"
					on:focus={(e) => debounce({ settings, name }, e)}
					on:blur={(e) => debounce(false, e)}
					on:mouseover={(e) => debounce({ settings, name }, e)}
					on:mouseleave={(e) => debounce(false, e)}
					on:keydown={moveFocus}
					tabIndex="0"
					active="variant-soft-primary"
					selected={headline.name === name}
				>
					<svelte:fragment slot="lead">(ico)</svelte:fragment>
					<span>(settings)</span>
				</TabAnchor>
			{:else if pages}
				<TabAnchor
					id="tab-{name}"
					class="{headline.name === name
						? 'variant-soft-primary'
						: ''} w-24 h-16 text-xs border-token border-surface-200-700-token"
					padding="py-2"
					on:focus={(e) => debounce({ pages, name }, e)}
					on:blur={(e) => debounce(false, e)}
					on:mouseover={(e) => debounce({ pages, name }, e)}
					on:mouseleave={(e) => debounce(false, e)}
					on:keydown={moveFocus}
					tabIndex="0"
					active="variant-filled-primary"
					selected={pages.map((x) => x.href).includes($page.url.pathname)}
				>
					<svelte:fragment slot="lead">(ico)</svelte:fragment>
					<span>{name}</span>
				</TabAnchor>
			{/if}
		{/each}
	</TabGroup>

	<svelte:fragment slot="headline">
		{#if headline}
			<div
				id="headline"
				class="flex absolute w-full bg-surface-100/90 dark:bg-surface-800/90 -mx-8 px-2/10 min-h-8 h-fit-content"
				class:!bg-transparent={headline.search || headline.settings}
				in:slide={{ duration: 300 }}
				out:slide={{ duration: 300, delay: 500 }}
				role="navigation"
				aria-label="Headline"
				on:mouseover={(e) => debounce(headline, e)}
				on:mouseleave={(e) => (headline?.search ? null : debounce(false, e))}
				on:focus={(e) => debounce(true, e)}
				on:blur={(e) => debounce(false, e)}
			>
				<div class="mx-auto flex flex-wrap justify-center">
					{#if headline.settings}
						settings
					{:else if headline.search}
						search
					{:else if headline.pages}
						{#each headline.pages as { name, href }}
							<a
								{href}
								class="bg-surface-100 dark:bg-surface-800 px-8 py-2 text-sm hover:variant-filled-primary border-token border-surface-200-700-token"
								class:!variant-filled-primary={href === $page.url.pathname}
								on:mouseover={(e) => debounce(headline, e)}
								on:mouseleave={(e) => debounce(false, e)}
								on:focus={(e) => debounce(headline, e)}
								on:blur={(e) => debounce(false, e)}
								on:keydown={(e) => moveFocus(e, headline.name)}
							>
								{name}
							</a>
						{/each}
					{/if}
				</div>
			</div>
		{/if}
	</svelte:fragment>
</AppBar>
