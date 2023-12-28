import { homebrewSources as homebrewSourcesSchema } from 'pf2ools-schema';
import type { z } from 'zod';

export type homebrewSource = z.infer<typeof homebrewSourcesSchema>[number];

class HomebrewSource {
	private _document: homebrewSource;
	public path: homebrewSource['path'];
	public released: homebrewSource['released'];
	public added: homebrewSource['added'];
	public modified: homebrewSource['modified'];
	public URL: homebrewSource['URL'];
	public ID: homebrewSource['ID'];
	public fullTitle: homebrewSource['fullTitle'];
	public publisherAuthors: homebrewSource['publisherAuthors'];
	public datatypes: homebrewSource['datatypes'];
	public tags: homebrewSource['tags'];
	public sourceURL: homebrewSource['sourceURL'];

	constructor(homebrewSource: homebrewSource) {
		this._document = homebrewSource;
		this.path = homebrewSource.path;
		this.released = homebrewSource.released;
		this.added = homebrewSource.added;
		this.modified = homebrewSource.modified;
		this.URL = homebrewSource.URL;
		this.ID = homebrewSource.ID;
		this.fullTitle = homebrewSource.fullTitle;
		this.publisherAuthors = homebrewSource.publisherAuthors;
		this.datatypes = homebrewSource.datatypes;
		this.tags = homebrewSource.tags;
		this.sourceURL = homebrewSource.sourceURL;
	}

	get title(): string {
		return this.fullTitle;
	}

	get official(): boolean {
		return false;
	}
}

export default HomebrewSource;
