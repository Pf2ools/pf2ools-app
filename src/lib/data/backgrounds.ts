// Could be optimized by using ?raw and using JSON.parse() instead of importing the JSON file directly, as it generates a javascript object itself.
// However, performance tests on the biggest dataset we have right now (backgrounds) is either within margin of error, or more likely, I don't know what I am doing.
import type { SafeParseError, z } from 'zod';
import { background as backgroundsJSON } from './pf2ools-data/bundles/byDatatype/core/background.json' assert { type: 'json' };
import { background as backgroundSchema } from 'pf2ools-schema';

const validateObj = (obj: object) => {
	const parsed = backgroundSchema.safeParse(obj);

	if (!parsed.success) {
		// @ts-expect-error - This is a hack to get around the fact that the data is not given in the error.
		parsed.data = obj;
	}
	return parsed;
};

function partitionArray<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] {
	const pass: T[] = [];
	const fail: T[] = [];

	for (const item of arr) {
		if (predicate(item)) {
			pass.push(item);
		} else {
			fail.push(item);
		}
	}

	return [pass, fail];
}

type backgroundData = z.infer<typeof backgroundSchema>;

class Backgrounds {
	public data: backgroundData[];
	public errors: SafeParseError<backgroundData>[];
	constructor() {
		[this.data, this.errors] = partitionArray(
			backgroundsJSON.map(validateObj),
			(item) => item.success === true
		).map((arr) => arr.map((item) => (item.success ? item.data : item))) as [
			backgroundData[],
			SafeParseError<backgroundData>[],
		];
	}
}

export default new Backgrounds();