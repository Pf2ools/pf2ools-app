export function objBoolsToArray(obj: { [key: string]: boolean }) {
	return Object.keys(obj).filter((key) => obj[key]);
}

export function joinConjunct(
	arr: string[],
	conjunct: 'conjunction' | 'disjunction' = 'conjunction'
) {
	const formatter = new Intl.ListFormat('en', {
		style: 'long',
		type: conjunct,
	});
	return formatter.format(arr);
}

export function dedupe<T extends object>(
	arr: T[],
	keyProp: keyof T,
	sort?: (a: T, b: T) => number
) {
	return [
		...(sort ? arr.sort(sort) : arr)
			.reduce((acc, obj) => (acc.set(obj[keyProp], obj), acc), new Map())
			.values(),
	];
}

export const dateConvert = (date: string) => new Date(date).getTime();
