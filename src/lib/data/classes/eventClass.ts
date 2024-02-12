import { type dataTypes } from '$lib/data/types';
import Document from './documentClass';

class Event extends Document<'event'> {
	constructor(event: dataTypes['event']) {
		super(event);
	}
}

export default Event;
