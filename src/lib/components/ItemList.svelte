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
	};
</script>

<script lang="ts">
	import { settings } from '$lib/settings';
	import type { classTypes } from '$lib/data/contentManager';
	export let items: classTypes[keyof classTypes][] = [];
	export let selected = items[0];
	export let columns: columnType<any>[];

	/*
	[
		{
			enabled: true,
			order: 1,
			label: 'Name',
			key: 'name.primary',
			sortable: (a: itemType, b: itemType) => a.name.primary.localeCompare(b.name.primary),
			parser: (item: itemType) => item.name.primary,
			classes: 'text-left',
			span: -1, // -1 = fill remaining space
		},
		{
			enabled: true,
			order: -1,
			label: 'Source',
			key: 'source.ID',
			sortable: (a: itemType, b: itemType) => a.source.ID.localeCompare(b.source.ID),
			parser: (item: itemType) => item.source.ID,
			classes: 'text-center',
			span: 2,
		},
	];
	*/

	let remainingSpan = Math.max(
		1,
		columns.filter((col) => col.enabled).reduce((a, b) => Math.max(a, 0) - Math.max(b.span, 0), 24)
	);

	let search = '';

	let filteredItems = items;
	$: {
		filteredItems = items.filter((item) => {
			return search
				.toLowerCase()
				.split(',')
				.map((term) => term.trim())
				.every((term) => {
					return (typeof item.title === 'string' ? item.title : item.title.full)
						.toLowerCase()
						.includes(term);
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

	let headerHeight = 50;
</script>

<svelte:window on:keydown={move} />

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
			class="pl-1 pb-0.5 grid grid-cols-24 bg-surface-100-800-token text-sm border-b border-surface-500"
		>
			{#each columns
				.filter((col) => col.enabled)
				.sort( (a, b) => (a.order === -1 ? 1 : b.order === -1 ? -1 : a.order - b.order) ) as { label, classes, span, sorted, hover }}
				<button
					title={hover}
					class="border-r-next px-1 col-span-var h-full {classes} {$settings.listSize} relative"
					style="--span: {span === -1 ? remainingSpan : span}"
					on:click={() => {
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
						{sorted === 1 ? '▲' : sorted === -1 ? '▼' : ''}
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
				class="pl-1 grid grid-cols-24 w-full {$settings.listSize} hover:!variant-ghost-primary focus:!variant-ghost-primary"
				class:!variant-soft-primary={selected === item}
				class:active={selected === item}
				on:click={() => (selected !== item ? (selected = item) : null)}
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
