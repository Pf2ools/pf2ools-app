<script context="module" lang="ts">
	export type columnType<T> = {
		enabled: boolean;
		order: number;
		label: string;
		hover: string;
		key: string;
		sortable: (a: T, b: T) => number;
		parser: (item: T) => string;
		classes: string;
		span: number;
		sorted?: 0 | 1 | -1;
		sortedHidden?: boolean;
	};

	export type filterType<T> = {
		label: string;
		not?: boolean;
	};

	export type filteringArray<T> = (filterType<T> | { OR: filterType<T>[]; not?: boolean })[];
</script>

<script lang="ts" generics="T extends classTypes[keyof classTypes]">
	import { dev } from '$app/environment';
	import { settings } from '$lib/settings';
	import type { classTypes } from '$lib/data/contentManager';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getModalStore, localStorageStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import FilterChip from './ItemList/FilterChip.svelte';
	// import { queryParam } from 'sveltekit-search-params'; https://github.com/paoloricciuti/sveltekit-search-params/tree/master
	export let items: T[] = [];
	export let selected: T;
	export let columns: columnType<T>[];
	export let filter = 'lol';

	selected ??= items[0];

	$: if (dev) {
		console.log(selected);
	}

	const initialValue: filteringArray<T> = [
		{ label: 'start Z' },
		{
			OR: [{ label: 'start A' }, { label: 'start B' }, { label: 'start C' }],
		},
		{
			OR: [{ label: 'start D' }, { label: 'start E' }, { label: 'start F' }],
			not: true,
		},
		{ label: 'end R', not: true },
	];
	let filters = localStorageStore('filters-background', initialValue);
	const modalStore = getModalStore();
	const modalSettings: ModalSettings = {
		type: 'component',
		component: 'FilterPage',
		value: filter,
		response: (result: filteringArray<T> | undefined) => {
			if (result) filters.set(result);
		},
	};

	let search = '';
	let filteredItems = items;

	$: search,
		(filteredItems = items.filter((item) => {
			return search
				.toLowerCase()
				.split(',')
				.map((term) => term.trim())
				.every((term) => {
					return item.label.toLowerCase().includes(term);
				});
		}));

	filters.subscribe((value) => {
		filteredItems = items.filter((item) => {
			return item;
		});
	});

	$: columns.forEach((col) => {
		if (col.sorted !== 0) {
			filteredItems.sort((a, b) => {
				return (col.sorted || 0) * col.sortable(a, b);
			});
		}
	});

	function findByHash(hash: string) {
		if (hash.includes('#')) hash = hash.split('#')[1];
		return items.find((item) => item.hash === hash);
	}

	onMount(() => {
		// If there is a hash, set the selected item to the item with that hash.
		if ($page.url.hash) {
			const found = findByHash($page.url.hash);
			if (found) selected = found;
		} else {
			// Set the selected item to the "real" first item on the list, as the list might be filtered or sorted by default.
			selected = filteredItems[0];
			if (selected) goto(`#${selected.hash}`);
		}
	});

	function restartFilters(all = false) {
		if (all) filters.set([]);
		else filters.set(initialValue);
	}

	function move(event: KeyboardEvent) {
		if (document?.activeElement?.tagName !== 'INPUT') {
			if (event.altKey && event.key === 'R') restartFilters(event.shiftKey);

			if (event.key === 'j' || event.key === 'k') {
				event.preventDefault();
				// Find the current selected row with #row and .active
				const current = document.querySelector('#row.active');
				// Grab the next or previous row
				const next = (
					event.key === 'j' ? current?.nextElementSibling : current?.previousElementSibling
				) as HTMLElement | null | undefined;
				// Grab the button and click it
				next?.click();
				next?.focus();
				// Scroll to this element
				next?.scrollIntoView({ block: 'center' });
			}
		}
	}

	function hashChange(event: HashChangeEvent & { currentTarget: EventTarget & Window }) {
		const hash = event.newURL.split('#')[1]?.replace('#', '');
		if (!hash) return;
		const found = findByHash(hash);
		if (found) selected = found;
	}

	let remainingSpan = Math.max(
		1,
		columns.filter((col) => col.enabled).reduce((a, b) => Math.max(a, 0) - Math.max(b.span, 0), 24)
	);

	let headerHeight = 50;

	let hideFilters = false;
</script>

<svelte:window on:keydown={move} on:hashchange={(event) => hashChange(event)} />

