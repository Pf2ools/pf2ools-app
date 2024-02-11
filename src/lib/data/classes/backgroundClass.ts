import type { z } from 'zod';
import type { backgrounds } from '../backgrounds';
import Document from './documentClass';

class Background extends Document<'background'> {
	constructor(background: z.infer<(typeof backgrounds)['schema']>) {
		super(background);
	}

	get abilityBoosts() {
		const abilities = this?.tags?.abilityBoosts?.abilities;
		return {
			...this?.tags?.abilityBoosts,
			array: abilities
				? Object.keys(abilities).filter((value) => abilities[value as keyof typeof abilities])
				: [],
		};
	}
}

export default Background;
