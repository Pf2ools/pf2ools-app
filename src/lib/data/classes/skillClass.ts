import { type dataTypes } from '$lib/data/contentManager';
import Document from './documentClass';

class Skill extends Document<'skill'> {
	constructor(skill: dataTypes['skill']) {
		super(skill);
	}

	get title(): string {
		return this.name.primary + (this.name.specifier ? `; ${this.name.specifier}` : '');
	}
}

export default Skill;
