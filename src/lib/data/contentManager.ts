import { localStorageStore } from '@skeletonlabs/skeleton';
import { background as backgroundSchema } from 'pf2ools-schema';
import { derived, get, type Readable, type Writable } from 'svelte/store';
import type { z } from 'zod';
import { background as backgrounds } from './pf2ools-data/bundles/byDatatype/core/background.json' assert { type: 'json' };

interface dataTypes {
	homebrew: { [key: string]: unknown };
	backgrounds: z.infer<typeof backgroundSchema>;
}

class ContentManager {
	public homebrew: Writable<dataTypes['homebrew'][]>;
	public core: {
		backgrounds: dataTypes['backgrounds'][];
	};
	constructor() {
		this.core = {
			backgrounds: backgrounds as unknown as dataTypes['backgrounds'][],
		};

		this.homebrew = localStorageStore('homebrew', []);
	}

	get _homebrew() {
		return get(this.homebrew);
	}
	get _backgrounds() {
		return get(this.backgrounds);
	}
	get backgrounds(): Readable<dataTypes['backgrounds'][]> {
		return derived(this.homebrew, ($homebrew) => {
			const homebrewBackgrounds = $homebrew.filter((data) => data.background !== undefined);
			const backgrounds = homebrewBackgrounds.map((data) => data.background).flat();

			type error = { data: dataTypes['backgrounds']; success: false; zodErrors: z.ZodIssue[] };

			const parsedBackgrounds = backgrounds.map((bg) => {
				const parsed = backgroundSchema.safeParse(bg);
				if (parsed.success) {
					return parsed;
				} else {
					return {
						data: bg,
						success: false,
						zodErrors: parsed.error.errors,
					};
				}
			});

			const safeBackgrounds = parsedBackgrounds.filter((bg) => bg.success).map((bg) => bg.data);
			const unsafeBackgrounds = parsedBackgrounds.filter((bg) => !bg.success) as error[];

			if (unsafeBackgrounds.length > 0) {
				console.warn('Some Backgrounds have failed validation!', unsafeBackgrounds);
				unsafeBackgrounds.forEach((bg) => {
					console.warn(
						`The ${bg.data.type} "${bg.data.name.primary}" from "${
							bg.data.source.ID
						}" failed schema validation!${bg.zodErrors
							.map((err) => `\n\t"${err.message}" at ${err.path.join('.')}`)
							.join('')}`
					);
				});
			}

			return [...this.core.backgrounds, ...safeBackgrounds] as dataTypes['backgrounds'][];
		});
	}
}

export default new ContentManager();
