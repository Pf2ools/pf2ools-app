import type { Handle } from '@sveltejs/kit';
import { toTitleCase } from '$lib/utils';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('Hook:', event.url.pathname);

	const response = await resolve(event, {
		// TODO: Replace the title with the actual page title rather than basing it off the URL.
		transformPageChunk: ({ html }) =>
			event.url.pathname === '/'
				? html
				: html.replace(
						'<meta property="og:title" content="pf2ools" />',
						`<meta property="og:title" content="${toTitleCase(event.url.pathname.replace('/', ''))} - pf2ools" />`
					),
	});

	/*
		TODO: use the 'reroute' hook to redirect shareable pages to a hash-based URL.
		Example: backgrounds/Academy%20Dropout_SoM => backgrounds#Academy%20Dropout_SoM
		Additionally, add embeds.
	*/

	return response;
};
