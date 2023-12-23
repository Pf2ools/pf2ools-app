import { /*contentManager,*/ type dataTypes } from '$lib';

class RelicGift {
	private _document: dataTypes['relicGift'];
	public data: dataTypes['relicGift']['data'];
	public type: dataTypes['relicGift']['type'];
	public name: dataTypes['relicGift']['name'];
	public source: dataTypes['relicGift']['source'];
	public tags: dataTypes['relicGift']['tags'];
	constructor(relicGift: dataTypes['relicGift']) {
		this._document = relicGift;
		this.data = relicGift.data;
		this.type = relicGift.type;
		this.name = relicGift.name;
		this.source = relicGift.source;
		this.tags = relicGift.tags;
	}

	get title(): string {
		return this.name.primary + (this.name.specifier ? `; ${this.name.specifier}` : '');
	}
}

export default RelicGift;
