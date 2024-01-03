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
</script>

<script lang="ts" generics="T extends classTypes[keyof classTypes]">
	import { dev } from '$app/environment';

	import { settings } from '$lib/settings';
	import type { classTypes } from '$lib/data/contentManager';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	export let items: T[] = [];
	export let selected: T;
	export let columns: columnType<T>[];

	selected ??= items[0];

	let remainingSpan = Math.max(
		1,
		columns.filter((col) => col.enabled).reduce((a, b) => Math.max(a, 0) - Math.max(b.span, 0), 24)
	);

	let search = '';

	$: if (dev) {
		console.log(selected);
	}

	let filteredItems = items;
	$: {
		filteredItems = items.filter((item) => {
			return search
				.toLowerCase()
				.split(',')
				.map((term) => term.trim())
				.every((term) => {
					return item.label.toLowerCase().includes(term);
				});
		});

		columns.forEach((col) => {
			if (col.sorted !== 0) {
				filteredItems.sort((a, b) => {
					return (col.sorted || 0) * col.sortable(a, b);
				});
			}
		});
	}

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

	function move(event: KeyboardEvent) {
		if ((event.key === 'j' || event.key === 'k') && document?.activeElement?.tagName !== 'INPUT') {
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

	function hashChange(event: HashChangeEvent & { currentTarget: EventTarget & Window }) {
		const hash = event.newURL.split('#')[1]?.replace('#', '');
		if (!hash) return;
		const found = findByHash(hash);
		if (found) selected = found;
	}

	let headerHeight = 50;
</script>

<svelte:window on:keydown={move} on:hashchange={(event) => hashChange(event)} />

<div class="card flex flex-col" style="--headerHeight: {headerHeight}px">
	<div class="top-0" bind:clientHeight={headerHeight}>
		<div>
			<div class="input-group input-group-divider flex flex-row rounded-b-none">
				<div class="input-group-shim !p-0">
					<button class="btn p-0">Filters</button>
				</div>
				<input
					class="input rounded-b-none rounded-l-none p-1 pl-2"
					type="text"
					placeholder="Search..."
					bind:value={search}
				/>
			</div>
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
