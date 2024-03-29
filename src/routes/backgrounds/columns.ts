import type { columnType } from '$lib/ui/ItemList.svelte';
import backgroundClass from '$lib/data/classes/backgroundClass';

type bg = backgroundClass;
export const columns = [
	{
		enabled: true,
		order: 1,
		label: 'Name',
		hover: 'Name',
		key: 'label',
		sortable: (a: bg, b: bg) => a.label.localeCompare(b.label),
		parser: (item: bg) => item.label,
		classes: 'text-left',
		span: -1, // -1 = fill remaining space, split between all -1s
		sorted: 1,
	},
	{
		enabled: true,
		order: -1,
		label: 'Source',
		hover: 'Source',
		key: 'sourceShort',
		sortable: (a: bg, b: bg) => a.sourceShort.localeCompare(b.sourceShort),
		parser: (item: bg) => item.sourceShort,
		classes: 'text-center text-xs pt-0.5',
		span: 2,
	},
	{
		enabled: true,
		order: 2,
		label: 'Count',
		hover: 'Ability Boost Count',
		key: 'abilityBoosts.count',
		sortable: (a: bg, b: bg) => (a?.abilityBoosts?.count ?? 0) - (b?.abilityBoosts?.count ?? 0),
		parser: (item: bg) => item?.abilityBoosts?.count ?? 0,
		classes: 'text-center',
		span: 2,
	},
	{
		enabled: true,
		order: 3,
		label: 'Ability Boosts',
		hover: 'Ability Boosts',
		key: 'abilityBoosts.array',
		parser: (item: bg) => item.abilityBoosts.array.join(', '),
		sortable: (a: bg, b: bg) => {
			// sort an array of strings including Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma, and Free in that order
			const order = [
				'Strength',
				'Dexterity',
				'Constitution',
				'Intelligence',
				'Wisdom',
				'Charisma',
				'Free',
			];
			const aBoosts = a.abilityBoosts.array;
			const bBoosts = b.abilityBoosts.array;
			for (let i = 0; i < Math.min(aBoosts.length, bBoosts.length); i++) {
				const aIndex = order.indexOf(aBoosts[i]);
				const bIndex = order.indexOf(bBoosts[i]);
				if (aIndex !== bIndex) return aIndex - bIndex;
			}
		},
		classes: 'text-left',
		span: 10,
	},
] as columnType<bg>[];
