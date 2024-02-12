import { type dataTypes } from '$lib/data/types';
import Document from './documentClass';

class RelicGift extends Document<'relicGift'> {
	constructor(relicGift: dataTypes['relicGift']) {
		super(relicGift);
	}
}

export default RelicGift;
