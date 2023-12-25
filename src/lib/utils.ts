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
