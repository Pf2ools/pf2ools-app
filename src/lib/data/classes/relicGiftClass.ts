import { type dataTypes } from '$lib/data/contentManager';
import Document from './documentClass';

class RelicGift extends Document<'relicGift'> {
	constructor(relicGift: dataTypes['relicGift']) {
		super(relicGift);
	}

	get title(): string {
		return this.name.primary + (this.name.specifier ? `; ${this.name.specifier}` : '');
	}
}

export default RelicGift;
