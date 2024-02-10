import { localStorageStore } from '@skeletonlabs/skeleton';
import { get, type Writable } from 'svelte/store';
import type { z } from 'zod';
import { bySource } from 'pf2ools-schema';

interface Homebrew {
	store: Writable<z.infer<typeof bySource>[]>;
	contents: z.infer<typeof bySource>[];
	removeID: (id: string) => void;
}

export const homebrew: Homebrew = {
	store: localStorageStore('homebrew', []),
	get contents() {
		return get(this.store);
	},
	removeID(id: string) {
		this.store.update((hb) => hb.filter((b) => b.source.ID !== id));
	},
};
