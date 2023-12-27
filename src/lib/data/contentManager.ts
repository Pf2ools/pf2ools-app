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
	domain as domainSchema,
	statblock as statblockSchema,
	bySource as contentWithSourceSchema,
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
import DomainClass from './classes/domainClass';

export interface dataTypes {
	background: z.infer<typeof backgroundSchema>;
	source: z.infer<typeof sourceSchema>;
	condition: z.infer<typeof conditionSchema>;
	divineIntercession: z.infer<typeof divineIntercessionSchema>;
	event: z.infer<typeof eventSchema>;
	relicGift: z.infer<typeof relicGiftSchema>;
	skill: z.infer<typeof skillSchema>;
	domain: z.infer<typeof domainSchema>;
}

export interface classTypes {
	background: BackgroundClass;
	source: SourceClass;
	condition: ConditionClass;
	divineIntercession: DivineIntercessionClass;
	event: EventClass;
	relicGift: RelicGiftClass;
	skill: SkillClass;
	domain: DomainClass;
}

export interface classConstructorTypes {
	background: typeof BackgroundClass;
	source: typeof SourceClass;
	condition: typeof ConditionClass;
	divineIntercession: typeof DivineIntercessionClass;
	event: typeof EventClass;
	relicGift: typeof RelicGiftClass;
	skill: typeof SkillClass;
	domain: typeof DomainClass;
}

class ContentManager {
	public homebrew: Writable<Map<string, z.infer<typeof contentWithSourceSchema>>>;
	public homebrewIndexes: Writable<string[]>;
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

		this.homebrew = localStorageStore('homebrew', new Map());
		this.homebrewIndexes = localStorageStore('homebrewIndex', [
			'https://raw.githubusercontent.com/Pf2ools/pf2ools-data/master',
		]);

		if (dev) console.log(this);
	}

	/* async fetchHomebrew(): Promise<classTypes['homebrewSource'][]> {
		return (
			(
				await Promise.all(
					get(contentManager.homebrewIndex).map(async (url) => {
						const fullUrl = `${url}/indexes/homebrewSources.json`;
						const response = await fetch(`${fullUrl}`);
						if (response.ok) {
							if (dev) console.log(`Fetching homebrew index from:\n${fullUrl}`);
							const homebrewSources = await response.json();
							const parsedHomebrewSources = homebrewSourcesIndexSchema.safeParse(homebrewSources);

							if (parsedHomebrewSources.success) {
								return Object.keys(parsedHomebrewSources.data).map((key) => {
									parsedHomebrewSources.data[key].sourceURL ??= url;
									return parsedHomebrewSources.data[key];
								});
							} else {
								console.error(
									`Homebrew index at ${fullUrl} failed validation!`,
									parsedHomebrewSources.error
								);
								return {};
							}
						} else {
							console.error(`${response.status} ${response.statusText}`);
							return {};
						}
					})
				)
			)
				.flat()
				.filter((source) => Object.keys(source).length > 0) as classTypes['homebrewSource'][]
		).map((source) => new HomebrewSourceClass(source));
	}
 */

	get _homebrew() {
		return get(this.homebrew);
	}

	get _homebrewIndexes() {
		return get(this.homebrewIndexes);
	}

	//#region Background
	static backgroundClass = BackgroundClass;

	get _background() {
		return get(this.background);
	}
	get background() {
		return derivedContent('background', this.core.background, ContentManager.backgroundClass);
	}
	//#endregion

	//#region Source
	static sourceClass = SourceClass;

	get _source() {
		return get(this.source);
	}
	get source() {
		return derivedContent('source', this.core.source, ContentManager.sourceClass);
	}
	//#endregion

	//#region Condition
	static conditionClass = ConditionClass;

	get _condition() {
		return get(this.condition);
	}

	get condition() {
		return derivedContent('condition', this.core.condition, ContentManager.conditionClass);
	}

	//#endregion

	//#region Divine Intercession
	static divineIntercessionClass = DivineIntercessionClass;

	get _divineIntercession() {
		return get(this.divineIntercession);
	}

	get divineIntercession() {
		return derivedContent(
			'divineIntercession',
			this.core.divineIntercession,
			ContentManager.divineIntercessionClass
		);
	}

	//#endregion

	//#region Event
	static eventClass = EventClass;

	get _event() {
		return get(this.event);
	}

	get event() {
		return derivedContent('event', this.core.event, ContentManager.eventClass);
	}

	//#endregion

	//#region Relic Gift
	static relicGiftClass = RelicGiftClass;

	get _relicGift() {
		return get(this.relicGift);
	}

	get relicGift() {
		return derivedContent('relicGift', this.core.relicGift, ContentManager.relicGiftClass);
	}

	//#endregion

	//#region Skill
	static skillClass = SkillClass;

	get _skill() {
		return get(this.skill);
	}

	get skill() {
		return derivedContent('skill', this.core.skill, ContentManager.skillClass);
	}

	//#endregion
}

// TODO: Unfuck this, send help
function derivedContent<T extends keyof classTypes>(
	type: T,
	content: dataTypes[T][],
	contentClass: classConstructorTypes[T]
): Readable<classTypes[T][]> {
	return derived(contentManager.homebrew, ($homebrew) => {
		const homebrewSources = [...$homebrew.values()].filter((source) => source[type] !== undefined);
		const homebrewData = homebrewSources.map((source) => source[type]);

		const parsed = homebrewData.filter((statblock) => {
			const parse = statblockSchema.safeParse(statblock);
			if (!parse.success) console.error(parse.error);
			return statblockSchema.safeParse(statblock).success;
		});

		return [...parsed, ...content].map((statblock) => new contentClass(statblock));
	});
}

const contentManager = new ContentManager();
window.contentManager = contentManager;
export default contentManager;
