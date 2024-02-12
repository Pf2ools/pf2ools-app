import type { z } from 'zod';
import type { sources } from '../sources';

type sourceData = z.infer<(typeof sources)['schema']>;

class Source {
	private _document: sourceData;
	public data: sourceData['data'];
	public ID: sourceData['ID'];
	public title: sourceData['title'];
	public tags: sourceData['tags'];
	constructor(source: sourceData) {
		this._document = source;
		this.data = source.data;
		this.ID = source.ID;
		this.title = source.title;
		this.tags = source.tags;
	}

	get label() {
		return this.title.full;
	}

	get hash(): string {
		return encodeURI(this.label + '_' + this.ID);
	}

	get official(): boolean {
		return this.tags?.misc?.Official || this.data.publisher?.includes('Paizo') || false;
	}

	get secondaryContent(): boolean {
		return Object.keys(this.tags?.publicationType ?? {}).length > 0 && this.official;
	}

	get homebrew(): boolean {
		return !this.official && !this.secondaryContent;
	}
}

export default Source;
