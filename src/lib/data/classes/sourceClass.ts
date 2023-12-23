import { /*contentManager,*/ type dataTypes } from '$lib';

class Source {
	private _document: dataTypes['source'];
	public data: dataTypes['source']['data'];
	public ID: dataTypes['source']['ID'];
	public title: dataTypes['source']['title'];
	public tags: dataTypes['source']['tags'];
	constructor(source: dataTypes['source']) {
		this._document = source;
		this.data = source.data;
		this.ID = source.ID;
		this.title = source.title;
		this.tags = source.tags;
	}
}

export default Source;
