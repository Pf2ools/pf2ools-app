import { type dataTypes } from '$lib/data/contentManager';
import Document from './documentClass';

class Condition extends Document<'condition'> {
	constructor(condition: dataTypes['condition']) {
		super(condition);
	}
}

export default Condition;
