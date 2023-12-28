import contentManager, { type dataTypes } from '$lib/data/contentManager';

class DivineIntercession {
	private _document: dataTypes['divineIntercession'];
	public data: dataTypes['divineIntercession']['data'];
	public type: dataTypes['divineIntercession']['type'];
	public name: dataTypes['divineIntercession']['name'];
	public source: dataTypes['divineIntercession']['source'];
	public tags: dataTypes['divineIntercession']['tags'];
	constructor(divineIntercession: dataTypes['divineIntercession']) {
		this._document = divineIntercession;
		this.data = divineIntercession.data;
		this.type = divineIntercession.type;
		this.name = divineIntercession.name;
		this.source = divineIntercession.source;
		this.tags = divineIntercession.tags;
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

export default DivineIntercession;
