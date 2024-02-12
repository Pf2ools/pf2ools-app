import { type dataTypes } from '$lib/data/types';
import Document from './documentClass';

class Domain extends Document<'domain'> {
	constructor(domain: dataTypes['domain']) {
		super(domain);
	}
}

export default Domain;
