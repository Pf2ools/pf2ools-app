import type { dataTypes } from '$lib/data/types';
import Document from './documentClass';

class DivineIntercession extends Document<'divineIntercession'> {
	constructor(divineIntercession: dataTypes['divineIntercession']) {
		super(divineIntercession);
	}
}

export default DivineIntercession;
