import type { RequestHandler } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';

export const GET: RequestHandler = ({ params: { slug } }) => {
	console.log(slug);

	return new Response(
		`Go no further, wretched intruder. You have attempted entry into the hitherto unbuilt sanctum, named by decree "${slug}". Your fortune has thus turned. Exeunt, and reconsider your actions in the morrow.`
	);
};

export const entries: EntryGenerator = async () => {
	return [
		{
			slug: "Abadar's Avenger_FRP0",
		},
	];
};

// Make this configurable by env later
export const prerender = true;
