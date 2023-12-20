import type { dataTypes } from './contentManager';
import contentManager from './contentManager';

class Background {
	private _document: dataTypes['background'];
	public data: dataTypes['background']['data'];
	public name: dataTypes['background']['name'];
	public source: dataTypes['background']['source'];
	public tags: dataTypes['background']['tags'];
	public type: dataTypes['background']['type'];
	constructor(background: dataTypes['background']) {
		this._document = background;
		this.data = background.data;
		this.name = background.name;
		this.source = background.source;
		this.tags = background.tags;
		this.type = background.type;
	}

	get sourceData(): dataTypes['source'] {
		return (contentManager._source.find((src) => src.ID === this.source.ID) ?? {
			ID: 'unknown',
			title: { full: 'Unknown', short: 'UNK' },
		}) as dataTypes['source'];
	}

	get sourceFull(): string {
		return this.sourceData.title.full;
	}

	get sourceShort(): string {
		return this.sourceData.title.short;
	}

	get official(): boolean {
		return this.sourceData.tags?.misc?.Official ?? false;
	}

	get abilityBoosts() {
		const abilities = this?.tags?.abilityBoosts?.abilities;
		return {
			...this?.tags?.abilityBoosts,
			array: abilities
				? Object.keys(abilities).filter((value) => abilities[value as keyof typeof abilities])
				: [],
		};
	}
}
export default Background;
