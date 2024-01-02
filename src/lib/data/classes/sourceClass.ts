import { type dataTypes } from '$lib/data/contentManager';

class Source {
	private _document: dataTypes['source'];
	public data: dataTypes['source']['data'];
	public ID: dataTypes['source']['ID'];
	public name: dataTypes['source']['title'];
	public tags: dataTypes['source']['tags'];
	constructor(source: dataTypes['source']) {
		this._document = source;
		this.data = source.data;
		this.ID = source.ID;
		this.name = source.title;
		this.tags = source.tags;
	}

	get title() {
		return this.name.full;
	}

	get hash(): string {
		return encodeURI(this.title + '_' + this.ID);
	}

	get official(): boolean {
		return this.tags?.misc?.Official || this.data.publisher?.includes('Paizo') || false;
	}

	get secondaryContent(): boolean {
		return Object.keys(this.tags?.publicationType ?? {}).length > 0 && this.official;
	}
}

export default Source;
