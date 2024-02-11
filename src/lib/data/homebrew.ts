import { localStorageStore } from '@skeletonlabs/skeleton';
import { get, type Writable } from 'svelte/store';
import type { z } from 'zod';
import { bySource } from 'pf2ools-schema';
import { getTypedKeys } from '$lib/utils';

interface Homebrew {
	indexes: Writable<string[]>;
	store: Writable<z.infer<typeof bySource>[]>;
	contents: z.infer<typeof bySource>[];
	removeByID: (id: string) => void;
	removeAll: () => void;
}

export const homebrew: Homebrew = {
	indexes: localStorageStore('homebrewIndexes', [
		'https://raw.githubusercontent.com/Pf2ools/pf2ools-data/master',
	]),
	store: localStorageStore('homebrew', []),
	get contents() {
		return get(this.store);
	},
	removeByID(id: string) {
		this.store.update((homebrewFiles) =>
			homebrewFiles.map((file) => {
				getTypedKeys(file).forEach((key) => {
					file[key]?.filter((item) => {
						if ('source' in item) {
							return item.source?.ID !== id;
						} else {
							return item.ID !== id;
						}
					});
				});
				return file;
			})
		);
		console.log('Removed homebrew with ID:', id);
	},
	removeAll() {
		this.store.set([]);
		console.log('Removed all homebrew');
	},
};
