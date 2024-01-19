import type { Handle } from '@sveltejs/kit';
import { toTitleCase } from '$lib/utils';

export const handle: Handle = ({ event, resolve }) => {
	console.log('Hook:', event.url.pathname);

	if (event.url.pathname !== '/') {
		const response = resolve(event, {
			// TODO: Replace the title with the actual page title rather than basing it off the URL.
			transformPageChunk: ({ html }) =>
				html.replace(
					'<meta property="og:title" content="pf2ools" />',
					`<meta property="og:title" content="${toTitleCase(event.url.pathname.replace('/', ''))} - pf2ools" />`
				),
		});

		return response;
	}

	return resolve(event);
};

/*
	TODO: use the 'reroute' hook to redirect shareable pages to a hash-based URL.
	Example: backgrounds/Academy%20Dropout_SoM => backgrounds#Academy%20Dropout_SoM
	Additionally, add embeds.
*/
