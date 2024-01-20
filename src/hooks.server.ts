import { toTitleCase } from '$lib/utils';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) => {
	const url = event.url.pathname;

	if (url !== '/') {
		const response = resolve(event, {
			// TODO: Replace the title with the actual page title rather than basing it off the URL.
			transformPageChunk: ({ html }) =>
				html.replace(
					'<meta property="og:title" content="pf2ools" />',
					`<meta property="og:title" content="${toTitleCase(url.replace('/', ''))} - pf2ools" />`
				),
		});

		return response;
	}

	return resolve(event);
};
