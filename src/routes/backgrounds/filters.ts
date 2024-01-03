import cm, { type classTypes } from '$lib/data/contentManager';
import { derived, type Readable } from 'svelte/store';
import { type filter } from '$lib/components/ItemList.svelte';

type bg = classTypes['background'];

export const filters: Readable<filter<bg>[]> = derived(cm.background, ($backgrounds) => [
	{
		order: 1,
		label: 'Source',
		options: [...new Set($backgrounds.map((background) => background.source.ID))].map((source) => {
			const srcData = cm.sourceByID.get(source);
			return {
				label: srcData?.label ?? source,
				value: source,
				default: srcData?.official ?? srcData?.homebrew ?? false, // official or homebrew are displayed by default
				category: srcData?.official ? 0 : srcData?.secondaryContent ? 1 : srcData?.homebrew ? 2 : 3, // official, secondary, homebrew, some other unknown thing
			};
		}),
		filterBy: (item: bg) => item.source.ID,
	},
]);
