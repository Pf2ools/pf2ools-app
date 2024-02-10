import backgroundClass from './classes/backgroundClass';
import { background as backgroundData } from './pf2ools-data/bundles/byDatatype/core/background.json' assert { type: 'json' };
import { background as backgroundSchema } from 'pf2ools-schema';
import { derived, get } from 'svelte/store';
import { homebrew } from './homebrew';
import type { z } from 'zod';

export const backgrounds = {
	data: backgroundData as z.infer<typeof backgroundSchema>[],
	schema: backgroundSchema,
	class: backgroundClass,
	get contents() {
		return get(this.store);
	},
	get store() {
		return derived(homebrew, ($hb) => [...this.data, ...$hb].map((b) => new this.class(b)));
	},
};
