import contentManager, { type dataTypes } from '$lib/data/contentManager';

class Condition {
	private _document: dataTypes['condition'];
	public data: dataTypes['condition']['data'];
	public type: dataTypes['condition']['type'];
	public name: dataTypes['condition']['name'];
	public source: dataTypes['condition']['source'];
	public tags: dataTypes['condition']['tags'];
	constructor(condition: dataTypes['condition']) {
		this._document = condition;
		this.data = condition.data;
		this.type = condition.type;
		this.name = condition.name;
		this.source = condition.source;
		this.tags = condition.tags;
	}

	get title(): string {
		return this.name.primary + (this.name.specifier ? `; ${this.name.specifier}` : '');
	}
}

export default Condition;
