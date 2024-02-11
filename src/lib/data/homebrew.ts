import { localStorageStore } from '@skeletonlabs/skeleton';
import { get, type Writable } from 'svelte/store';
import type { z } from 'zod';
import { bySource } from 'pf2ools-schema';
import { getTypedKeys } from '$lib/utils';

interface Homebrew {
	store: Writable<z.infer<typeof bySource>[]>;
	contents: z.infer<typeof bySource>[];
	removeByID: (id: string) => void;
}

export const homebrew: Homebrew = {
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
	},
};
