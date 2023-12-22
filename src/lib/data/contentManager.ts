import { dev } from '$app/environment';
import { localStorageStore } from '@skeletonlabs/skeleton';
import {
	background as backgroundSchema,
	condition as conditionSchema,
	divineIntercession as divineIntercessionSchema,
	event as eventSchema,
	relicGift as relicGiftSchema,
	skill as skillSchema,
	source as sourceSchema,
} from 'pf2ools-schema';
import { derived, get, type Writable } from 'svelte/store';
import type { z } from 'zod';
import BackgroundClass from './backgroundClass';
import { background as backgroundData } from './pf2ools-data/bundles/byDatatype/core/background.json' assert { type: 'json' };
import { condition as conditionData } from './pf2ools-data/bundles/byDatatype/core/condition.json' assert { type: 'json' };
import { divineIntercession as divineIntercessionData } from './pf2ools-data/bundles/byDatatype/core/divineIntercession.json' assert { type: 'json' };
import { event as eventData } from './pf2ools-data/bundles/byDatatype/core/event.json' assert { type: 'json' };
import { relicGift as relicGiftData } from './pf2ools-data/bundles/byDatatype/core/relicGift.json' assert { type: 'json' };
import { skill as skillData } from './pf2ools-data/bundles/byDatatype/core/skill.json' assert { type: 'json' };
import { source as sourceData } from './pf2ools-data/bundles/byDatatype/core/source.json' assert { type: 'json' };

export interface dataTypes {
	homebrew: { [key: string]: unknown };
	background: z.infer<typeof backgroundSchema>;
	source: z.infer<typeof sourceSchema>;
	condition: z.infer<typeof conditionSchema>;
	divineIntercession: z.infer<typeof divineIntercessionSchema>;
	event: z.infer<typeof eventSchema>;
	relicGift: z.infer<typeof relicGiftSchema>;
	skill: z.infer<typeof skillSchema>;
}

class ContentManager {
	public homebrewIndex: Writable<string[]>;
	public homebrew: Writable<dataTypes['homebrew'][]>;
	public core: {
		background: dataTypes['background'][];
		source: dataTypes['source'][];
		condition: dataTypes['condition'][];
		divineIntercession: dataTypes['divineIntercession'][];
		event: dataTypes['event'][];
		relicGift: dataTypes['relicGift'][];
		skill: dataTypes['skill'][];
	};
	constructor() {
		this.core = Object.freeze({
			background: Object.freeze(backgroundData) as unknown as dataTypes['background'][],
			source: Object.freeze(sourceData) as unknown as dataTypes['source'][],
			condition: Object.freeze(conditionData) as unknown as dataTypes['condition'][],
			divineIntercession: Object.freeze(
				divineIntercessionData
			) as unknown as dataTypes['divineIntercession'][],
			event: Object.freeze(eventData) as unknown as dataTypes['event'][],
			relicGift: Object.freeze(relicGiftData) as unknown as dataTypes['relicGift'][],
			skill: Object.freeze(skillData) as unknown as dataTypes['skill'][],
		});

		this.homebrew = localStorageStore('homebrew', []);
		this.homebrewIndex = localStorageStore('homebrewIndex', [
			'https://raw.githubusercontent.com/Pf2ools/pf2ools-data/master/indexes/homebrewSources.json',
		]);

		if (dev) console.log(this);
	}

	async fetchHomebrew() {
		return await Promise.all(
			get(this.homebrewIndex).map(async (url) => {
				const response = await fetch(url);
				if (response.ok) {
					// TODO: Proper types
					return (await response.json()) as dataTypes['homebrew'][];
				} else {
					throw new Error(`${response.status} ${response.statusText}`);
				}
			})
		);
	}

	get _homebrew() {
		return get(this.homebrew);
	}

	//#region Background
	static backgroundClass = BackgroundClass;

	get _background() {
		return get(this.background);
	}
	get background() {
		return derived(this.homebrew, ($homebrew) => {
			const homebrewBackgrounds = $homebrew.filter((data) => data.background !== undefined);
			const backgrounds = homebrewBackgrounds.map((data) => data.background).flat();

			type error = { data: dataTypes['background']; success: false; zodErrors: z.ZodIssue[] };

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

			return ([...this.core.background, ...safeBackgrounds] as dataTypes['background'][]).map(
				(bg) => new ContentManager.backgroundClass(bg)
			);
		});
	}
	//#endregion

	//#region Source
	get _source() {
		return get(this.source);
	}
	get source() {
		return derived(this.homebrew, ($homebrew) => {
			const homebrewsources = $homebrew.filter((data) => data.source !== undefined);
			const sources = homebrewsources.map((data) => data.source).flat();

			type error = { data: dataTypes['source']; success: false; zodErrors: z.ZodIssue[] };

			const parsedsources = sources.map((src) => {
				const parsed = sourceSchema.safeParse(src);
				if (parsed.success) {
					return parsed;
				} else {
					return {
						data: src,
						success: false,
						zodErrors: parsed.error.errors,
					};
				}
			});

			const safesources = parsedsources.filter((src) => src.success).map((src) => src.data);
			const unsafesources = parsedsources.filter((src) => !src.success) as error[];

			if (unsafesources.length > 0) {
				console.warn('Some sources have failed validation!', unsafesources);
				unsafesources.forEach((src) => {
					console.warn(
						`The ${src.data.type} "${src.data.title.full}" failed schema validation!${src.zodErrors
							.map((err) => `\n\t"${err.message}" at ${err.path.join('.')}`)
							.join('')}`
					);
				});
			}

			return [...this.core.source, ...safesources] as dataTypes['source'][];
		});
	}
	//#endregion
}

const contentManager = new ContentManager();
window.contentManager = contentManager;
export default contentManager;
