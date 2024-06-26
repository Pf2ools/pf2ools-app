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
	import type { classTypes } from '$lib/data/types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getModalStore, localStorageStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import FilterChip from './ItemList/FilterChip.svelte';
	// import { queryParam } from 'sveltekit-search-params'; https://github.com/paoloricciuti/sveltekit-search-params/tree/master
	export let dblClick = (item: T, event: Event) => {};
	export let classes = '';
	export let items: T[] = [];
	export let selected: T;
	export let columns: columnType<T>[];
	export let filter = 'lol';
	export let title = '';

	selected ??= items[0];

	$: if (dev) {
		console.log(selected);
	}

	const initialValue: filteringArray<T> = [
		{ label: 'Z' },
		{
			OR: [{ label: 'A' }, { label: 'B' }, { label: 'C' }],
		},
		{
			OR: [{ label: 'D' }, { label: 'E' }, { label: 'F' }],
			not: true,
		},
		{ label: '!R', not: true },
	];
	let filters = localStorageStore('filters-background', initialValue);
	const modalStore = getModalStore();
	const modalSettings: ModalSettings = {
		type: 'component',
		component: 'FilterPage',
		value: filter,
		response: (result: filteringArray<T> | undefined) => {
			// if (result) filters.set(result);
			console.log(result);
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

<div class="card flex flex-col {classes}" style="--headerHeight: {headerHeight}px">
	<div class="top-0" bind:clientHeight={headerHeight}>
		<div>
			<div
				class="input-group input-group-divider flex flex-row rounded-b-none [&_*]:bg-surface-100-800-token [&>*]:!px-2"
			>
				<button class="input-group-shim" on:click={() => modalStore.trigger(modalSettings)}>
					Filter
				</button>
				<button
					class="generic-disabled input-group-shim border-surface-400-500-token border-l"
					disabled={!$filters.length}
					on:click={() => (hideFilters = !hideFilters)}
					title={$filters.length
						? 'Toggle Filter Visibility'
						: 'There are no filters to be hidden or shown!'}
				>
					<iconify-icon
						icon="mdi:arrow-{!hideFilters ? 'collapse' : 'expand'}-vertical"
						class="text-xl"
					/>
				</button>

				<div class="relative w-full">
					<input
						class="input rounded-b-none rounded-l-none p-0 py-1"
						type="text"
						placeholder="Search..."
						bind:value={search}
					/>
					<span class="absolute right-2 text-sm opacity-50">
						{filteredItems.length}/{items.length}
					</span>
				</div>

				<button
					class="input-group-shim border-surface-400-500-token border-l border-r"
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
					class="bg-surface-200-700-token border-surface-300-600-token flex flex-wrap overflow-x-clip border-b px-0.5 text-xs text-dark-token [&>*]:mr-1 last:[&>*]:mr-0"
					title="Remove filters by clicking on them."
				>
					{#each $filters as filter}
						{#if 'OR' in filter}
							<div
								class="flex rounded-md p-px"
								class:variant-ghost-surface={filter.not}
								class:variant-ghost-interact={!filter.not}
							>
								{#each filter.OR as orFilter, index}
									<FilterChip label={orFilter.label} classes={filter.not ? 'bg-surface-600' : ''}>
										<div slot="outside">
											{#if index !== filter.OR.length - 1}
												<div class="-mt-px px-1 text-sm text-base-token dark:text-dark-token">
													/
												</div>
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
			class="bg-surface-100-800-token grid grid-cols-24 border-b border-surface-500 pb-0.5 pl-0.5 text-sm"
		>
			{#each columns
				.filter((col) => col.enabled)
				.sort( (a, b) => (a.order === -1 ? 1 : b.order === -1 ? -1 : a.order - b.order) ) as { label, classes, span, sorted, hover, sortedHidden }}
				<button
					title={hover}
					class="border-r-next col-span-var h-full px-1 {classes} {$settings.listSize} relative"
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
		class="offset-scroll scroll-thin h-[calc(max(var(--listHeight,0px),var(--slotHeight))-var(--headerHeight))] overflow-x-hidden overflow-y-scroll
		[&_button:nth-child(odd)]:bg-surface-200/50 dark:[&_button:nth-child(odd)]:bg-surface-700/50"
	>
		{#each filteredItems as item}
			<button
				{title}
				id="row"
				class="grid w-full grid-cols-24 pl-0.5 {$settings.listSize} hover:!variant-ghost-primary focus:!variant-ghost-primary"
				class:homebrew-shadow={!item?.official}
				class:secondary-shadow={item?.secondaryContent}
				class:selected={selected === item}
				class:active={selected === item}
				on:click={() => {
					if (selected !== item) selected = item;
					goto(`#${item.hash}`);
				}}
				on:dblclick={(event) => dblClick(item, event)}
			>
				{#each columns
					.filter((col) => col.enabled)
					.sort( (a, b) => (a.order === -1 ? 1 : b.order === -1 ? -1 : a.order - b.order) ) as { classes, span, parser }}
					<div
						class="border-r-next col-span-var h-full px-1 {classes}"
						style="--span: {span === -1 ? remainingSpan : span}"
					>
						{parser(item)}
					</div>
				{/each}
			</button>
		{/each}
	</div>
</div>
