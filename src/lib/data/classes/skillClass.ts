import { type dataTypes } from '$lib/data/types';
import Document from './documentClass';

class Skill extends Document<'skill'> {
	constructor(skill: dataTypes['skill']) {
		super(skill);
	}
}

export default Skill;
