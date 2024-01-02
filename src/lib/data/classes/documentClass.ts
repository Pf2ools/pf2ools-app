import type { dataTypes } from '../contentManager';
import contentManager from '../contentManager';

type dataTypesWithoutSource = keyof Omit<dataTypes, 'source'>;

class Document<T extends dataTypesWithoutSource> {
	private _document: dataTypes[T];
	public type: dataTypes[T]['type'];
	public data: dataTypes[T]['data'];
	public name: dataTypes[T]['name'];
	public source: dataTypes[T]['source'];
	public tags: dataTypes[T]['tags'];
	constructor(document: dataTypes[T]) {
		this._document = document;
		this.data = document.data;
		this.name = document.name;
		this.source = document.source;
		this.tags = document.tags;
		this.type = document.type;
	}

	get title(): string {
		return this.name.primary + (this.name.specifier ? `; ${this.name.specifier}` : '');
	}

	get sourceData() {
		return (
			contentManager._source.find((src) => src.ID === this.source.ID) ?? {
				ID: 'unknown',
				name: { full: 'Unknown', short: 'UNK' },
				official: false,
				secondaryContent: false,
			}
		);
	}

	get sourceFull(): string {
		return this.sourceData.name.full;
	}

	get sourceShort(): string {
		return this.sourceData.name.short;
	}

	get official(): boolean {
		return this.sourceData.official ?? false;
	}

	get secondaryContent(): boolean {
		return this.sourceData.secondaryContent ?? false;
	}
}

export default Document;
