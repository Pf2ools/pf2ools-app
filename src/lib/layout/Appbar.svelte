<script lang="ts">
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

	let headline: anchor | false = false;

	let timer: NodeJS.Timeout | undefined;
	const debounce = (value: any, event: Event) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			headline = value;
		}, 100);
	};
</script>

<AppBar shadow="shadow-2xl" gap="gap-8" padding="px-8" spacing="">
	<svelte:fragment slot="lead">
		<div class="absolute py-5 hidden sm:flex">
			<img src="icons/source/pf2e.svg" alt="pf2ools logo" class="w-8 scale-200" />
			<a href="/" class="ml-8 py-1">pf2ools</a>
		</div>
	</svelte:fragment>

	<div class="flex">
		<div class="mx-auto" role="navigation">
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
							on:focus={(e) => debounce(true, e)}
							on:blur={(e) => debounce(false, e)}
							on:mouseover={(e) => debounce(true, e)}
							on:mouseleave={(e) => debounce(false, e)}
							on:keydown={(e) =>
								e.key === 'Enter' || e.key === 'ArrowDown'
									? document.querySelector('#headline')?.firstChild?.firstChild?.focus()
									: null}
							tabIndex="0"
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>(search)</span>
						</TabAnchor>
					{:else if settings}
						<TabAnchor
							id="tab-{name}"
							class="w-24 h-16 text-xs border-token border-surface-200-700-token"
							padding="py-2"
							on:focus={(e) => debounce(true, e)}
							on:blur={(e) => debounce(false, e)}
							on:mouseover={(e) => debounce(true, e)}
							on:mouseleave={(e) => debounce(false, e)}
							on:keydown={(e) =>
								e.key === 'Enter' || e.key === 'ArrowDown'
									? document.querySelector('#headline')?.firstChild?.firstChild?.focus()
									: null}
							tabIndex="0"
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>(settings)</span>
						</TabAnchor>
					{:else}
						<TabAnchor
							id="tab-{name}"
							class="w-24 h-16 text-xs border-token border-surface-200-700-token"
							padding="py-2"
							on:focus={(e) => debounce({ pages, name }, e)}
							on:blur={(e) => debounce(false, e)}
							on:mouseover={(e) => debounce({ pages, name }, e)}
							on:mouseleave={(e) => debounce(false, e)}
							on:keydown={(e) =>
								e.key === 'Enter' || e.key === 'ArrowDown'
									? document.querySelector('#headline')?.firstChild?.firstChild?.focus()
									: null}
							tabIndex="0"
						>
							<svelte:fragment slot="lead">(ico)</svelte:fragment>
							<span>{name}</span>
						</TabAnchor>
					{/if}
				{/each}
			</TabGroup>
		</div>
	</div>
	<svelte:fragment slot="headline">
		{#if headline}
			<div
				id="headline"
				class="flex absolute w-full bg-surface-100-800-token -mx-8 px-2/10 min-h-8 h-fit-content"
				in:slide={{ duration: 300 }}
				out:slide={{ duration: 300, delay: 500 }}
				role="navigation"
				aria-label="Headline"
				on:mouseleave={(e) => debounce(false, e)}
				on:focus={(e) => debounce(true, e)}
				on:blur={(e) => debounce(false, e)}
			>
				<div class="mx-auto flex flex-wrap justify-center">
					{#if Array.isArray(headline.pages)}
						{#each headline.pages as { name, href }}
							<a
								{href}
								class="px-8 py-2 text-xs hover:variant-soft-primary border-token border-surface-200-700-token"
								on:mouseover={(e) => debounce(headline, e)}
								on:mouseleave={(e) => debounce(false, e)}
								on:focus={(e) => debounce(headline, e)}
								on:blur={(e) => debounce(false, e)}
								on:keydown={(e) =>
									e.key === 'Backspace' || e.key === 'ArrowUp'
										? document.getElementById(`tab-${headline.name}`)?.focus()
										: null}
							>
								{name}
							</a>
						{/each}
					{:else}
						tru tru
					{/if}
				</div>
			</div>
		{/if}
	</svelte:fragment>
</AppBar>
