import contentManager, { type dataTypes } from '$lib/data/contentManager';

class Event {
	private _document: dataTypes['event'];
	public data: dataTypes['event']['data'];
	public type: dataTypes['event']['type'];
	public name: dataTypes['event']['name'];
	public source: dataTypes['event']['source'];
	public tags: dataTypes['event']['tags'];
	constructor(event: dataTypes['event']) {
		this._document = event;
		this.data = event.data;
		this.type = event.type;
		this.name = event.name;
		this.source = event.source;
		this.tags = event.tags;
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

export default Event;
