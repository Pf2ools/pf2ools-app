import type { Handle } from '@sveltejs/kit';
import { toTitleCase } from '$lib/utils';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('Hook:', event.url.pathname);

	const response = await resolve(event, {
		// TODO: Replace the title with the actual page title rather than basing it off the URL.
		transformPageChunk: ({ html }) =>
			html.replace(
				'<meta property="og:title" content="pf2ools" />',
				`<meta property="og:title" content="${toTitleCase(event.url.pathname.replace('/', ''))} - pf2ools" />`
			),
	});

	return response;
};
