import { type RequestHandler } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import { SEO } from '$env/static/private';
import { base } from '$app/paths';
import { dev } from '$app/environment';
import { backgrounds } from '$lib/data/backgrounds';

export const prerender = Boolean(Number(SEO));

console.log('========= Prerender SEO: ' + prerender + ' =========');

export const entries: EntryGenerator = async () => {
	return backgrounds.contents.map((bg) => ({
		slug: bg.slug,
	}));
};

export const GET: RequestHandler = ({ params: { slug } }) => {
	if (!slug || slug === '') {
		// Redirect straight to the backgrounds page
		return new Response('', {
			status: 302,
			headers: {
				Location: `${base}/backgrounds`,
			},
		});
	}

	const bg = backgrounds.contents.find((bg) => bg.slug === slug) ?? null;

	if (!bg) {
		return new Response('Not Found', { status: 404 });
	}

	console.log('Generating SEO page for ' + slug);

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

					<meta property="og:image" content="${base}/backgrounds/${slug}.png" />
					<meta name="twitter:card" content="summary_large_image">

					<meta property="og:url" content="${base}/backgrounds#${slug}" />
				</head>
				<body style="background: black; color: gray">
					You are getting redirected to <a href="${base}/backgrounds#${slug}">"${base}/backgrounds#${slug}"</a>.
				</body>
				<script>
					${dev ? '' : `window.location.replace("${base}/backgrounds#" + "${slug}");`}
				</script>
			</html>`,
		{
			headers: {
				Location: `${base}/backgrounds#${slug}`,
				'content-type': 'text/html; charset=utf-8',
				'cache-control': 'public, s-maxage=604800,stale-while-revalidate=86400',
			},
		}
	);
};
