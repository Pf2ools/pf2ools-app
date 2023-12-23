import { /*contentManager,*/ type dataTypes } from '$lib';

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
}

export default Event;
