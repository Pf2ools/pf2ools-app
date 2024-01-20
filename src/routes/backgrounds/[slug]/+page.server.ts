import type { EntryGenerator, PageServerLoad } from './$types';
import { CF_PAGES, SEO } from '$env/static/private';

export const load: PageServerLoad = ({ url }) => {
	const hash = url.pathname.split('/').slice(2).join('/');
	return {
		hash,
		goto: url.pathname.split('/').slice(0, 2).join('/') + '#' + hash,
	};
};

export const entries: EntryGenerator = async () => {
	return [
		{
			slug: "Abadar's Avenger_FRP0",
		},
	];
};

export const prerender = CF_PAGES || SEO ? 'auto' : false;
export const ssr = true;
