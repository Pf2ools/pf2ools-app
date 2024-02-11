import sourceClass from './classes/sourceClass';
import { source as sourceData } from './pf2ools-data/bundles/byDatatype/core/source.json' assert { type: 'json' };
import { source as sourceSchema } from 'pf2ools-schema';
// ==========
import { derived, get } from 'svelte/store';
import { homebrew } from './homebrew';
import type { z } from 'zod';

export const sources = {
	data: sourceData as z.infer<typeof sourceSchema>[],
	schema: sourceSchema,
	class: sourceClass,
	homebrew: {
		store: derived(homebrew.store, ($hb) => $hb.flatMap((b) => b.source || [])),
		get contents() {
			return get(this.store);
		},
	},
	get contents() {
		return get(this.store);
	},
	get store() {
		return derived(this.homebrew.store, ($hb) =>
			[...this.data, ...$hb].map((b) => new this.class(b))
		);
	},
	findID(id: string) {
		return this.contents.find((source) => source.ID === id);
	},
};
