import { type dataTypes } from '$lib/data/contentManager';

class HomebrewSource {
	private _document: dataTypes['homebrewSource'];
	public path: dataTypes['homebrewSource']['path'];
	public released: dataTypes['homebrewSource']['released'];
	public added: dataTypes['homebrewSource']['added'];
	public modified: dataTypes['homebrewSource']['modified'];
	public fullTitle: dataTypes['homebrewSource']['fullTitle'];
	public publisherAuthors: dataTypes['homebrewSource']['publisherAuthors'];
	public indexOfDatatypes: dataTypes['homebrewSource']['indexOfDatatypes'];
	public tags: dataTypes['homebrewSource']['tags'];
	public sourceUrl: dataTypes['homebrewSource']['sourceUrl'];
	constructor(homebrewSource: dataTypes['homebrewSource']) {
		this._document = homebrewSource;
		this.path = homebrewSource.path;
		this.released = homebrewSource.released;
		this.added = homebrewSource.added;
		this.modified = homebrewSource.modified;
		this.fullTitle = homebrewSource.fullTitle;
		this.publisherAuthors = homebrewSource.publisherAuthors;
		this.indexOfDatatypes = homebrewSource.indexOfDatatypes;
		this.tags = homebrewSource.tags;
		this.sourceUrl = homebrewSource.sourceUrl;
	}

	get title() {
		return this.fullTitle;
	}
}

export default HomebrewSource;
