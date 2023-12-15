export function objBoolsToArray(obj: { [key: string]: boolean }) {
	return Object.keys(obj).filter((key) => obj[key]);
}
