// Could be optimized by using ?raw and using JSON.parse() instead of importing the JSON file directly, as it generates a javascript object itself.
// However, performance tests on the biggest dataset we have right now (backgrounds) is either within margin of error, or more likely, I don't know what I am doing.
import type { z } from 'zod';
import { background as backgroundsJSON } from './pf2ools-data/bundles/byDatatype/core/background.json' assert { type: 'json' };
import { background } from 'pf2ools-schema';

const validateObj = (obj: object) => {
	const parsed = background.safeParse(obj);

	if (parsed.success === false) {
		// @ts-expect-error - This is a hack to get around the fact that the data is not given in the error.
		parsed.data = obj;
	}
	return parsed;
};

type Background = z.infer<typeof background>;

class Backgrounds {
	_rawData = backgroundsJSON.map((bg) => validateObj(bg));
	data = this._rawData.filter((bg) => bg.success).map((bg) => bg.data) as Background[];
	errors = this._rawData.filter((bg) => !bg.success);
}

export default new Backgrounds();