<div class="card flex flex-col" style="--headerHeight: {headerHeight}px">
	<div class="top-0" bind:clientHeight={headerHeight}>
		<div>
			<div class="input-group input-group-divider flex flex-row rounded-b-none [&>*]:!px-2">
				<button class="input-group-shim" on:click={() => modalStore.trigger(modalSettings)}>
					Filter
				</button>
				<button
					class="input-group-shim border-l border-surface-400-500-token"
					on:click={() => (hideFilters = !hideFilters)}
					title="Toggle Filters"
				>
					<iconify-icon
						icon="mdi:arrow-{!hideFilters ? 'collapse' : 'expand'}-vertical"
						class="text-xl"
					/>
				</button>

				<div class="w-full relative">
					<input
						class="input rounded-b-none rounded-l-none p-0 py-1"
						type="text"
						placeholder="Search..."
						bind:value={search}
					/>
					<span class="text-sm absolute right-2 opacity-50">
						{filteredItems.length}/{items.length}
					</span>
				</div>

				<button
					class="input-group-shim border-r border-surface-400-500-token"
					on:click={() =>
						(selected = filteredItems[Math.floor(Math.random() * filteredItems.length)])}
					title="Feeling Lucky?"
				>
					<iconify-icon icon="mdi:dice-multiple" class="text-xl" />
				</button>
				<button
					class="input-group-shim"
					on:click={(event) => restartFilters(event.shiftKey)}
					title="Click to reset to default filters. Shift-Click to remove all filters.
You can also do these actions by holding Alt and pressing R or Shift-R."
				>
					<iconify-icon icon="mdi:restart" class="text-xl" />
				</button>
			</div>
			{#if $filters.length && !hideFilters}
				<div
					class="flex flex-wrap [&>*]:mr-1 last:[&>*]:mr-0 overflow-x-clip border-b border-surface-300-600-token text-dark-token bg-surface-200-700-token"
					title="Remove filters by clicking on them."
				>
					{#each $filters as filter}
						{#if 'OR' in filter}
							<div
								class="p-px flex rounded-token"
								class:variant-ghost-surface={filter.not}
								class:variant-ghost-interact={!filter.not}
							>
								{#each filter.OR as orFilter, index}
									<FilterChip label={orFilter.label} classes={filter.not ? 'bg-surface-600' : ''}>
										<div slot="outside">
											{#if index !== filter.OR.length - 1}
												<div class="px-1 text-sm text-base-token dark:text-dark-token">/</div>
											{/if}
										</div>
									</FilterChip>
								{/each}
							</div>
						{:else}
							<FilterChip
								label={filter.label}
								onClick={() => filters.update((filters) => filters.filter((f) => f !== filter))}
								classes={`my-px ${filter.not ? 'bg-surface-600' : ''}`}
							/>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
		<div
			class="pl-0.5 pb-0.5 grid grid-cols-24 bg-surface-100-800-token text-sm border-b border-surface-500"
		>
			{#each columns
				.filter((col) => col.enabled)
				.sort( (a, b) => (a.order === -1 ? 1 : b.order === -1 ? -1 : a.order - b.order) ) as { label, classes, span, sorted, hover, sortedHidden }}
				<button
					title={hover}
					class="border-r-next px-1 col-span-var h-full {classes} {$settings.listSize} relative"
					style="--span: {span === -1 ? remainingSpan : span}"
					on:click={() => {
						if (sortedHidden) return;
						switch (sorted) {
							default:
							case 0:
								sorted = 1;
								break;
							case 1:
								sorted = -1;
								break;
							case -1:
								sorted = 0;
								break;
						}
					}}
				>
					{label}
					<span class="absolute right-1">
						{sortedHidden ? '' : sorted === 1 ? '▲' : sorted === -1 ? '▼' : ''}
					</span>
				</button>
			{/each}
		</div>
	</div>
	<div
		class="h-[calc(var(--listHeight,var(--slotHeight))-var(--headerHeight))] overflow-y-scroll overflow-x-hidden offset-scroll scroll-thin
		[&_button:nth-child(odd)]:bg-surface-200/50 dark:[&_button:nth-child(odd)]:bg-surface-700/50"
	>
		{#each filteredItems as item}
			<button
				id="row"
				class="pl-0.5 grid grid-cols-24 w-full {$settings.listSize} hover:!variant-ghost-primary focus:!variant-ghost-primary"
				class:homebrew-shadow={!item?.official}
				class:secondary-shadow={item?.secondaryContent}
				class:!variant-soft-primary={selected === item}
				class:active={selected === item}
				on:click={() => {
					if (selected !== item) selected = item;
					goto(`#${item.hash}`);
				}}
			>
				{#each columns
					.filter((col) => col.enabled)
					.sort( (a, b) => (a.order === -1 ? 1 : b.order === -1 ? -1 : a.order - b.order) ) as { classes, span, parser }}
					<div
						class="border-r-next px-1 col-span-var h-full {classes}"
						style="--span: {span === -1 ? remainingSpan : span}"
					>
						{parser(item)}
					</div>
				{/each}
			</button>
		{/each}
	</div>
</div>
