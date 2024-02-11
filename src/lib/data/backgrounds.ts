import backgroundClass from './classes/backgroundClass';
import { background as backgroundData } from './pf2ools-data/bundles/byDatatype/core/background.json' assert { type: 'json' };
import { background as backgroundSchema } from 'pf2ools-schema';
// ==========
import { derived, get, type Readable } from 'svelte/store';
import { homebrew } from './homebrew';
import type { z } from 'zod';

export interface backgrounds {
	data: z.infer<typeof backgroundSchema>[];
	schema: typeof backgroundSchema;
	class: typeof backgroundClass;
	homebrew: {
		store: Readable<z.infer<typeof backgroundSchema>[]>;
		contents: z.infer<typeof backgroundSchema>[];
	};
	contents: z.infer<typeof backgroundSchema>[];
	store: Readable<z.infer<typeof backgroundSchema>[]>;
}

export const backgrounds: backgrounds = {
	data: backgroundData as z.infer<typeof backgroundSchema>[],
	schema: backgroundSchema,
	class: backgroundClass,
	homebrew: {
		store: derived<typeof homebrew.store, z.infer<typeof backgroundSchema>[]>(
			homebrew.store,
			($hb) => $hb.flatMap((b) => b.background || [])
		),
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
};
