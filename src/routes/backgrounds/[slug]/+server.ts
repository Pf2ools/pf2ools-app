import { type RequestHandler } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import { CF_PAGES, SEO } from '$env/static/private';
import { base } from '$app/paths';
import { dev } from '$app/environment';

export const GET: RequestHandler = ({ params: { slug } }) => {
	// TODO: respond with a HTML page of wanted metadata and a JS redirect to the previous page with hash
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
				<meta property="og:url" content="${base}/backgrounds#${slug}" />

				<!-- Modify This -->

				<title>${slug} - pf2ools</title>
				<meta property="og:title" content="${slug} - pf2ools" />

				<meta name="description"  content="${slug} Description" />
				<meta property="og:description" content="${slug} Description" />

				<meta property="og:image" content="${base}/icons/android-chrome-512x512.png" />
			</head>
			<body style="background: black; color: gray">
				You are getting redirected to "${base}/backgrounds#${slug}".
			</body>
			<script>
				${dev ? '' : `window.location.replace("${base}/backgrounds#" + "${slug}");`}
			</script>
		</html>`,
		{
			headers: {
				'content-type': 'text/html; charset=utf-8',
				'cache-control': 's-maxage=1, stale-while-revalidate',
			},
		}
	);
};

export const entries: EntryGenerator = async () => {
	return [
		{
			slug: "Abadar's Avenger_FRP0",
		},
	].map((obj) => {
		obj.slug = obj.slug + '.html';
		return obj;
	});
};

export const prerender = CF_PAGES || SEO ? 'auto' : false;
