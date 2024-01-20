import type { RequestHandler } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import env from '$env/static/public';

export const GET: RequestHandler = ({ params: { slug } }) => {
	console.log(slug);

	return new Response(
		`We're Sorry, You Have Reached a PF2E Slug that has not yet been implemented: ${slug}. Please try again later.`
	);
};

export const entries: EntryGenerator = async () => {
	return [
		{
			slug: "Abadar's Avenger_FRP0",
		},
	];
};

export const prerender = !!process.env.CF_PAGES ?? !!env.PUBLIC_SEO ?? false;
