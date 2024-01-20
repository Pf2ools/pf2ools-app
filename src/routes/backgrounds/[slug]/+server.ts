import { type RequestHandler } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import { CF_PAGES, SEO } from '$env/static/private';
import { base } from '$app/paths';

export const GET: RequestHandler = ({ params: { slug } }) => {
	console.log(slug);

	// TODO: respond with a HTML page of wanted metadata and a JS redirect to the previous page with hash
	return new Response(
		`<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<title>${slug} - pf2ools</title>
				<meta name="description"  content="${slug}" />
				<meta property="og:title" content="${slug} - pf2ools" />
				<meta property="og:description" content="${slug}" />
			</head>
			<body style="background: black; color: gray">
				You are getting redirected to "${base}/backgrounds#${slug}".
			</body>
			<script>
				window.location.replace("${base}/backgrounds#" + "${slug}");
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
			slug: "Abadar's Avenger_FRP0.html",
		},
	];
};

export const prerender = CF_PAGES || SEO ? 'auto' : false;
