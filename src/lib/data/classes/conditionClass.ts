import { type dataTypes } from '$lib/data/contentManager';
import Document from './documentClass';

class Condition extends Document<'condition'> {
	constructor(condition: dataTypes['condition']) {
		super(condition);
	}

	get title(): string {
		return this.name.primary + (this.name.specifier ? `; ${this.name.specifier}` : '');
	}
}

export default Condition;
