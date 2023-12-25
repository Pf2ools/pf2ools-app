import { type dataTypes } from '$lib/data/contentManager';

class Skill {
	private _document: dataTypes['skill'];
	public data: dataTypes['skill']['data'];
	public type: dataTypes['skill']['type'];
	public name: dataTypes['skill']['name'];
	public source: dataTypes['skill']['source'];
	public tags: dataTypes['skill']['tags'];
	constructor(skill: dataTypes['skill']) {
		this._document = skill;
		this.data = skill.data;
		this.type = skill.type;
		this.name = skill.name;
		this.source = skill.source;
		this.tags = skill.tags;
	}

	get title(): string {
		return this.name.primary + (this.name.specifier ? `; ${this.name.specifier}` : '');
	}
}

export default Skill;
