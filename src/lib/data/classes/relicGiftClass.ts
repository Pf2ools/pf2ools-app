import contentManager, { type dataTypes } from '$lib/data/contentManager';

class RelicGift {
	private _document: dataTypes['relicGift'];
	public data: dataTypes['relicGift']['data'];
	public type: dataTypes['relicGift']['type'];
	public name: dataTypes['relicGift']['name'];
	public source: dataTypes['relicGift']['source'];
	public tags: dataTypes['relicGift']['tags'];
	constructor(relicGift: dataTypes['relicGift']) {
		this._document = relicGift;
		this.data = relicGift.data;
		this.type = relicGift.type;
		this.name = relicGift.name;
		this.source = relicGift.source;
		this.tags = relicGift.tags;
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
}

export default RelicGift;
