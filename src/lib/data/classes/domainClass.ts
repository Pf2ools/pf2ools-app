import { type dataTypes } from '$lib/data/contentManager';
import Document from './documentClass';

class Domain extends Document<'domain'> {
	constructor(domain: dataTypes['domain']) {
		super(domain);
	}

	get title(): string {
		return this.name.primary + (this.name.specifier ? `; ${this.name.specifier}` : '');
	}
}

export default Domain;
