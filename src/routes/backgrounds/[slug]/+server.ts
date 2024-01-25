import { type RequestHandler } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import { CF_PAGES, SEO } from '$env/static/private';
import { base } from '$app/paths';
import { dev } from '$app/environment';
import contentManager from '$lib/data/contentManager';

export const prerender = CF_PAGES || SEO ? 'auto' : false;

export const entries: EntryGenerator = async () => {
	return contentManager._background.map((bg) => ({
		slug: bg.slug + '.html',
	}));
};

// Image Stuff
import satori from 'satori';
import { html as convertToReact } from 'satori-html';
import FilterChip from '$lib/components/ItemList/FilterChip.svelte';
import { twi } from 'tw-to-css';
import { readFile } from 'fs/promises';
// TODO: Turn SVG into PNG https://github.com/yisibl/resvg-js
// End Image Stuff

export const GET: RequestHandler = async ({ params: { slug } }) => {
	if (!slug) {
		// Redirect straight to the backgrounds page
		return new Response('', {
			status: 302,
			headers: {
				Location: `${base}/backgrounds`,
			},
		});
	}

	slug = slug.replace('.html', '');

	const bg = contentManager._background.find((bg) => bg.slug === slug) ?? null;

	if (!bg) {
		return new Response('Not Found', { status: 404 });
	}

	// Image Stuff
	const fontData = await readFile(
		base + `${dev ? 'static/' : ''}fonts/Quicksand/Quicksand-Regular.ttf`
	);
	const resultHtml = FilterChip.render({ label: 'It Works!' }).html.replace(
		/class="(.+?)"/g,
		(m, p1) => `style='${twi(p1)};background-color:white'`
	);
	const markup = convertToReact(resultHtml);
	const svg = await satori(markup, {
		height: 1080,
		width: 1080,
		fonts: [
			{
				name: 'Quicksand',
				data: await fontData,
				style: 'normal',
			},
		],
	});
	// End Image Stuff

	return new Response(
		`<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="utf-8" />
					<link rel="icon" href="${base}/icons/icon.ico" />
					<link rel="icon" type="image/png" href="${base}/icons/32x32.png" sizes="16x16" />
					<link rel="icon" type="image/png" href="${base}/icons/128x128.png" sizes="128x128" />
					<link rel="icon" type="image/png" href="${base}/icons/128x128@2x.png" sizes="256x256" />
					<link rel="apple-touch-icon" sizes="180x180" href="${base}/icons/apple-touch-icon.png">
					<link rel="mask-icon" href="${base}/icons/safari-pinned-tab.svg" color="#6f1d17">
					<link rel="manifest" href="${base}/site.webmanifest">
					<meta name="msapplication-TileColor" content="#6f1d17">
					<meta name="theme-color" content="#6f1d17">
					<meta name="twitter:creator" content="@ThatVauxs" />
					<meta name="twitter:site" content="@Pf2eTools" />

					<!-- Modify Below -->
					${dev ? '' : `<meta http-equiv="refresh" content="0; url=${base}/backgrounds#${slug}">`}

					<title>${slug} - pf2ools</title>
					<meta property="og:title" content="${bg.label} - pf2ools" />

					<meta name="description" content="${bg.data.entries.join(' ')}" />
					<meta property="og:description" content="${bg.data.entries.join(' ')}" />

					<!-- <meta property="og:image" content="${base}/icons/android-chrome-512x512.png" /> -->
					<!-- <meta name="twitter:card" content="summary_large_image"> -->

					<meta property="og:url" content="${base}/backgrounds#${slug}" />
				</head>
				<body style="background: black; color: gray">
					You are getting redirected to <a href="${base}/backgrounds#${slug}">"${base}/backgrounds#${slug}"</a>.
					${resultHtml}
					${svg}
				</body>
				<script>
					${dev ? '' : `window.location.replace("${base}/backgrounds#" + "${slug}");`}
				</script>
			</html>`,
		{
			headers: {
				Location: `${base}/backgrounds#${slug}`,
				'content-type': 'text/html; charset=utf-8',
				'cache-control': 's-maxage=1, stale-while-revalidate',
			},
		}
	);
};
