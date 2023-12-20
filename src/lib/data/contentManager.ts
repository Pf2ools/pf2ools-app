import { localStorageStore } from '@skeletonlabs/skeleton';
import { background as backgroundSchema, source as sourceSchema } from 'pf2ools-schema';
import { derived, get, type Writable } from 'svelte/store';
import type { z } from 'zod';
import { background as backgroundData } from './pf2ools-data/bundles/byDatatype/core/background.json' assert { type: 'json' };
import { source as sourceData } from './pf2ools-data/bundles/byDatatype/core/source.json' assert { type: 'json' };
import BackgroundClass from './backgroundClass';

export interface dataTypes {
	homebrew: { [key: string]: unknown };
	background: z.infer<typeof backgroundSchema>;
	source: z.infer<typeof sourceSchema>;
}

class ContentManager {
	public homebrew: Writable<dataTypes['homebrew'][]>;
	public core: {
		background: dataTypes['background'][];
		source: dataTypes['source'][];
	};
	constructor() {
		this.core = Object.freeze({
			background: Object.freeze(backgroundData) as unknown as dataTypes['background'][],
			source: Object.freeze(sourceData) as unknown as dataTypes['source'][],
		});

		this.homebrew = localStorageStore(
			'homebrew',
			JSON.parse(
				`[{"source":{"type":"source","ID":"Spappz","title":{"full":"Spappz's Public Assortment of Miscellany","short":"SPAM"},"data":{"released":"2023-09-17","added":"2023-09-17","modified":"2023-09-17","url":"https://github.com/pf2ools/pf2ools-data","copyright":["{@b {@i Pathfinder Core Rulebook (Second Edition)}} © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.","{@b {@i Spappz's Public Assortment of Miscellany}} © 2023, Spappz; Authors: Spappz."],"license":"OGLv1-0a","authors":["Spappz"]},"tags":{"misc":{"Playtest":true}}},"background":[{"type":"background","name":{"primary":"Exorcist"},"source":{"ID":"Spappz"},"data":{"traits":[{"trait":"rare"}],"entries":["You are a specialist in sending the restless dead on their way. You may travel from place to place, either wandering the road or on commission for someone interested in your services, or you might be able to ply your craft regularly in someplace notorious for its haunts.","Choose two ability boosts. One must be to Intelligence or Charisma, and one is a free ability boost.","You're trained in your choice of {@skill Occultism} or {@skill Religion}, as well as the {@skill Lore||Spirit Lore} skill. You can cast {@spell spirit sense} as an innate spell once per week. The spell is {@trait occult} if you chose {@skill Occultism}, and {@trait divine if you chose {@skill Religion}."]},"tags":{"abilityBoosts":{"count":2,"abilities":{"Intelligence":true,"Charisma":true,"Free":true}},"trainedSkills":{"count":2,"skills":{"Occultism":true,"Religion":true,"Lore":true}},"gainedSpells":{"count":1,"options":[{"name":"Spirit Sense","sourceID":"APG"}]}}}]}]`
			)
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
