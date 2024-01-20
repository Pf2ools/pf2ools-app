import { type RequestHandler } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import { CF_PAGES, SEO } from '$env/static/private';
import { base } from '$app/paths';

export const GET: RequestHandler = ({ params: { slug } }) => {
	// TODO: respond with a HTML page of wanted metadata and a JS redirect to the previous page with hash
	return new Response(
		`<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<link rel="manifest" href="./site.webmanifest">
				<meta name="msapplication-TileColor" content="#6f1d17">
				<meta name="theme-color" content="#6f1d17">
				<meta name="twitter:creator" content="@ThatVauxs" />
				<meta name="twitter:site" content="@Pf2eTools" />
				<meta property="og:url" content="${base}/backgrounds#${slug}" />

				<!-- Modify This -->
				<title>${slug} - pf2ools</title>
				<meta name="description"  content="${slug}" />
				<meta property="og:title" content="${slug} - pf2ools" />
				<meta property="og:description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis enim faucibus, facilisis turpis sit amet, placerat enim. Sed quis sagittis sapien. Phasellus sed commodo tortor. Quisque maximus nec orci at mollis. Mauris mollis erat non hendrerit congue. Pellentesque pellentesque, turpis id interdum efficitur, risus felis sodales sapien, consectetur feugiat tellus est vel tortor. Suspendisse potenti. Curabitur quam risus, pellentesque a justo facilisis, maximus auctor dolor. Morbi nulla lectus, gravida sed dictum quis, rhoncus nec odio. Sed condimentum lacus diam, id porta enim tristique quis. Donec tempus auctor blandit. Maecenas vitae hendrerit ipsum. Quisque a diam nec augue sodales efficitur. Sed a sem a arcu varius venenatis. Phasellus imperdiet turpis sed nisl tempus tristique. Fusce posuere at dui in iaculis. Mauris lectus nisi, interdum id feugiat id, sodales in sapien. Nunc tortor diam, porta at purus imperdiet, consectetur dictum arcu. Quisque rhoncus suscipit malesuada. Aliquam erat volutpat. Nullam feugiat viverra lorem. Ut ultrices enim quis dolor posuere, eu lobortis nisl auctor. Integer turpis elit, molestie eu nisi nec, porta interdum odio. Suspendisse potenti. Nunc nec consectetur augue. Proin in dictum arcu. Fusce vel enim egestas arcu porta dignissim. Curabitur a ante eget magna auctor vulputate a scelerisque nisl. Integer felis lectus, convallis quis rutrum et, malesuada at orci." />
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
			slug: "Abadar's Avenger_FRP0",
		},
	].map((obj) => {
		obj.slug = obj.slug + '.html';
		return obj;
	});
};

export const prerender = CF_PAGES || SEO ? 'auto' : false;
