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
import { derived, get, type Readable, type Writable } from 'svelte/store';
import type { z } from 'zod';
import { background as backgroundData } from './pf2ools-data/bundles/byDatatype/core/background.json' assert { type: 'json' };
import { condition as conditionData } from './pf2ools-data/bundles/byDatatype/core/condition.json' assert { type: 'json' };
import { divineIntercession as divineIntercessionData } from './pf2ools-data/bundles/byDatatype/core/divineIntercession.json' assert { type: 'json' };
import { event as eventData } from './pf2ools-data/bundles/byDatatype/core/event.json' assert { type: 'json' };
import { relicGift as relicGiftData } from './pf2ools-data/bundles/byDatatype/core/relicGift.json' assert { type: 'json' };
import { skill as skillData } from './pf2ools-data/bundles/byDatatype/core/skill.json' assert { type: 'json' };
import { source as sourceData } from './pf2ools-data/bundles/byDatatype/core/source.json' assert { type: 'json' };

import BackgroundClass from './classes/backgroundClass';
import SourceClass from './classes/sourceClass';
import ConditionClass from './classes/conditionClass';
import DivineIntercessionClass from './classes/divineIntercessionClass';
import EventClass from './classes/eventClass';
import RelicGiftClass from './classes/relicGiftClass';
import SkillClass from './classes/skillClass';

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

export interface classTypes {
	background: BackgroundClass;
	source: SourceClass;
	condition: ConditionClass;
	divineIntercession: DivineIntercessionClass;
	event: EventClass;
	relicGift: RelicGiftClass;
	skill: SkillClass;
}

export interface classConstructorTypes {
	background: typeof BackgroundClass;
	source: typeof SourceClass;
	condition: typeof ConditionClass;
	divineIntercession: typeof DivineIntercessionClass;
	event: typeof EventClass;
	relicGift: typeof RelicGiftClass;
	skill: typeof SkillClass;
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
			'https://raw.githubusercontent.com/Pf2ools/pf2ools-data/master',
		]);

		if (dev) console.log(this);
	}

	async fetchHomebrew() {
		return await Promise.all(
			get(contentManager.homebrewIndex).map(async (url) => {
				const response = await fetch(`${url}/indexes/homebrewSources.json`);
				if (response.ok) {
					// TODO: Proper types
					return { ...(await response.json()), source: url } as dataTypes['homebrew'][];
				} else {
					throw new Error(`${response.status} ${response.statusText}`);
				}
			})
		);
	}

	get _homebrew() {
		return get(this.homebrew);
	}

	get _homebrewIndex() {
		return get(this.homebrewIndex);
	}

	//#region Background
	static backgroundClass = BackgroundClass;

	get _background() {
		return get(this.background);
	}
	get background() {
		return derivedContent(
			this.core.background,
			backgroundSchema,
			ContentManager.backgroundClass
		) as Readable<classTypes['background'][]>;
	}
	//#endregion

	//#region Source
	static sourceClass = SourceClass;

	get _source() {
		return get(this.source);
	}
	get source() {
		return derivedContent(this.core.source, sourceSchema, ContentManager.sourceClass) as Readable<
			classTypes['source'][]
		>;
	}
	//#endregion

	//#region Condition
	static conditionClass = ConditionClass;

	get _condition() {
		return get(this.condition);
	}

	get condition() {
		return derivedContent(
			this.core.condition,
			conditionSchema,
			ContentManager.conditionClass
		) as Readable<classTypes['condition'][]>;
	}

	//#endregion

	//#region Divine Intercession
	static divineIntercessionClass = DivineIntercessionClass;

	get _divineIntercession() {
		return get(this.divineIntercession);
	}

	get divineIntercession() {
		return derivedContent(
			this.core.divineIntercession,
			divineIntercessionSchema,
			ContentManager.divineIntercessionClass
		) as Readable<classTypes['divineIntercession'][]>;
	}

	//#endregion

	//#region Event
	static eventClass = EventClass;

	get _event() {
		return get(this.event);
	}

	get event() {
		return derivedContent(this.core.event, eventSchema, ContentManager.eventClass) as Readable<
			classTypes['event'][]
		>;
	}

	//#endregion

	//#region Relic Gift
	static relicGiftClass = RelicGiftClass;

	get _relicGift() {
		return get(this.relicGift);
	}

	get relicGift() {
		return derivedContent(
			this.core.relicGift,
			relicGiftSchema,
			ContentManager.relicGiftClass
		) as Readable<classTypes['relicGift'][]>;
	}

	//#endregion

	//#region Skill
	static skillClass = SkillClass;

	get _skill() {
		return get(this.skill);
	}

	get skill() {
		return derivedContent(this.core.skill, skillSchema, ContentManager.skillClass) as Readable<
			classTypes['skill'][]
		>;
	}

	//#endregion
}

function derivedContent<T extends keyof classTypes>(
	content: dataTypes[T][],
	schema: z.ZodSchema<unknown>,
	contentClass: classConstructorTypes[T]
) {
	return derived(contentManager.homebrew, ($homebrew) => {
		const homebrewWithContent = $homebrew.filter((data) => data[content[0].type] !== undefined);
		const homebrewContent = homebrewWithContent.map((data) => data[content[0].type]).flat();

		type error = { data: dataTypes[T]; success: false; zodErrors: z.ZodIssue[] };

		const parsedContent = homebrewContent.map((bg) => {
			const parsed = schema.safeParse(bg);
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

		const safeHomebrewContent = parsedContent.filter((bg) => bg.success).map((bg) => bg.data);
		const unsafeContent = parsedContent.filter((bg) => !bg.success) as error[];

		if (unsafeContent.length > 0) {
			console.warn('Some content have failed validation!', unsafeContent);
			unsafeContent.forEach((bg) => {
				console.warn(
					`The following object failed schema validation!${bg.zodErrors
						.map((err) => `\n\t"${err.message}" at ${err.path.join('.')}`)
						.join('')}`,
					unsafeContent
				);
			});
		}

		return ([...content, ...safeHomebrewContent] as dataTypes[T][]).map(
			// @ts-expect-error TODO: I hate TypeScript I hate TypeScript I hate TypeScript
			(bg) => new contentClass(bg)
		);
	});
}

const contentManager = new ContentManager();
window.contentManager = contentManager;
export default contentManager;
