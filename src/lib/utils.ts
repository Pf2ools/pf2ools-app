export function objBoolsToArray(obj: { [key: string]: boolean }) {
	return Object.keys(obj).filter((key) => obj[key]);
}

export function getTypedKeys<T extends object>(obj: T): Array<keyof T> {
	return Object.keys(obj) as Array<keyof typeof obj>;
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

export const dateConvert = (date: number | string) =>
	new Date(isNaN(Number(date)) ? date : Number(date)).getTime();

export const toTitleCase = (input: string) => {
	let str = input.replace(
		/([^\W_]+[^\s-/]*) */g,
		(m0) => m0.charAt(0).toUpperCase() + m0.substr(1).toLowerCase()
	);
	const TITLE_LOWER_WORDS_RE = StrUtil.TITLE_LOWER_WORDS.map(
		(it) => new RegExp(`\\s${it}\\s`, 'gi')
	);
	const TITLE_UPPER_WORDS_RE = StrUtil.TITLE_UPPER_WORDS.map(
		(it) => new RegExp(`\\b${it}\\b`, 'g')
	);
	const len = StrUtil.TITLE_LOWER_WORDS.length;
	for (let i = 0; i < len; i++) {
		str = str.replace(TITLE_LOWER_WORDS_RE[i], (txt) => txt.toLowerCase());
	}
	const len1 = StrUtil.TITLE_UPPER_WORDS.length;
	for (let i = 0; i < len1; i++) {
		str = str.replace(TITLE_UPPER_WORDS_RE[i], StrUtil.TITLE_UPPER_WORDS[i].toUpperCase());
	}
	return str;
};

const StrUtil = {
	COMMAS_NOT_IN_PARENTHESES_REGEX: /,\s?(?![^(]*\))/g,
	COMMA_SPACE_NOT_IN_PARENTHESES_REGEX: /, (?![^(]*\))/g,
	TITLE_LOWER_WORDS: [
		'a',
		'an',
		'the',
		'and',
		'but',
		'or',
		'for',
		'nor',
		'as',
		'at',
		'by',
		'for',
		'from',
		'in',
		'into',
		'near',
		'of',
		'on',
		'onto',
		'to',
		'with',
		'over',
	],
	TITLE_UPPER_WORDS: ['Id', 'Tv', 'Dm', 'Ok'],
};
