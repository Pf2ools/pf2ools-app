import { type RequestHandler } from '@sveltejs/kit';
import { IMAGES_RENDER, SEO } from '$env/static/private';
import contentManager from '$lib/data/contentManager';
import nodeHtmlToImage from 'node-html-to-image';
import type { EntryGenerator } from './$types';

export const prerender = SEO && IMAGES_RENDER ? 'auto' : false;

export const entries: EntryGenerator = async () => {
	return contentManager._background.map((bg) => ({
		slug: bg.slug,
	}));
};

export const GET: RequestHandler = async ({ params: { slug } }) => {
	if (!slug || slug === '') {
		return new Response('Not Found', { status: 404 });
	}

	const bg = contentManager._background.find((bg) => bg.slug === slug) ?? null;

	if (!bg) {
		return new Response('Not Found', { status: 404 });
	}

	// Style it up a little so you can see what's happening for likely half an hour
	console.log(`Rendering image for ${bg.label}...`);

	const image = (await nodeHtmlToImage({
		html: `<html>
			<head>
				<style>
				body {
					width: 800;
					height: 600;
				}
				</style>
			</head>
			<body>
				<h1>${bg.label}</h1><br>${bg.data.entries.join('<br>')}
			</body>
		</html>`,
	})) as Buffer;

	return new Response(image, {
		headers: {
			'Content-Type': 'image/png',
		},
	});
};
