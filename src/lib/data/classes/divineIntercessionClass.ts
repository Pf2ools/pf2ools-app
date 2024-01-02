import { type dataTypes } from '$lib/data/contentManager';
import Document from './documentClass';

class DivineIntercession extends Document<'divineIntercession'> {
	constructor(divineIntercession: dataTypes['divineIntercession']) {
		super(divineIntercession);
	}

	get title(): string {
		return this.name.primary + (this.name.specifier ? `; ${this.name.specifier}` : '');
	}
}

export default DivineIntercession;
