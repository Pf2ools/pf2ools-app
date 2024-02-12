import type { dataTypes } from '$lib/data/types';
import Document from './documentClass';

class Condition extends Document<'condition'> {
	constructor(condition: dataTypes['condition']) {
		super(condition);
	}
}

export default Condition;
