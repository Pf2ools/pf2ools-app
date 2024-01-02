import { type dataTypes } from '$lib/data/contentManager';
import Document from './documentClass';

class Event extends Document<'event'> {
	constructor(event: dataTypes['event']) {
		super(event);
	}

	get title(): string {
		return this.name.primary + (this.name.specifier ? `; ${this.name.specifier}` : '');
	}
}

export default Event;
