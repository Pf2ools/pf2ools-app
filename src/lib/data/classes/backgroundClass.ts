import contentManager, { type dataTypes } from '$lib/data/contentManager';

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

	get title(): string {
		return this.name.primary + (this.name.specifier ? `; ${this.name.specifier}` : '');
	}

	get sourceData() {
		return (
			contentManager._source.find((src) => src.ID === this.source.ID) ?? {
				ID: 'unknown',
				title: { full: 'Unknown', short: 'UNK' },
				official: false,
				secondaryContent: false,
			}
		);
	}

	get sourceFull(): string {
		return this.sourceData.title.full;
	}

	get sourceShort(): string {
		return this.sourceData.title.short;
	}

	get official(): boolean {
		return this.sourceData.official ?? false;
	}

	get secondaryContent(): boolean {
		return this.sourceData.secondaryContent ?? false;
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
