import { type RequestHandler } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import { SEO, IMAGES_RENDER } from '$env/static/private';
import contentManager from '$lib/data/contentManager';
import { ImageResponse } from '@cloudflare/pages-plugin-vercel-og/api';
import { html as toReactNode } from 'satori-html';

export const prerender = Boolean(Number(SEO) && Number(IMAGES_RENDER));

console.log('========= Prerender Embed Images: ' + prerender + ' =========');

export const entries: EntryGenerator = async () => {
	return contentManager._background.map((bg) => ({
		slug: bg.slug,
	}));
};

export const GET: RequestHandler = ({ params: { slug } }) => {
	const FoF = new Response('Not Found', { status: 404 });
	if (!slug || slug === '') return FoF;

	const bg = contentManager._background.find((bg) => bg.slug === slug) ?? null;

	if (!bg) return FoF;

	console.log('Generating embed image for ' + slug);

	// https://github.com/geoffrich/sveltekit-satori/blob/main/src/lib/renderImage.js
	return new ImageResponse(
		toReactNode(
			`<body><h2 style="font-size: 36px">${bg.name.primary}</h2>${bg.data.entries.join('<p/>')}</body>
			<style>body { padding: 12px; background-color: #ffffff; width: 100%; height: 100%; display: flex; flex-direction: column; }</style>`
		),
		{
			width: 800,
			height: 600,
		}
	) as Response;
};
