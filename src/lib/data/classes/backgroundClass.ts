import { type dataTypes } from '$lib/data/contentManager';
import Document from './documentClass';

class Background extends Document<'background'> {
	constructor(background: dataTypes['background']) {
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
