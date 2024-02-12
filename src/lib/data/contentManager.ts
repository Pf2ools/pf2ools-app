import { dev } from '$app/environment';
import { localStorageStore } from '@skeletonlabs/skeleton';
import {
	background as backgroundSchema,
	bySource as contentWithSourceSchema,
	condition as conditionSchema,
	data as dataSchema,
	divineIntercession as divineIntercessionSchema,
	domain as domainSchema,
	event as eventSchema,
	homebrewSources as homebrewSourcesSchema,
	relicGift as relicGiftSchema,
	skill as skillSchema,
	source as sourceSchema,
} from 'pf2ools-schema';
import { derived, get, type Writable, writable } from 'svelte/store';
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
import HomebrewSourceClass from './classes/homebrewSourceClass';
import { dateConvert } from '../utils';

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
	homebrewSources: HomebrewSourceClass;
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
	homebrewSources: typeof HomebrewSourceClass;
}

export class ContentManager {
	public homebrew: Writable<z.infer<typeof contentWithSourceSchema>[]>;
	public homebrewIndexes: Writable<string[]>;
	public homebrewSources: Writable<classTypes['homebrewSources'][]>;
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
		this.homebrewSources = writable([]);
		this.homebrewIndexes = localStorageStore('homebrewIndex', [
			'https://raw.githubusercontent.com/Pf2ools/pf2ools-data/master',
		]);
	}

	//#region Utils

	static unknownSource = {
		ID: 'unknown',
		label: 'Unknown',
		title: { full: 'Unknown', short: 'UNK' },
		official: false,
		secondaryContent: false,
	};

	get brewIDs() {
		return [
			...new Set(
				this._homebrew
					.map((content) => Object.values(content))
					.flat(2)
					.flatMap((content) => ('source' in content ? content?.source?.ID : content?.ID))
			),
		];
	}

	get sourceByID() {
		return new Map(this._source.map((source) => [source.ID, source]));
	}

	removeID(ID: string) {
		this.homebrew.update((homebrew) =>
			homebrew
				.map((content) => {
					this.removeIDFromObj(ID, content as z.infer<typeof contentWithSourceSchema>);
					return content;
				})
				.filter((content) => Object.values(content).flat(2).length > 0)
		);
	}

	/**
	 * Removes all instances of an ID from the object's key's arrays ({ [key]: [{ ID: "bad" }] })
	 */
	removeIDFromObj(ID: string, obj: z.infer<typeof contentWithSourceSchema>) {
		type keys = keyof z.infer<typeof contentWithSourceSchema>;
		const keys = Object.keys(obj) as keys[];
		keys.forEach((key) => {
			const keyProp = obj[key];
			if (Array.isArray(keyProp)) {
				// @ts-expect-error - I know what I'm doing
				obj[key] = keyProp.filter((item) => {
					if ('source' in item) {
						return item.source.ID !== ID;
					}
					return item.ID !== ID;
				});
			}
		});
		return obj;
	}

	//#endregion

	//#region Homebrew
	get _homebrew() {
		return get(this.homebrew);
	}

	get _homebrewIndexes() {
		return get(this.homebrewIndexes);
	}

	get _homebrewSources() {
		return get(this.homebrewSources);
	}

	addHomebrewSource(unsafeContent: z.infer<typeof contentWithSourceSchema>) {
		const parse = contentWithSourceSchema.safeParse(unsafeContent);
		if (parse.success) {
			const content = parse.data;
			const tbdIDs = content.source.map((source) => source.ID);

			tbdIDs.forEach((ID) => {
				if (this.brewIDs.includes(ID)) {
					if (dev) console.warn(`Homebrew with ID ${ID} already exists!`);
					const offender = content.source.find((source) => source.ID === ID);
					if (
						dateConvert(this.sourceByID.get(ID)!.data.modified) >
						dateConvert(offender!.data.modified)
					) {
						if (dev)
							console.warn('The existing homebrew is newer, removing from the incoming homebrew.');
						this.removeIDFromObj(ID, content);
					} else {
						if (dev) console.warn('The incoming homebrew is newer, replacing existing brew.');
						this.removeID(ID);
					}
				}
			});

			this.homebrew.update((homebrew) => [...homebrew, content]);
			console.log(`Added the following homebrew:\n`, parse.data);
			return true;
		} else {
			console.error(parse.error);
			return false;
		}
	}

	async clearHomebrew() {
		this.homebrew.set([]);
	}

	getHomebrewByType<T extends keyof dataTypes>(type: T, homebrew = this._homebrew) {
		const homebrewSources = homebrew.filter((source) => source[type] !== undefined);
		const homebrewData = homebrewSources.map((source) => source[type]).flat();

		const parsed = homebrewData.filter((statblock) => {
			const parse = dataSchema.safeParse(statblock);
			if (!parse.success) {
				console.error(parse.error);
				console.log(statblock);
			}
			return parse.success;
		});

		return parsed as dataTypes[T][];
	}

	/**
	 * Fetches the homebrew index(es) and adds ALL homebrew from them.
	 * You need to hit it twice. Works explosively. Don't use it.
	 */
	async unleashTheHomebrew() {
		await this.fetchHomebrewIndex();

		const unsubscribe = this.homebrewSources.subscribe(async (src) =>
			src.forEach(async (source) => {
				await this.addHomebrewFromUrl(source.downloadURL);
			})
		);

		unsubscribe();
	}

	async fetchHomebrewIndex() {
		this._homebrewIndexes.forEach(async (url) => {
			let fullUrl = url;
			if (!fullUrl.endsWith('.json')) fullUrl = `${url}/indexes/homebrewSources.json`;
			const response = await fetch(`${fullUrl}`);

			if (response.ok) {
				if (dev) console.log(`Fetching homebrew index from:\n${fullUrl}`);
				const homebrewJSON = await response.json();
				const parsedHomebrewSources = homebrewSourcesSchema.safeParse(homebrewJSON);

				if (parsedHomebrewSources.success) {
					const homebrewSources = parsedHomebrewSources.data.map((src) => {
						src.sourceURL ??= url;
						return src;
					});

					this.homebrewSources.update((srcs) =>
						[...srcs, ...homebrewSources].map((src) => new HomebrewSourceClass(src))
					);
					console.log(`Added the following homebrew sources:\n`, homebrewSources);
				} else {
					console.error(
						`Homebrew index at ${fullUrl} failed validation!`,
						parsedHomebrewSources.error
					);
				}
			} else {
				console.error(`${response.status} ${response.statusText}`);
			}
		});
	}

	async addHomebrewFromUrl(url: string) {
		const response = await fetch(url);
		if (response.ok) {
			const homebrewJSON = await response.json();
			const parsedHomebrew = contentWithSourceSchema.safeParse(homebrewJSON);

			if (parsedHomebrew.success) {
				this.addHomebrewSource(parsedHomebrew.data);
			} else {
				console.error(`Homebrew at ${url} failed validation!`, parsedHomebrew.error);
			}
		} else {
			console.error(`${response.status} ${response.statusText}`);
		}
	}

	//#endregion

	//#region Background
	static backgroundClass = BackgroundClass;

	get _background() {
		return get(this.background);
	}
	get background() {
		return derived(this.homebrew, ($homebrew) =>
			[...this.getHomebrewByType('background', $homebrew), ...this.core.background].map(
				(background) => new ContentManager.backgroundClass(background)
			)
		);
	}
	//#endregion

	//#region Source
	static sourceClass = SourceClass;

	get _source() {
		return get(this.source);
	}
	get source() {
		return derived(this.homebrew, ($homebrew) =>
			[...this.getHomebrewByType('source', $homebrew), ...this.core.source].map(
				(source) => new ContentManager.sourceClass(source)
			)
		);
	}
	//#endregion

	//#region Condition
	static conditionClass = ConditionClass;

	get _condition() {
		return get(this.condition);
	}

	get condition() {
		return derived(this.homebrew, ($homebrew) =>
			[...this.getHomebrewByType('condition', $homebrew), ...this.core.condition].map(
				(condition) => new ContentManager.conditionClass(condition)
			)
		);
	}

	//#endregion

	//#region Divine Intercession
	static divineIntercessionClass = DivineIntercessionClass;

	get _divineIntercession() {
		return get(this.divineIntercession);
	}

	get divineIntercession() {
		return derived(this.homebrew, ($homebrew) =>
			[
				...this.getHomebrewByType('divineIntercession', $homebrew),
				...this.core.divineIntercession,
			].map((divineIntercession) => new ContentManager.divineIntercessionClass(divineIntercession))
		);
	}

	//#endregion

	//#region Event
	static eventClass = EventClass;

	get _event() {
		return get(this.event);
	}

	get event() {
		return derived(this.homebrew, ($homebrew) =>
			[...this.getHomebrewByType('event', $homebrew), ...this.core.event].map(
				(event) => new ContentManager.eventClass(event)
			)
		);
	}

	//#endregion

	//#region Relic Gift
	static relicGiftClass = RelicGiftClass;

	get _relicGift() {
		return get(this.relicGift);
	}

	get relicGift() {
		return derived(this.homebrew, ($homebrew) =>
			[...this.getHomebrewByType('relicGift', $homebrew), ...this.core.relicGift].map(
				(relicGift) => new ContentManager.relicGiftClass(relicGift)
			)
		);
	}

	//#endregion

	//#region Skill
	static skillClass = SkillClass;

	get _skill() {
		return get(this.skill);
	}

	get skill() {
		return derived(this.homebrew, ($homebrew) =>
			[...this.getHomebrewByType('skill', $homebrew), ...this.core.skill].map(
				(skill) => new ContentManager.skillClass(skill)
			)
		);
	}

	//#endregion
}

const contentManager = new ContentManager();
export default contentManager;
