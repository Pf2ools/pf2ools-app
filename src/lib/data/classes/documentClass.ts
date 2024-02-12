import { sources } from '../sources';
import type { dataTypes } from '../types';

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

	get label(): string {
		return this.name.primary + (this.name.specifier ? `; ${this.name.specifier}` : '');
	}

	get slug(): string {
		return this.label + '_' + this.source.ID;
	}

	get hash(): string {
		return encodeURI(this.slug);
	}

	get sourceData() {
		return sources.findID(this.source.ID);
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

	get homebrew(): boolean {
		return !this.official && !this.secondaryContent;
	}
}

export default Document;
