import contentManager, { type dataTypes } from '$lib/data/contentManager';

class Domain {
	private _document: dataTypes['domain'];
	public data: dataTypes['domain']['data'];
	public type: dataTypes['domain']['type'];
	public name: dataTypes['domain']['name'];
	public source: dataTypes['domain']['source'];
	public tags: dataTypes['domain']['tags'];
	constructor(domain: dataTypes['domain']) {
		this._document = domain;
		this.data = domain.data;
		this.type = domain.type;
		this.name = domain.name;
		this.source = domain.source;
		this.tags = domain.tags;
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

export default Domain;
